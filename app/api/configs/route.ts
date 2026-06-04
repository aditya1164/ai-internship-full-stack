import { NextRequest, NextResponse } from 'next/server';
import { ConfigValidator } from '@/lib/validators';
import prisma from '@/lib/db';

/**
 * POST /api/configs
 * Create or validate a new app configuration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    // Validate and sanitize the config
    const sanitizedConfig = ConfigValidator.sanitizeConfig(body);

    // Save to database
    const config = await prisma.appConfig.create({
      data: {
        configData: sanitizedConfig,
        configType: sanitizedConfig.type,
        userId: userId || 'anonymous',
        fields: {
          create: (sanitizedConfig.fields || []).map((field: any) => ({
            fieldName: field.name,
            fieldType: field.type,
            validation: field.validation || {},
          })),
        },
      },
      include: { fields: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: config.id,
        ...sanitizedConfig,
      },
      metadata: {
        fieldsCount: sanitizedConfig.fields.length,
        type: sanitizedConfig.type,
        createdAt: config.createdAt.toISOString(),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to process config';
    console.error('POST /api/configs error:', error);

    return NextResponse.json(
      {
        success: false,
        error: message,
        fallback: {
          type: 'form',
          name: 'Invalid Configuration',
          description: 'The provided configuration could not be processed.',
          fields: [],
        },
      },
      { status: 400 }
    );
  }
}

/**
 * GET /api/configs
 * List all configs
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where = userId ? { userId } : {};

    const [configs, total] = await Promise.all([
      prisma.appConfig.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
        include: { fields: true },
      }),
      prisma.appConfig.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: configs.map(config => ({
        id: config.id,
        name: (config.configData as any).name,
        type: config.configType,
        fieldsCount: config.fields.length,
        createdAt: config.createdAt.toISOString(),
        updatedAt: config.updatedAt.toISOString(),
      })),
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch configs';
    console.error('GET /api/configs error:', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
