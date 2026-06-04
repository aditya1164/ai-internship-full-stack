# AppGenerator - Metadata-Driven Application Runtime

A production-grade, full-stack metadata-driven application runtime that dynamically generates forms, tables, dashboards, and workflows from JSON configuration. The system gracefully handles edge cases like missing fields, invalid values, unknown components, and inconsistent schemas without breaking.

## 🎯 Project Overview

**Track A - AI App Generator** from the AI Software Engineer Internship program. This system demonstrates:

- ✅ Dynamic UI rendering from configuration
- ✅ Graceful error handling and resilience
- ✅ Full-stack architecture (frontend + backend + database)
- ✅ Production-ready validation and type safety
- ✅ Extensible component architecture

## 🏗️ Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Dynamic Renderer (ConfigValidator + React)         │   │
│  │  ├── FormRenderer (Text, Email, Select, Checkbox)   │   │
│  │  ├── TableRenderer (Sort, Filter, Search, CRUD)     │   │
│  │  └── DashboardRenderer (Stats, Charts, Overview)    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                    API Layer (Next.js)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  POST   /api/configs    - Validate & sanitize       │   │
│  │  GET    /api/configs    - List configs              │   │
│  │  POST   /api/records    - Submit form & validate    │   │
│  │  GET    /api/records    - Fetch with filters        │   │
│  │  DELETE /api/records    - Remove record             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│               Database Layer (PostgreSQL + Prisma)           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Users           - Authentication & ownership       │   │
│  │  AppConfigs      - Stored configurations            │   │
│  │  DynamicFields   - Field metadata & validation      │   │
│  │  GeneratedRecords - Form submissions & data         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with file-based routing
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework

### Backend
- **Next.js API Routes** - Serverless functions
- **TypeScript** - Type safety and validation
- **Zod** - Runtime schema validation

### Database
- **PostgreSQL** - Production-grade database
- **Prisma ORM** - Type-safe database access
- **Migrations** - Schema version control

## 📋 Core Features

### 1. **Configuration Validation System**
```typescript
// Gracefully handles edge cases
const config = ConfigValidator.sanitizeConfig(rawConfig);
```

**Capabilities:**
- ✅ Missing fields (fills with defaults)
- ✅ Invalid values (auto-corrects types)
- ✅ Unknown field types (falls back to 'text')
- ✅ Malformed arrays/objects (provides sensible defaults)
- ✅ Inconsistent schemas (normalizes structure)

### 2. **Dynamic Form Renderer**
Renders forms from configuration with:
- Multiple field types (text, email, number, date, select, checkbox, textarea, file)
- Real-time validation with custom rules
- Responsive 2-3 column layouts
- Error messages and user feedback
- Submit/Cancel buttons with proper state handling

### 3. **Data Table Renderer**
Interactive tables with:
- Sortable columns (click headers to sort)
- Real-time search/filtering
- Record count display
- CRUD action buttons (Edit, Delete)
- Proper data formatting (numbers, dates, booleans)

### 4. **Dashboard Renderer**
Analytics dashboards featuring:
- Stat cards with icons and colors
- Recent records preview
- Data visualization ready
- Responsive grid layout

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL 12+ (or use Neon for cloud PostgreSQL)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
# Edit .env.local with your database URL
# DATABASE_URL="postgresql://..."

# 3. Initialize database (with Prisma)
npx prisma migrate dev --name init

# 4. Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📝 Project Structure

```
app-generator/
├── app/
│   ├── api/
│   │   ├── configs/
│   │   │   └── route.ts          # Config validation API
│   │   └── records/
│   │       └── route.ts          # Form submission API
│   ├── demo/
│   │   ├── form/
│   │   │   └── page.tsx          # Form demo
│   │   ├── table/
│   │   │   └── page.tsx          # Table demo
│   │   └── dashboard/
│   │       └── page.tsx          # Dashboard demo
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── components/
│   └── renderers/
│       ├── DynamicRenderer.tsx   # Main orchestrator
│       ├── FormRenderer.tsx      # Forms
│       ├── FormField.tsx         # Individual fields
│       ├── TableRenderer.tsx     # Data tables
│       └── DashboardRenderer.tsx # Dashboards
├── lib/
│   ├── types.ts                  # Type definitions
│   ├── validators.ts             # Config & form validation
│   └── utils.ts                  # Utility functions
├── prisma/
│   └── schema.prisma             # Database schema
├── .env.local                    # Environment variables
├── package.json
└── README.md                     # This file
```

## 🔍 How It Works

### 1. Configuration Submission

```typescript
const config = {
  type: 'form',
  name: 'Contact Form',
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true }
  ]
};

// System automatically sanitizes, validates, and normalizes
const sanitized = ConfigValidator.sanitizeConfig(config);
```

### 2. Dynamic Rendering

```typescript
<DynamicRenderer 
  config={config}
  onSubmit={handleSubmit}
  error={error}
/>
```

The renderer automatically:
1. Validates the configuration
2. Selects the appropriate component (form/table/dashboard)
3. Renders UI with proper styling and layout
4. Handles errors gracefully

### 3. Data Validation

```typescript
const validation = FormValidator.validateFormData(data, config.fields);

if (!validation.isValid) {
  // Handle validation.errors
}
```

Supports:
- Type checking (email, number, date)
- Custom rules (minLength, maxLength, pattern, min, max)
- Required fields
- Real-time validation feedback

## 🛡️ Error Handling Strategy

The system handles errors at multiple layers:

### Config Level
```typescript
// Missing fields → Uses defaults
// Invalid types → Converts to correct type
// Unknown components → Falls back to text field
// Empty arrays → Renders empty state
```

### Validation Level
```typescript
// Invalid email → Shows user-friendly error
// Type mismatch → Prevents submission
// Malformed input → Sanitizes before processing
```

### API Level
```typescript
// 400 errors → Validation details returned
// 500 errors → Generic message + logging
// Network errors → Retry logic & fallbacks
```

## 📊 Demo Pages

### Form Demo (`/demo/form`)
- **Config:** User registration form
- **Features:** Multi-field form with validation, dropdown selections, checkbox
- **Test:** Submit empty form to see validation errors

### Table Demo (`/demo/table`)
- **Config:** Products inventory management
- **Features:** Sortable columns, search bar, delete actions
- **Test:** Click column headers to sort, use search to filter

### Dashboard Demo (`/demo/dashboard`)
- **Config:** Sales dashboard
- **Features:** Stat cards, recent records, data overview
- **Test:** View aggregated metrics from sample data

## 🚀 Deployment

### Recommended Platforms

**Frontend:**
- Vercel (native Next.js support)
- Railway
- Render

**Database:**
- Neon (Serverless PostgreSQL)
- Railway

## 📚 API Documentation

### POST /api/configs
**Validate and sanitize a configuration**

Request:
```json
{
  "type": "form",
  "name": "Contact Form",
  "fields": [...]
}
```

Response:
```json
{
  "success": true,
  "data": { ... }
}
```

### POST /api/records
**Submit form data**

Request:
```json
{
  "config": { ... },
  "data": { "name": "John", "email": "john@example.com" }
}
```

Response:
```json
{
  "success": true,
  "data": { ... }
}
```

## 🎨 Design Philosophy

- **Not AI-Generated:** Clean, professional design using TailwindCSS
- **Accessible:** Proper labels, error messages, keyboard navigation
- **Responsive:** Mobile-first approach
- **Consistent:** Unified color scheme and spacing

## 📄 License

Built as Track A - AI App Generator for the AI Software Engineer Internship

---

**Built with Next.js • React • TypeScript • TailwindCSS • PostgreSQL • Prisma**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
