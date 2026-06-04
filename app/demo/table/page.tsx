'use client';

import { useState, useEffect } from 'react';
import DynamicRenderer from '@/components/renderers/DynamicRenderer';
import { CSVUpload } from '@/components/CSVUpload';
import { AppConfigData } from '@/lib/types';

const demoTableConfig: AppConfigData = {
  type: 'table',
  name: 'Products Inventory',
  description: 'Manage and track all products in the inventory',
  fields: [
    {
      name: 'productName',
      type: 'text',
      label: 'Product Name',
      required: true,
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price ($)',
      required: true,
    },
    {
      name: 'quantity',
      type: 'number',
      label: 'Stock',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Discontinued', value: 'discontinued' },
      ],
    },
  ],
};

const mockData = [
  {
    id: 1,
    productName: 'Laptop Pro',
    category: 'Electronics',
    price: 1299,
    quantity: 45,
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 2,
    productName: 'Wireless Mouse',
    category: 'Accessories',
    price: 29,
    quantity: 320,
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 3,
    productName: 'USB-C Cable',
    category: 'Cables',
    price: 12,
    quantity: 890,
    status: 'active',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 4,
    productName: 'Monitor 4K',
    category: 'Electronics',
    price: 399,
    quantity: 12,
    status: 'active',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 5,
    productName: 'Keyboard Mechanical',
    category: 'Accessories',
    price: 89,
    quantity: 67,
    status: 'inactive',
    createdAt: new Date().toISOString(),
  },
];

export default function TableDemoPage() {
  const [records, setRecords] = useState(mockData);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (id: string | number) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setRecords(prev => prev.filter(r => r.id !== id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <DynamicRenderer
            config={demoTableConfig}
            data={records}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📤 Bulk Import Records</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-600 mb-6">
              Upload a CSV file to bulk import records. Your CSV should have headers matching the field names: productName, category, price, quantity, status.
            </p>
            <CSVUpload 
              config={demoTableConfig}
              onUpload={() => {}}
              onError={(error) => console.error('CSV error:', error)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
