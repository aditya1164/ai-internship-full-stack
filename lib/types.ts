export type FieldType = 
  | 'text' 
  | 'number' 
  | 'email' 
  | 'password'
  | 'date' 
  | 'select' 
  | 'checkbox' 
  | 'textarea'
  | 'file';

export type ConfigType = 'form' | 'table' | 'dashboard' | 'workflow';

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  validation?: ValidationRule[];
  hidden?: boolean;
  disabled?: boolean;
}

export interface ValidationRule {
  type: 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'unique' | 'email' | 'min' | 'max';
  value?: string | number;
  message?: string;
}

export interface AppConfigData {
  type: ConfigType;
  name: string;
  description?: string;
  fields: FieldConfig[];
  layout?: {
    columns?: number;
    gap?: string;
  };
  actions?: {
    submit?: {
      label?: string;
      route?: string;
    };
    cancel?: {
      label?: string;
    };
  };
  ui?: {
    theme?: 'light' | 'dark';
    primaryColor?: string;
  };
  metadata?: Record<string, any>;
}

export interface FormSubmissionData {
  [key: string]: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface RendererProps {
  config: AppConfigData;
  data?: FormSubmissionData;
  onSubmit?: (data: FormSubmissionData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}
