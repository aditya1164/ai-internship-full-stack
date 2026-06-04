import { NextRequest, NextResponse } from 'next/server';
import { FormValidator } from '@/lib/validators';
import { AppConfigData, FormSubmissionData } from '@/lib/types';
import prisma from '@/lib/db';

/**
 * POST /api/records
 * Submit a form and create a record
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { config, data, userId } = body;

    if (!config || !data) {
      return NextResponse.json(
        { success: false, error: 'Config and data are required' },
        { status: 400 }
      );
    }

    // Validate the form data against the config
    const validation = FormValidator.validateFormData(data, config.fields || []);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Find or use existing config in database
    let configRecord = config.id ? 
      await prisma.appConfig.findUnique({ where: { id: config.id } }) 
      : null;

    // If config doesn't exist in DB, create it
    if (!configRecord && config.name) {
      configRecord = await prisma.appConfig.create({
        data: {
          configData: config,
          configType: config.type,
          userId: userId || 'anonymous',
          fields: {
            create: (config.fields || []).map((field: any) => ({
              fieldName: field.name,
              fieldType: field.type,
              validation: field.validation || {},
            })),
          },
        },
        include: { fields: true },
      });
    }

    // Create the record
    const record = await prisma.generatedRecord.create({
      data: {
        data,
        configId: configRecord?.id || config.id || 'unknown',
        userId: userId || 'anonymous',
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: record.id,
        configId: record.configId,
        data: record.data,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      },
      message: 'Record created successfully',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create record';
    console.error('POST /api/records error:', error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/records
 * Fetch records (with optional filtering)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const configId = searchParams.get('configId');
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (configId) where.configId = configId;
    if (userId) where.userId = userId;

    const [records, total] = await Promise.all([
      prisma.generatedRecord.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.generatedRecord.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: records.map(record => ({
        id: record.id,
        configId: record.configId,
        userId: record.userId,
        data: record.data,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch records';
    console.error('GET /api/records error:', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/records
 * Delete a record by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const recordId = searchParams.get('id');

    if (!recordId) {
      return NextResponse.json(
        { success: false, error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const deletedRecord = await prisma.generatedRecord.delete({
      where: { id: recordId },
    });

    return NextResponse.json({
      success: true,
      data: { deletedId: deletedRecord.id },
      message: 'Record deleted successfully',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete record';
    console.error('DELETE /api/records error:', error);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
