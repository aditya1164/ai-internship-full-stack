'use client';

import { useState } from 'react';
import { AppConfigData } from '@/lib/types';

interface CSVUploadProps {
  config: AppConfigData;
  onUpload?: (results: any) => void;
  onError?: (error: string) => void;
}

export function CSVUpload({ config, onUpload, onError }: CSVUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUpload = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      onError?.('Please upload a CSV file');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('configId', config.id || '');

      const response = await fetch('/api/import-csv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        onError?.(result.error || 'Upload failed');
        return;
      }

      setResults(result.data);
      onUpload?.(result.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          disabled={isLoading}
          className="hidden"
          id="csv-upload"
        />
        <label
          htmlFor="csv-upload"
          className="block cursor-pointer"
        >
          <div className="text-2xl mb-2">📤</div>
          <p className="font-semibold text-gray-700">
            Drag CSV file here or click to select
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supported format: CSV with headers matching your form fields
          </p>
        </label>
      </div>

      {results && (
        <div className="bg-white border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Import Results</h3>
            <button
              onClick={() => setResults(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <div className="text-green-700 font-semibold">
                ✓ {results.successful}
              </div>
              <p className="text-sm text-green-600">Records imported</p>
            </div>
            <div className={`border rounded p-3 ${
              results.failed > 0
                ? 'bg-red-50 border-red-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`font-semibold ${
                results.failed > 0 ? 'text-red-700' : 'text-gray-700'
              }`}>
                ✗ {results.failed}
              </div>
              <p className={`text-sm ${
                results.failed > 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                Records failed
              </p>
            </div>
          </div>

          {results.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-3 max-h-32 overflow-y-auto">
              <p className="text-sm font-semibold text-red-700 mb-2">Errors:</p>
              <ul className="text-xs text-red-600 space-y-1">
                {results.errors.map((error: string, i: number) => (
                  <li key={i}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
          <div className="inline-block animate-spin">⏳</div>
          <p className="text-blue-700 font-medium ml-2 inline">
            Importing records...
          </p>
        </div>
      )}

      {/* CSV Template Example */}
      <details className="bg-gray-50 border rounded p-3">
        <summary className="font-semibold cursor-pointer text-gray-700">
          📋 CSV Format Example
        </summary>
        <div className="mt-3 bg-white p-3 rounded border border-gray-200 overflow-x-auto text-xs font-mono">
          <code>
            {(config.fields || [])
              .map(f => f.name)
              .join(',')}
            <br />
            {(config.fields || [])
              .map((f, i) => {
                const examples: Record<string, string> = {
                  'text': 'John',
                  'email': 'john@example.com',
                  'number': '25',
                  'date': '2026-06-04',
                  'select': 'Option1',
                  'checkbox': 'true',
                  'textarea': 'Sample text',
                  'file': 'filename.pdf',
                };
                return examples[f.type] || 'value' + (i + 1);
              })
              .join(',')}
          </code>
        </div>
      </details>
    </div>
  );
}
