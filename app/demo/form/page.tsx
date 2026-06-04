'use client';

import { useState } from 'react';
import DynamicRenderer from '@/components/renderers/DynamicRenderer';
import { AppConfigData } from '@/lib/types';

const demoFormConfig: AppConfigData = {
  type: 'form',
  name: 'User Registration',
  description: 'Sign up for an account with just a few details',
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      required: true,
      placeholder: 'John Doe',
      validation: [
        { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' },
      ],
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'john@example.com',
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      required: false,
      validation: [
        { type: 'min', value: 18, message: 'Must be 18 or older' },
        { type: 'max', value: 120, message: 'Invalid age' },
      ],
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { label: 'United States', value: 'us' },
        { label: 'United Kingdom', value: 'uk' },
        { label: 'Canada', value: 'ca' },
        { label: 'Australia', value: 'au' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      required: false,
      placeholder: 'Tell us about yourself...',
    },
    {
      name: 'agreeToTerms',
      type: 'checkbox',
      label: 'I agree to the terms and conditions',
      required: true,
    },
  ],
  layout: { columns: 2, gap: '1.5rem' },
  actions: {
    submit: { label: 'Create Account' },
    cancel: { label: 'Clear Form' },
  },
  ui: { theme: 'light', primaryColor: '#3B82F6' },
};

export default function FormDemoPage() {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: demoFormConfig,
          data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmittedData(data);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <DynamicRenderer
            config={demoFormConfig}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {submittedData && (
          <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-green-900 mb-4">✓ Form Submitted Successfully!</h2>
            <pre className="bg-white p-4 rounded text-sm overflow-auto border border-green-200 text-gray-800">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
