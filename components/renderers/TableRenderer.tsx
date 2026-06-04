'use client';

import { useState, useMemo } from 'react';
import { AppConfigData, FormSubmissionData } from '@/lib/types';
import { getFieldDisplayValue, cn } from '@/lib/utils';

interface TableRendererProps {
  config: AppConfigData;
  data: FormSubmissionData[];
  onDelete?: (id: string | number) => Promise<void>;
  onEdit?: (id: string | number) => void;
  isLoading?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

export default function TableRenderer({
  config,
  data,
  onDelete,
  onEdit,
  isLoading = false,
}: TableRendererProps) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(term)
        )
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        const comparison = String(aVal).localeCompare(String(bVal));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return filtered;
  }, [data, sortField, sortDirection, searchTerm]);

  const handleSort = (fieldName: string) => {
    if (sortField === fieldName) {
      // Cycle: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(fieldName);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!onDelete || !window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      setDeletingId(id);
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  };

  const getSortIcon = (fieldName: string) => {
    if (sortField !== fieldName) {
      return '⇅';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const visibleFields = config.fields.filter(f => !f.hidden).slice(0, 5);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{config.name}</h2>
        {config.description && <p className="text-gray-600 mb-4">{config.description}</p>}

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <p className="text-sm text-gray-600">
          Showing {filteredAndSortedData.length} of {data.length} records
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
        {filteredAndSortedData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No records found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {visibleFields.map((field) => (
                  <th
                    key={field.name}
                    onClick={() => handleSort(field.name)}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span>{field.label}</span>
                      <span className="text-xs text-gray-400">{getSortIcon(field.name)}</span>
                    </div>
                  </th>
                ))}
                {(onDelete || onEdit) && (
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  {visibleFields.map((field) => (
                    <td key={field.name} className="px-6 py-4 text-sm text-gray-800">
                      {getFieldDisplayValue(row[field.name], field.type)}
                    </td>
                  ))}
                  {(onDelete || onEdit) && (
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row.id || rowIndex)}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            Edit
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => handleDelete(row.id || rowIndex)}
                            disabled={deletingId === (row.id || rowIndex)}
                            className={cn(
                              'px-3 py-1 rounded transition-colors',
                              deletingId === (row.id || rowIndex)
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-red-600 hover:bg-red-50'
                            )}
                          >
                            {deletingId === (row.id || rowIndex) ? 'Deleting...' : 'Delete'}
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
