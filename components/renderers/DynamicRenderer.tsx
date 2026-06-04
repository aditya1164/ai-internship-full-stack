'use client';

import { AppConfigData, FormSubmissionData } from '@/lib/types';
import { ConfigValidator } from '@/lib/validators';
import FormRenderer from './FormRenderer';
import TableRenderer from './TableRenderer';
import DashboardRenderer from './DashboardRenderer';
import { cn } from '@/lib/utils';

interface DynamicRendererProps {
  config: any;
  data?: FormSubmissionData[];
  onSubmit?: (data: FormSubmissionData) => Promise<void>;
  onDelete?: (id: string | number) => Promise<void>;
  onEdit?: (id: string | number) => void;
  isLoading?: boolean;
  error?: string | null;
}

/**
 * Main dynamic renderer that handles graceful fallbacks for broken configs
 */
export default function DynamicRenderer({
  config: rawConfig,
  data = [],
  onSubmit,
  onDelete,
  onEdit,
  isLoading = false,
  error,
}: DynamicRendererProps) {
  // Sanitize and validate config - handles missing fields, invalid values, etc.
  let config: AppConfigData;
  let configError: string | null = null;

  try {
    config = ConfigValidator.sanitizeConfig(rawConfig);
  } catch (err) {
    configError = 'Invalid configuration provided';
    config = ConfigValidator.sanitizeConfig(null);
  }

  const renderContent = () => {
    switch (config.type) {
      case 'form':
        return (
          <FormRenderer
            config={config}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
          />
        );

      case 'table':
        return (
          <TableRenderer
            config={config}
            data={data}
            onDelete={onDelete}
            onEdit={onEdit}
            isLoading={isLoading}
          />
        );

      case 'dashboard':
        return (
          <DashboardRenderer
            config={config}
            data={data}
            isLoading={isLoading}
          />
        );

      default:
        // Graceful fallback to form if type is unknown
        return (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Unknown view type: {config.type}. Showing form instead.
              </p>
            </div>
            <FormRenderer
              config={config}
              onSubmit={onSubmit}
              isLoading={isLoading}
              error={error}
            />
          </div>
        );
    }
  };

  return (
    <div className={cn('w-full py-8 px-4', error && 'space-y-4')}>
      {configError && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800 font-medium">{configError}</p>
          <p className="text-xs text-orange-700 mt-1">
            The configuration has been repaired. Some features may not work as expected.
          </p>
        </div>
      )}

      {renderContent()}
    </div>
  );
}

export { DynamicRenderer };
