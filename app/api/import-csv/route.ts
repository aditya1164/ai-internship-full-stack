import { NextRequest, NextResponse } from 'next/server';
import { FormValidator } from '@/lib/validators';
import prisma from '@/lib/db';
import { parse } from 'csv-parse/sync';

/**
 * POST /api/import-csv
 * Import records from CSV file
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const configId = formData.get('configId') as string;
    const userId = formData.get('userId') as string || 'anonymous';

    if (!file || !configId) {
      return NextResponse.json(
        { success: false, error: 'File and configId are required' },
        { status: 400 }
      );
    }

    // Read file content
    const content = await file.text();

    // Parse CSV
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
    });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { success: false, error: 'CSV file is empty' },
        { status: 400 }
      );
    }

    // Get config to validate fields
    const config = await prisma.appConfig.findUnique({
      where: { id: configId },
      include: { fields: true },
    });

    if (!config) {
      return NextResponse.json(
        { success: false, error: 'Config not found' },
        { status: 404 }
      );
    }

    const configData = config.configData as any;

    // Validate and insert records
    const results = {
      successful: 0,
      failed: 0,
      errors: [] as string[],
      createdRecords: [] as any[],
    };

    for (let i = 0; i < records.length; i++) {
      const row = records[i];

      try {
        // Convert string values to appropriate types
        const data: any = {};
        for (const field of configData.fields || []) {
          const value = row[field.name];
          
          if (value === '' || value === null || value === undefined) {
            data[field.name] = null;
          } else if (field.type === 'number') {
            data[field.name] = parseFloat(value);
          } else if (field.type === 'checkbox' || field.type === 'boolean') {
            data[field.name] = value.toLowerCase() === 'true' || value === '1';
          } else if (field.type === 'date') {
            data[field.name] = new Date(value).toISOString();
          } else {
            data[field.name] = String(value);
          }
        }

        // Validate the record
        const validation = FormValidator.validateFormData(data, configData.fields || []);

        if (!validation.isValid) {
          results.failed++;
          results.errors.push(
            `Row ${i + 2}: ${Object.values(validation.errors).join(', ')}`
          );
          continue;
        }

        // Create record
        const createdRecord = await prisma.generatedRecord.create({
          data: {
            data,
            configId,
            userId,
          },
        });

        results.successful++;
        results.createdRecords.push(createdRecord);
      } catch (error) {
        results.failed++;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        results.errors.push(`Row ${i + 2}: ${errorMsg}`);
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
      message: `Imported ${results.successful} records successfully`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to import CSV';
    console.error('POST /api/import-csv error:', error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
