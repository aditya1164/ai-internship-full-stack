import { AppConfigData } from './types';
import { v4 as uuidv4 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function getFieldDisplayValue(value: any, fieldType: string): string {
  if (value === null || value === undefined) {
    return '';
  }

  switch (fieldType) {
    case 'checkbox':
      return value ? 'Yes' : 'No';

    case 'date':
      if (typeof value === 'string') {
        const date = new Date(value);
        return date.toLocaleDateString();
      }
      return String(value);

    case 'number':
      return Number(value).toLocaleString();

    default:
      return String(value);
  }
}

export function normalizeString(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

export function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

export function safeParseJSON(jsonString: string, fallback: any = null): any {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

export function deepClone<T>(obj: T): T {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch {
    return obj;
  }
}

export function getTailwindResponsiveClass(baseClass: string, smClass?: string, mdClass?: string): string {
  let classes = baseClass;
  if (smClass) classes += ` sm:${smClass}`;
  if (mdClass) classes += ` md:${mdClass}`;
  return classes;
}

export function getGridColsClass(columns?: number): string {
  if (!columns || columns < 1) return 'grid-cols-1';
  if (columns >= 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  if (columns === 2) return 'grid-cols-1 sm:grid-cols-2';
  return 'grid-cols-1';
}

export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Extract database schema from config for dynamic table creation
 */
export function extractSchemaFromConfig(config: AppConfigData): Record<string, string> {
  const schema: Record<string, string> = {};

  for (const field of config.fields) {
    schema[field.name] = this.mapFieldTypeToDbType(field.type);
  }

  return schema;
}

/**
 * Map field type to database column type
 */
function mapFieldTypeToDbType(fieldType: string): string {
  switch (fieldType) {
    case 'number':
      return 'Integer';

    case 'date':
      return 'DateTime';

    case 'checkbox':
      return 'Boolean';

    case 'email':
    case 'password':
    case 'text':
    case 'textarea':
      return 'String';

    case 'select':
      return 'String';

    case 'file':
      return 'String';

    default:
      return 'String';
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
}

/**
 * Format bytes to human readable size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Generate sample data based on field type
 */
export function generateSampleData(fieldType: string): any {
  switch (fieldType) {
    case 'email':
      return `user${Math.floor(Math.random() * 1000)}@example.com`;

    case 'number':
      return Math.floor(Math.random() * 1000);

    case 'date':
      return new Date().toISOString().split('T')[0];

    case 'checkbox':
      return Math.random() > 0.5;

    case 'select':
      return 'option1';

    default:
      return 'Sample text';
  }
}
