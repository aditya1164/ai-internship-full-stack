# Database Setup Guide - Neon PostgreSQL

This guide walks you through setting up a free PostgreSQL database using Neon and connecting it to AppGenerator.

## Step 1: Sign Up for Neon (Free)

1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up" and choose your sign-up method (Google, GitHub, or email)
3. Verify your email if needed
4. Create a new project:
   - **Project Name:** `app-generator`
   - **Database Name:** Keep default `neondb`
   - **Branch Name:** Keep default `main`
   - **Region:** Choose closest to you

## Step 2: Get Your Connection String

After creating your project:

1. In Neon dashboard, you'll see your database listed
2. Click on the database connection details
3. Look for the connection string in format:
   ```
   postgresql://[user]:[password]@[host]/[database]?sslmode=require
   ```
4. Copy the entire connection string

**Example (yours will be different):**
```
postgresql://neondb_owner:abc123def456@ep-cool-cloud-789456.us-east-4.neon.tech/neondb?sslmode=require
```

## Step 3: Update .env.local

1. Open `c:\Users\Aditya\Desktop\app-generator\.env.local`
2. Replace the `DATABASE_URL` line with your Neon connection string:

```env
DATABASE_URL="postgresql://neondb_owner:your-password@ep-xxxxxx.region.neon.tech/neondb?sslmode=require"

# Keep the rest of the configuration as is
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

⚠️ **IMPORTANT:** 
- Keep `sslmode=require` at the end (required for Neon)
- Don't commit `.env.local` to GitHub (it's in .gitignore)
- The password may contain special characters - copy it exactly

## Step 4: Run Prisma Migrations

In the terminal, from the `app-generator` directory:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# Open Prisma Studio to view your database
npx prisma studio
```

You should see output showing:
```
✓ Generated Prisma Client (x.x.x) in 234ms

migrations
  └─ 20240101000000_init/
    └─ migration.sql

Your database has been created at <your-connection-string>

✓ Database synced, migrations ran successfully.
```

## Step 5: Verify Database Setup

1. Prisma Studio opens at `http://localhost:5555`
2. You should see 4 tables:
   - `User`
   - `AppConfig`
   - `DynamicField`
   - `GeneratedRecord`
3. All tables are empty (ready for data)

## Step 6: Test Database Integration

The API routes are now connected to the database. Test by:

### Test 1: Create a Config
```bash
curl -X POST http://localhost:3000/api/configs \
  -H "Content-Type: application/json" \
  -d '{
    "type": "form",
    "name": "Test Form",
    "fields": [{"name": "email", "type": "email", "label": "Email"}]
  }'
```

### Test 2: Submit a Form
Go to `http://localhost:3000/demo/form` and submit the form. Check Prisma Studio to see the record in `GeneratedRecord` table.

### Test 3: Fetch Records
```bash
curl http://localhost:3000/api/records
```

Should return your submitted records.

## Troubleshooting

### Connection Refused
- ✓ Check DATABASE_URL is correct (copy from Neon dashboard)
- ✓ Ensure `?sslmode=require` is at the end
- ✓ Verify Neon project is active (not deleted)

### Migration Fails
- Run: `npx prisma db push` (alternative to migrate)
- Check `.env.local` is in root of `app-generator` directory

### Cannot Find Module '@prisma/client'
- Run: `npm install @prisma/client`
- Then: `npx prisma generate`

### Neon Connection Timeouts
- May need to allow Neon IP in firewall (usually automatic)
- Wait 30 seconds and try again

## Next Steps

After database setup is complete:

1. ✅ Database integration is live
2. Next: Implement Track A additional features (CSV import, notifications, multi-language)
3. Then: Push to GitHub
4. Finally: Deploy to Vercel or Railway

---

**Need Help?**
- Neon Docs: https://neon.tech/docs
- Prisma Docs: https://www.prisma.io/docs
- Check `app/api/*/route.ts` for API implementation details
