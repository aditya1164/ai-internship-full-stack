// Example configurations for AppGenerator
// These are JSON configuration objects that can be passed to the DynamicRenderer

export const contactFormConfig = {
  type: 'form',
  name: 'Contact Us',
  description: 'Get in touch with our team',
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'Full Name',
      required: true,
      placeholder: 'John Doe',
      validation: [
        { type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
      ]
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'john@example.com'
    },
    {
      name: 'subject',
      type: 'select',
      label: 'Subject',
      required: true,
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Support', value: 'support' },
        { label: 'Feedback', value: 'feedback' }
      ]
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      required: true,
      placeholder: 'Tell us what\'s on your mind...'
    },
    {
      name: 'subscribe',
      type: 'checkbox',
      label: 'Subscribe to our newsletter'
    }
  ],
  layout: { columns: 1 },
  actions: {
    submit: { label: 'Send Message' },
    cancel: { label: 'Clear' }
  }
};

export const employeeTableConfig = {
  type: 'table',
  name: 'Employee Directory',
  description: 'Manage company employees',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Employee Name',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true
    },
    {
      name: 'department',
      type: 'text',
      label: 'Department',
      required: true
    },
    {
      name: 'salary',
      type: 'number',
      label: 'Salary',
      required: true
    },
    {
      name: 'joinDate',
      type: 'date',
      label: 'Join Date',
      required: true
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active'
    }
  ]
};

export const analyticsDashboardConfig = {
  type: 'dashboard',
  name: 'Analytics Dashboard',
  description: 'Real-time business metrics',
  fields: [
    {
      name: 'revenue',
      type: 'number',
      label: 'Revenue'
    },
    {
      name: 'users',
      type: 'number',
      label: 'Users'
    },
    {
      name: 'conversion',
      type: 'number',
      label: 'Conversion Rate'
    },
    {
      name: 'date',
      type: 'date',
      label: 'Date'
    }
  ]
};

// Example: Configuration with intentional errors that will be gracefully handled
export const brokenConfigExample = {
  type: 'invalid_type', // Will fall back to 'form'
  name: null, // Will be replaced with 'Untitled Form'
  fields: [
    {
      name: 'field1',
      type: 'unknown_field_type', // Will fall back to 'text'
      label: 'Field 1'
      // Missing 'required' - will default to false
    },
    null, // Null field - will be filtered out
    {
      // Missing 'name' - will be auto-generated
      type: 'email',
      label: 'Email'
    },
    'invalid field', // String instead of object - will be filtered out
    {
      name: 'options',
      type: 'select',
      label: 'Select',
      options: null // Null options - will become empty array
    }
  ],
  layout: 'invalid', // Invalid layout - will use default
  metadata: { // Extra properties are preserved
    source: 'external_api',
    version: 1
  }
};

// Usage Example 1: Simple form
/*
import { DynamicRenderer } from '@/components/renderers/DynamicRenderer';
import { contactFormConfig } from '@/configs/examples';

export default function ContactPage() {
  const handleSubmit = async (data) => {
    const response = await fetch('/api/records', {
      method: 'POST',
      body: JSON.stringify({
        config: contactFormConfig,
        data
      })
    });
    return response.json();
  };

  return (
    <DynamicRenderer
      config={contactFormConfig}
      onSubmit={handleSubmit}
    />
  );
}
*/

// Usage Example 2: Table with CRUD
/*
import { DynamicRenderer } from '@/components/renderers/DynamicRenderer';
import { employeeTableConfig } from '@/configs/examples';

export default function EmployeesPage() {
  const [records, setRecords] = useState([]);

  const handleDelete = async (id) => {
    await fetch('/api/records?id=' + id, { method: 'DELETE' });
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  return (
    <DynamicRenderer
      config={employeeTableConfig}
      data={records}
      onDelete={handleDelete}
    />
  );
}
*/

// Usage Example 3: Handle broken configs gracefully
/*
import { DynamicRenderer } from '@/components/renderers/DynamicRenderer';
import { brokenConfigExample } from '@/configs/examples';

export default function BrokenConfigPage() {
  return (
    <DynamicRenderer
      config={brokenConfigExample}
      // Even with broken config, this will render a form with sensible defaults
    />
  );
}
*/
