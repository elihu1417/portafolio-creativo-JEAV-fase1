import { PrismaClient } from '@prisma/client';

// Esta variable global evita que se creen múltiples conexiones en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Opcional: Esto registrará en tu terminal cada consulta que se haga a la DB
    log: ['query'], 
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;