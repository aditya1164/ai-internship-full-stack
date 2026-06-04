import { AppConfigData, FieldConfig, ValidationRule, FormValidationResult, ValidationError } from './types';

export class ConfigValidator {
  /**
   * Sanitize and validate the entire config, fixing issues gracefully
   */
  static sanitizeConfig(config: any): AppConfigData {
    if (!config || typeof config !== 'object') {
      return this.getDefaultConfig();
    }

    const sanitized: AppConfigData = {
      type: this.sanitizeConfigType(config.type),
      name: this.sanitizeString(config.name, 'Untitled Form'),
      description: this.sanitizeString(config.description),
      fields: this.sanitizeFields(config.fields),
      layout: config.layout || { columns: 1, gap: '1rem' },
      actions: config.actions || { submit: { label: 'Submit' }, cancel: { label: 'Cancel' } },
      ui: config.ui || { theme: 'light' },
      metadata: config.metadata || {},
    };

    return sanitized;
  }

  private static sanitizeConfigType(type: any): 'form' | 'table' | 'dashboard' | 'workflow' {
    const validTypes = ['form', 'table', 'dashboard', 'workflow'];
    if (typeof type === 'string' && validTypes.includes(type)) {
      return type as any;
    }
    return 'form';
  }

  private static sanitizeString(value: any, defaultValue = ''): string {
    if (typeof value === 'string') {
      return value.trim();
    }
    return defaultValue;
  }

  private static sanitizeFields(fields: any): FieldConfig[] {
    if (!Array.isArray(fields)) {
      return [];
    }

    return fields
      .map((field, index) => this.sanitizeField(field, index))
      .filter((field): field is FieldConfig => field !== null);
  }

  private static sanitizeField(field: any, index: number): FieldConfig | null {
    if (!field || typeof field !== 'object') {
      return null;
    }

    const name = this.sanitizeString(field.name || `field_${index}`);
    const type = this.sanitizeFieldType(field.type);
    const label = this.sanitizeString(field.label || name);

    if (!name || !type) {
      return null;
    }

    const sanitized: FieldConfig = {
      name,
      type,
      label,
      required: Boolean(field.required),
      defaultValue: field.defaultValue,
      placeholder: this.sanitizeString(field.placeholder),
      options: this.sanitizeOptions(field.options),
      validation: this.sanitizeValidationRules(field.validation),
      hidden: Boolean(field.hidden),
      disabled: Boolean(field.disabled),
    };

    return sanitized;
  }

  private static sanitizeFieldType(type: any): string {
    const validTypes = ['text', 'number', 'email', 'password', 'date', 'select', 'checkbox', 'textarea', 'file'];
    if (typeof type === 'string' && validTypes.includes(type)) {
      return type;
    }
    return 'text';
  }

  private static sanitizeOptions(options: any): Array<{ label: string; value: string }> {
    if (!Array.isArray(options)) {
      return [];
    }

    return options
      .map(opt => {
        if (typeof opt === 'string') {
          return { label: opt, value: opt };
        }
        if (typeof opt === 'object' && opt !== null) {
          return {
            label: this.sanitizeString(opt.label || opt.value || ''),
            value: this.sanitizeString(opt.value || opt.label || ''),
          };
        }
        return null;
      })
      .filter((opt): opt is { label: string; value: string } => opt !== null && Boolean(opt.label && opt.value));
  }

  private static sanitizeValidationRules(rules: any): ValidationRule[] {
    if (!Array.isArray(rules)) {
      return [];
    }

    return rules
      .map(rule => {
        if (!rule || typeof rule !== 'object') {
          return null;
        }

        const type = rule.type as string;
        const validTypes = ['minLength', 'maxLength', 'pattern', 'custom', 'unique', 'email', 'min', 'max'];

        if (!validTypes.includes(type)) {
          return null;
        }

        return {
          type: type as any,
          value: rule.value,
          message: this.sanitizeString(rule.message),
        };
      })
      .filter((rule): rule is ValidationRule => rule !== null);
  }

  private static getDefaultConfig(): AppConfigData {
    return {
      type: 'form',
      name: 'Untitled Form',
      description: '',
      fields: [],
      layout: { columns: 1, gap: '1rem' },
      actions: { submit: { label: 'Submit' }, cancel: { label: 'Cancel' } },
      ui: { theme: 'light' },
      metadata: {},
    };
  }
}

export class FormValidator {
  static validateFormData(data: Record<string, any>, fields: FieldConfig[]): FormValidationResult {
    const errors: ValidationError[] = [];

    for (const field of fields) {
      const value = data[field.name];
      const fieldErrors = this.validateField(field, value);
      errors.push(...fieldErrors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private static validateField(field: FieldConfig, value: any): ValidationError[] {
    const errors: ValidationError[] = [];

    // Required validation
    if (field.required && !this.hasValue(value)) {
      errors.push({
        field: field.name,
        message: `${field.label} is required`,
      });
      return errors;
    }

    // Skip validation if field is not required and has no value
    if (!this.hasValue(value)) {
      return errors;
    }

    // Type-specific validation
    switch (field.type) {
      case 'email':
        if (!this.isValidEmail(String(value))) {
          errors.push({
            field: field.name,
            message: `${field.label} must be a valid email`,
          });
        }
        break;

      case 'number':
        if (isNaN(Number(value))) {
          errors.push({
            field: field.name,
            message: `${field.label} must be a number`,
          });
        }
        break;

      case 'date':
        if (!this.isValidDate(value)) {
          errors.push({
            field: field.name,
            message: `${field.label} must be a valid date`,
          });
        }
        break;
    }

    // Custom validation rules
    if (field.validation && Array.isArray(field.validation)) {
      for (const rule of field.validation) {
        const ruleError = this.validateRule(field, value, rule);
        if (ruleError) {
          errors.push(ruleError);
        }
      }
    }

    return errors;
  }

  private static validateRule(field: FieldConfig, value: any, rule: ValidationRule): ValidationError | null {
    const stringValue = String(value);
    const numberValue = Number(value);

    switch (rule.type) {
      case 'minLength':
        if (stringValue.length < (rule.value as number)) {
          return {
            field: field.name,
            message: rule.message || `${field.label} must be at least ${rule.value} characters`,
          };
        }
        break;

      case 'maxLength':
        if (stringValue.length > (rule.value as number)) {
          return {
            field: field.name,
            message: rule.message || `${field.label} must be at most ${rule.value} characters`,
          };
        }
        break;

      case 'pattern':
        try {
          const regex = new RegExp(rule.value as string);
          if (!regex.test(stringValue)) {
            return {
              field: field.name,
              message: rule.message || `${field.label} format is invalid`,
            };
          }
        } catch {
          console.warn(`Invalid regex pattern for field ${field.name}`);
        }
        break;

      case 'min':
        if (numberValue < (rule.value as number)) {
          return {
            field: field.name,
            message: rule.message || `${field.label} must be at least ${rule.value}`,
          };
        }
        break;

      case 'max':
        if (numberValue > (rule.value as number)) {
          return {
            field: field.name,
            message: rule.message || `${field.label} must be at most ${rule.value}`,
          };
        }
        break;
    }

    return null;
  }

  private static hasValue(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidDate(date: any): boolean {
    if (typeof date === 'string') {
      return !isNaN(Date.parse(date));
    }
    return date instanceof Date && !isNaN(date.getTime());
  }
}
