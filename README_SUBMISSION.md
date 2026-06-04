# AppGenerator - Track A AI App with 3 Additional Features

**Production-Ready Metadata-Driven Application Runtime**

## 🎯 Project Overview

A complete full-stack application that generates dynamic UI components from JSON metadata. The system intelligently renders forms, tables, and dashboards without hardcoding - all driven by configuration files.

### Track A Requirements Status
✅ **All 3 Additional Features Implemented:**
1. **CSV Import** - Bulk data loading with validation
2. **Toast Notifications** - Real-time user feedback  
3. **Multi-language Support** - English & Spanish

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (or use Neon free tier)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/aditya1164/ai-internship-full-stack.git
cd ai-internship-full-stack

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL from Neon
```

### Environment Setup

```env
# .env.local
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require"
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev --name init

# Optional: Open Prisma Studio to view data
npx prisma studio
```

### Development Server

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

---

## 📱 Live Demos

All demos are interactive and powered by the metadata-driven system:

### 1. **Form Demo** (`/demo/form`)
- Dynamic form rendering from JSON config
- Real-time validation with error messages  
- Toast notifications on submit
- Support for 8+ field types
- Fields: Full Name, Email, Age, Country, Bio, Terms

**Features:**
- ✓ Required field validation
- ✓ Email format validation
- ✓ Success/error toasts
- ✓ Clear form button
- ✓ Responsive design

### 2. **Table Demo** (`/demo/table`)
- Sortable columns with visual indicators
- Search/filter functionality
- Pagination support
- **NEW: CSV Import Section**

**Features:**
- ✓ Click column headers to sort
- ✓ Search records in real-time
- ✓ Delete individual rows
- ✓ CSV drag-and-drop upload
- ✓ Import validation & error reporting

### 3. **Dashboard Demo** (`/demo/dashboard`)
- Statistics cards with metrics
- Data visualization ready
- Responsive grid layout

**Features:**
- ✓ Total records counter
- ✓ Category breakdown
- ✓ Status distribution
- ✓ Recent activity timeline

### 4. **Features Demo** (`/demo/features`)
- Showcase of all 3 Track A features
- Implementation details and code examples
- Links to test each feature

---

## 🎁 Additional Features Implementation

### Feature 1: CSV Import

**📤 What It Does:**
Import bulk records from CSV files with automatic validation and error handling.

**Location:** `/demo/table` - Scroll to "Bulk Import Records" section

**How to Use:**
1. Go to Table Demo (`/demo/table`)
2. Scroll to "📤 Bulk Import Records" section
3. Drag a CSV file onto the upload area (or click to select)
4. View import results with success/failure counts

**CSV Format Example:**
```csv
productName,category,price,quantity,status
Laptop Pro,Electronics,1299.99,5,available
USB Cable,Accessories,19.99,100,available
```

**Implementation Details:**
- **API Endpoint:** `POST /api/import-csv`
- **File Location:** `app/api/import-csv/route.ts`
- **Component:** `components/CSVUpload.tsx`
- **Features:**
  - Row-by-row validation
  - Type conversion (numbers, dates, booleans)
  - Detailed error reporting
  - Bulk database insert
  - Progress feedback

---

### Feature 2: Toast Notifications

**🔔 What It Does:**
Show real-time toast messages for user actions with beautiful animations and auto-dismiss.

**Where You See It:**
- Form submission: Success/error messages
- CSV import: Status updates
- API errors: Error alerts

**Toast Types:**
- ✓ **Success** (Green) - Successful operations
- ✗ **Error** (Red) - Failed operations  
- ⚠️ **Warning** (Yellow) - Warning messages
- ℹ️ **Info** (Blue) - Informational messages

**Implementation Details:**
- **Hook:** `useNotification()` for any component
- **Files:**
  - `lib/notifications.tsx` - Context provider
  - `components/ToastContainer.tsx` - Display component
- **Features:**
  - React Context-based
  - Auto-dismiss (4 seconds)
  - Manual close option
  - Stacked display
  - Smooth animations

**Usage Example:**
```typescript
'use client';
import { useNotification } from '@/lib/notifications';

