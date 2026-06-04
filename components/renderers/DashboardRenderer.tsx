'use client';

import { AppConfigData, FormSubmissionData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DashboardRendererProps {
  config: AppConfigData;
  data: FormSubmissionData[];
  isLoading?: boolean;
}

interface StatCard {
  label: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
}

export default function DashboardRenderer({
  config,
  data,
  isLoading = false,
}: DashboardRendererProps) {
  const stats: StatCard[] = [
    {
      label: 'Total Records',
      value: data.length,
      color: 'blue',
      icon: '📊',
    },
    {
      label: 'Created Today',
      value: data.filter(d => {
        const createdAt = d.createdAt ? new Date(d.createdAt) : null;
        if (!createdAt) return false;
        const today = new Date();
        return createdAt.toDateString() === today.toDateString();
      }).length,
      color: 'green',
      icon: '✨',
    },
  ];

  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'orange':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{config.name}</h1>
        {config.description && (
          <p className="text-lg text-gray-600">{config.description}</p>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              'p-6 rounded-lg border-2 transition-all',
              getColorClasses(stat.color)
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              {stat.icon && (
                <span className="text-2xl">{stat.icon}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Records */}
      {data.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Recent Records</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {data.slice(0, 5).map((record, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.fields.slice(0, 2).map((field) => (
                    <div key={field.name}>
                      <p className="text-xs font-medium text-gray-500 uppercase">{field.label}</p>
                      <p className="text-sm text-gray-900 mt-1">
                        {String(record[field.name] || '—')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">No data available</p>
          <p className="text-gray-500 text-sm mt-1">Create records to see them here</p>
        </div>
      )}
    </div>
  );
}
