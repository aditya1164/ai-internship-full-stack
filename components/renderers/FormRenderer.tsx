'use client';

import { useState } from 'react';
import { AppConfigData, FormSubmissionData, FieldConfig } from '@/lib/types';
import { FormValidator } from '@/lib/validators';
import { cn } from '@/lib/utils';
import FormField from './FormField';
import { useNotification } from '@/lib/notifications';

interface FormRendererProps {
  config: AppConfigData;
  onSubmit?: (data: FormSubmissionData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export default function FormRenderer({
  config,
  onSubmit,
  isLoading = false,
  error: externalError,
}: FormRendererProps) {
  const { addToast } = useNotification();
  const [formData, setFormData] = useState<FormSubmissionData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const columns = config.layout?.columns || 1;
  const gridClass = cn(
    'grid gap-6',
    columns === 1 && 'grid-cols-1',
    columns === 2 && 'grid-cols-1 md:grid-cols-2',
    columns >= 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  );

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validate form
    const validation = FormValidator.validateFormData(formData, config.fields);
    if (!validation.isValid) {
      const errorMap: Record<string, string> = {};
      validation.errors.forEach(err => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      addToast('Please fix the validation errors', 'error');
      return;
    }

    if (!onSubmit) {
      addToast('Form submitted successfully!', 'success');
      setFormData({});
      setErrors({});
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
      addToast('Form submitted successfully!', 'success');
      setFormData({});
      setErrors({});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit form';
      setLocalError(message);
      addToast(message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitLabel = config.actions?.submit?.label || 'Submit';
  const cancelLabel = config.actions?.cancel?.label || 'Cancel';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.name}</h1>
        {config.description && <p className="text-gray-600">{config.description}</p>}
      </div>

      {(externalError || localError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-medium text-red-800">{externalError || localError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={gridClass}>
          {config.fields
            .filter(field => !field.hidden)
            .map((field, index) => (
              <FormField
                key={field.name || index}
                field={field}
                value={formData[field.name] ?? ''}
                onChange={(value) => handleFieldChange(field.name, value)}
                error={errors[field.name]}
              />
            ))}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={cn(
              'px-6 py-2 rounded-lg font-medium transition-colors',
              isSubmitting || isLoading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            )}
          >
            {isSubmitting || isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              submitLabel
            )}
          </button>

          <button
            type="reset"
            onClick={() => {
              setFormData({});
              setErrors({});
              setLocalError(null);
            }}
            className="px-6 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            {cancelLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
