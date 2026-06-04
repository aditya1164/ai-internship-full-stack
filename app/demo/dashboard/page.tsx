'use client';

import DynamicRenderer from '@/components/renderers/DynamicRenderer';
import { AppConfigData } from '@/lib/types';

const demoDashboardConfig: AppConfigData = {
  type: 'dashboard',
  name: 'Sales Dashboard',
  description: 'Overview of sales metrics and performance',
  fields: [
    {
      name: 'orderValue',
      type: 'number',
      label: 'Order Value',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Order Status',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Order Date',
      required: true,
    },
    {
      name: 'customer',
      type: 'text',
      label: 'Customer Name',
      required: true,
    },
  ],
};

const mockData = [
  {
    orderValue: 245.99,
    status: 'completed',
    date: new Date().toISOString().split('T')[0],
    customer: 'Alice Johnson',
    createdAt: new Date().toISOString(),
  },
  {
    orderValue: 512.50,
    status: 'processing',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    customer: 'Bob Smith',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    orderValue: 89.99,
    status: 'completed',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    customer: 'Carol White',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    orderValue: 1299.99,
    status: 'completed',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    customer: 'David Brown',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    orderValue: 456.00,
    status: 'pending',
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    customer: 'Emma Davis',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

export default function DashboardDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </a>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <DynamicRenderer config={demoDashboardConfig} data={mockData} />
        </div>
      </div>
    </div>
  );
}
