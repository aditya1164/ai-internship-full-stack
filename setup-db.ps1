# Database Setup Script for AppGenerator (Windows)
# This script helps set up PostgreSQL with Prisma

Write-Host "🚀 AppGenerator Database Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 1: Install Prisma
Write-Host "📦 Installing Prisma and @prisma/client..." -ForegroundColor Cyan
npm install @prisma/client
npm install --save-dev prisma

Write-Host "✓ Prisma installed" -ForegroundColor Green
Write-Host ""

# Step 2: Generate Prisma client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate

Write-Host "✓ Prisma Client generated" -ForegroundColor Green
Write-Host ""

# Step 3: Run migrations
Write-Host "🗄️  Running database migrations..." -ForegroundColor Cyan
Write-Host ""
Write-Host "This will create the following tables:" -ForegroundColor Yellow
Write-Host "  - User"
Write-Host "  - AppConfig"
Write-Host "  - DynamicField"
Write-Host "  - GeneratedRecord"
Write-Host ""

npx prisma migrate dev --name init

Write-Host "✓ Database migrations completed!" -ForegroundColor Green
Write-Host ""

# Step 4: Ask if user wants to open Prisma Studio
Write-Host "🎨 Would you like to open Prisma Studio to view your database? (y/n)" -ForegroundColor Cyan
$response = Read-Host

if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "Opening Prisma Studio (Press Ctrl+C to close)..." -ForegroundColor Yellow
    npx prisma studio
}

Write-Host ""
Write-Host "✅ Database setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test the application: http://localhost:3000"
Write-Host "2. Try submitting the form demo: http://localhost:3000/demo/form"
Write-Host "3. Check your data in Prisma Studio (npx prisma studio)"
Write-Host ""
