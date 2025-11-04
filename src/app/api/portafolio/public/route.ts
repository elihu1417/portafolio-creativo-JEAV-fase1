// API pública para obtener proyectos publicados
// No requiere autenticación

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Obtener solo proyectos publicados, ordenados por fecha de creación (más recientes primero)
    const items = await prisma.portfolioItem.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transformar los datos al formato esperado por los componentes públicos
    const publicItems = items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      tags: item.tags || [],
      resumeCorto: item.resumeCorto,
      resumeLargo: item.resumeLargo,
      imagenPortadaUrl: item.imagenPortadaUrl,
      imagenPrincipalUrl: item.imagenPrincipalUrl,
      videoUrl: item.videoUrl,
      contentBlocks: item.contentBlocks,
      colaboradores: item.colaboradores,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return NextResponse.json(publicItems);
  } catch (error) {
    console.error('Error en GET /api/portafolio/public:', error);
    return NextResponse.json({ error: 'Error al obtener los proyectos' }, { status: 500 });
  }
}

