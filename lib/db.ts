// Database client initialization using Prisma
// This file handles connection pooling and provides a singleton Prisma client

import { PrismaClient } from '@prisma/client';

// Declare global type for Prisma client
declare global {
  var prisma: PrismaClient | undefined;
}

// Create Prisma client with logging in development
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['error', 'warn']
    : ['error'],
});

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;

/**
 * Utility function to handle Prisma errors gracefully
 */
export function formatPrismaError(error: any): string {
  if (error.code === 'P2002') {
    const field = error.meta?.target?.[0];
    return `A record with this ${field} already exists`;
  }
  if (error.code === 'P2025') {
    return 'Record not found';
  }
  if (error.code === 'P2003') {
    return 'Invalid reference to related record';
  }
  return error.message || 'Database operation failed';
}
