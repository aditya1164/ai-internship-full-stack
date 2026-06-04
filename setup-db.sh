#!/bin/bash
# Database Setup Script for AppGenerator
# This script helps set up PostgreSQL with Prisma

set -e

echo "🚀 AppGenerator Database Setup"
echo "================================"
echo ""

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npm/npx not found. Please install Node.js first."
    exit 1
fi

echo "✓ npm found"
echo ""

# Step 1: Install Prisma
echo "📦 Installing Prisma and @prisma/client..."
npm install @prisma/client
npm install --save-dev prisma

echo "✓ Prisma installed"
echo ""

# Step 2: Generate Prisma client
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo "✓ Prisma Client generated"
echo ""

# Step 3: Run migrations
echo "🗄️ Running database migrations..."
echo ""
echo "This will create the following tables:"
echo "  - User"
echo "  - AppConfig"
echo "  - DynamicField"
echo "  - GeneratedRecord"
echo ""

npx prisma migrate dev --name init

echo "✓ Database migrations completed!"
echo ""

# Step 4: Open Prisma Studio (optional)
echo "🎨 Opening Prisma Studio to view your database..."
echo "(Press Ctrl+C to close)"
echo ""

npx prisma studio

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Test the application: http://localhost:3000"
echo "2. Try submitting the form demo: http://localhost:3000/demo/form"
echo "3. Check your data in Prisma Studio (npx prisma studio)"
echo ""