export function MyComponent() {
  const { addToast } = useNotification();
  
  const handleClick = () => {
    addToast('Success!', 'success');
    addToast('Error occurred', 'error');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
```

---

### Feature 3: Multi-language Support

**🌐 What It Does:**
Support multiple languages with easy switching and URL-based routing.

**Supported Languages:**
- 🇺🇸 English (en) - Default
- 🇪🇸 Spanish (es)

**How to Use:**
- Look for language selector in navigation (shown on form/table demos)
- Click to open dropdown menu
- Select English or Spanish
- All UI text updates to selected language
- URL changes to reflect locale

**Implementation Details:**
- **Framework:** `next-intl` for i18n
- **Translation Files:**
  - `messages/en.json` - English translations
  - `messages/es.json` - Spanish translations
- **Configuration:** `i18n.config.ts`
- **Component:** `components/LanguageSwitcher.tsx`
- **Features:**
  - URL-based routing (/en/path, /es/path)
  - Automatic persistence
  - Easy to add new languages
  - Translation keys for all UI text

**Adding a New Language:**
```bash
# 1. Create translation file
# Create messages/fr.json with French translations

# 2. Update i18n config
# Add 'fr' to locales in i18n.config.ts

# 3. Restart server
npm run dev
```

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript (strict mode)
- TailwindCSS 3
- next-intl (i18n)

**Backend:**
- Next.js API Routes
- TypeScript
- Validation System (custom validators)
- RESTful APIs

**Database:**
- PostgreSQL (Neon cloud)
- Prisma ORM v7
- Type-safe queries
- Automatic migrations

**Additional Libraries:**
- csv-parse (CSV processing)
- clsx (className utilities)
- class-variance-authority (styling patterns)

### Project Structure

```
app-generator/
├── app/
│   ├── api/
│   │   ├── import-csv/          # CSV import endpoint
│   │   ├── configs/              # Config CRUD
│   │   └── records/              # Records CRUD
│   ├── demo/
│   │   ├── form/                # Form demo page
│   │   ├── table/               # Table demo page
│   │   ├── dashboard/           # Dashboard demo page
│   │   └── features/            # Features showcase
│   ├── layout.tsx               # Root layout with notifications
│   └── page.tsx                 # Landing page
├── components/
│   ├── CSVUpload.tsx           # CSV upload component
│   ├── ToastContainer.tsx      # Toast notification display
│   ├── LanguageSwitcher.tsx    # Language selector
│   └── renderers/
│       ├── FormRenderer.tsx    # Dynamic form rendering
│       ├── TableRenderer.tsx   # Dynamic table rendering
│       ├── DashboardRenderer/  # Dashboard rendering
│       └── DynamicRenderer.tsx # Router component
├── lib/
│   ├── db.ts                   # Prisma singleton
│   ├── notifications.tsx       # Notification system
│   ├── validators.ts           # Validation logic
│   ├── types.ts                # TypeScript types
│   └── utils.ts                # Utility functions
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Migration files
├── messages/
│   ├── en.json                 # English translations
│   └── es.json                 # Spanish translations
├── i18n.config.ts             # i18n configuration
├── FEATURES.md                # Detailed feature documentation
├── DATABASE_SETUP.md          # Database setup guide
└── README.md                  # This file
```

### Data Flow

```
User Input
    ↓
Form/Table Component
    ↓
Validation (FormValidator)
    ↓
API Route (POST /api/records)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Toast Notification
```

---

## 📊 Database Schema

### Models

**User**
- Fields: id, email, name, created_at
- Relations: appConfigs (1-to-many)

**AppConfig**
- Fields: id, name, type, fields (JSON), owner_id
- Types: 'form', 'table', 'dashboard'
- Relations: user (1-to-1), records (1-to-many)

**DynamicField**
- Fields: id, name, type, label, config (JSON)
- Includes: validation rules, options, defaults

**GeneratedRecord**
- Fields: id, data (JSON), config_id, created_at
- Stores: user submitted form/table data

---

## 🔌 API Endpoints

### Configuration Management

**GET /api/configs**
- Fetch all application configurations
- Returns: Array of AppConfig objects

**POST /api/configs**
- Create new configuration
- Body: { name, type, fields, description }

**DELETE /api/configs**
- Delete configuration by ID
- Body: { id }

### Record Management

**GET /api/records**
- Fetch records for a config
- Query: ?configId=xxx
- Returns: Array of records

**POST /api/records**
- Submit new record
- Body: { configId, data }
- Includes: Validation & notifications

**DELETE /api/records**
- Delete record by ID
- Body: { id }

### CSV Import

**POST /api/import-csv**
- Bulk import records from CSV
- Body: FormData { file, configId }
- Returns: { successful, failed, errors }

---

## 🚀 Deployment

### Deploy to Vercel (Recommended for Next.js)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Set environment variables
# Go to https://vercel.com/dashboard/[project]/settings/environment-variables
# Add DATABASE_URL from Neon
```

### Deploy to Railway

```bash
# 1. Create account at railway.app
# 2. Connect GitHub repository
# 3. Add environment variables (DATABASE_URL)
# 4. Deploy

# Service will auto-start on push to main branch
```

### Deploy to Other Platforms

**Heroku (no longer free):**
```bash
heroku create app-name
heroku config:set DATABASE_URL="your-connection-string"
git push heroku main
```

**Render:**
- Connect GitHub repo
- Buildpack: Node.js
- Environment: DATABASE_URL
- Start command: npm start

---

## 🧪 Testing Features

### Test CSV Import
1. Go to `/demo/table`
2. Create a CSV file:
```csv
productName,category,price,quantity,status
Test Product,Test Category,99.99,10,active
```
3. Drag onto upload zone
4. Check results display

### Test Notifications
1. Go to `/demo/form`
2. Leave required fields empty and submit → Error notification
3. Fill all fields and submit → Success notification

### Test Multi-language
1. Look for language selector
2. Click to open menu
3. Select different language
4. Verify UI text changes
5. Refresh page → Language preference persists

---

## 🔑 Key Features

### Error Resilience ✓
- Handles missing fields gracefully
- Invalid values get sensible defaults
- Unknown components fall back safely
- User-friendly error messages

### Type Safety ✓
- TypeScript strict mode enabled
- Full type coverage
- Runtime validation
- IDE intellisense support

### Responsive Design ✓
- Mobile-first approach
- Tailwind breakpoints (sm, md, lg, xl)
- Professional appearance
- No AI-generated look

### Performance ✓
- Server-side form validation
- Optimized database queries
- Lazy loading components
- Minimal JavaScript bundles

### Accessibility ✓
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

---

## 📝 Configuration Example

### Create a Custom Form Configuration

```json
{
  "type": "form",
  "name": "Employee Registration",
  "description": "Register new employees",
  "fields": [
    {
      "name": "fullName",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "validation": {
        "minLength": 3,
        "maxLength": 100
      }
    },
    {
      "name": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "validation": {
        "pattern": "email"
      }
    },
    {
      "name": "department",
      "type": "select",
      "label": "Department",
      "required": true,
      "options": [
        { "label": "Engineering", "value": "eng" },
        { "label": "Sales", "value": "sales" },
        { "label": "Marketing", "value": "marketing" }
      ]
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check DATABASE_URL format
# Should be: postgresql://user:password@host/db

# Test connection
npx prisma db push

# View error logs
npx prisma migrate resolve
```

### CSV Import Not Working
- Ensure CSV has header row
- Column names must match form field names
- Check file is valid UTF-8 encoding
- Check browser console for errors

### Multi-language Not Working
- Verify next-intl is installed: `npm list next-intl`
- Check i18n.config.ts exists
- Verify messages/en.json and messages/es.json exist
- Restart dev server after config changes

### Forms Not Showing
- Check config has `fields` array
- Verify field types are supported
- Check for console errors in browser DevTools
- Ensure FormRenderer component is imported

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM Docs](https://www.prisma.io/docs)
- [Neon PostgreSQL](https://neon.tech/docs)
- [next-intl Guide](https://next-intl.dev)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

---

## 📄 License

This project is part of an AI Software Engineer Internship submission for Track A - AI App Generator.

---

## 👨‍💻 Development Notes

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push and create PR
git push origin feature/your-feature
```

### Local Development Best Practices
- Keep .env.local private (never commit)
- Test features on both form and table demos
- Check responsive design on mobile sizes
- Run `npm run build` before commits
- Test on different browsers

### Debugging Tips
- Enable Prisma logging: `?log=query,info,warn`
- Use Prisma Studio: `npx prisma studio`
- Check Next.js build output: `npm run build`
- Browser DevTools Network tab for API requests
- Server logs in terminal running `npm run dev`

---

**Last Updated:** June 4, 2026
**Status:** ✅ Production Ready
**Version:** 1.0.0
