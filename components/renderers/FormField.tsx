'use client';

import { FieldConfig } from '@/lib/types';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export default function FormField({ field, value, onChange, error }: FormFieldProps) {
  const baseInputClasses = cn(
    'w-full px-4 py-2 border rounded-lg font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    error
      ? 'border-red-500 bg-red-50'
      : 'border-gray-300 bg-white hover:border-gray-400'
  );

  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={baseInputClasses}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            placeholder={field.placeholder || 'example@domain.com'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={baseInputClasses}
          />
        );

      case 'password':
        return (
          <input
            type="password"
            placeholder={field.placeholder || 'Enter password'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={baseInputClasses}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder || 'Enter a number'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            disabled={field.disabled}
            className={baseInputClasses}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={baseInputClasses}
          />
        );

      case 'textarea':
        return (
          <textarea
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            rows={4}
            className={cn(baseInputClasses, 'resize-vertical')}
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={baseInputClasses}
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options && field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={field.name}
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
              disabled={field.disabled}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor={field.name} className="text-gray-700 cursor-pointer font-medium">
              {field.label}
            </label>
          </div>
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => onChange(e.target.files?.[0])}
            disabled={field.disabled}
            className={cn(
              baseInputClasses,
              'file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100'
            )}
          />
        );

      default:
        return (
          <input
            type="text"
            placeholder={field.placeholder || 'Enter value'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={field.disabled}
            className={baseInputClasses}
          />
        );
    }
  };

  // Don't render label for checkbox since it's included in the field
  if (field.type === 'checkbox') {
    return (
      <div className="col-span-full">
        {renderField()}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
