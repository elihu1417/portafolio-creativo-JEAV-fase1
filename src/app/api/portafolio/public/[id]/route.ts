// API pública para obtener un proyecto publicado por ID
// No requiere autenticación

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Buscar el proyecto, pero solo si está publicado
    const item = await prisma.portfolioItem.findFirst({
      where: {
        id: id,
        isPublished: true,
      },
    });

    if (!item) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 });
    }

    // Transformar los datos al formato esperado por los componentes públicos
    const publicItem = {
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
    };

    return NextResponse.json(publicItem);
  } catch (error: any) {
    let id = 'unknown';
    try {
      const resolvedParams = await context.params;
      id = resolvedParams.id;
    } catch {
      // Si falla obtener params, usar 'unknown'
    }
    console.error(`Error en GET /api/portafolio/public/${id}:`, error);
    return NextResponse.json({ error: 'Error al obtener el proyecto' }, { status: 500 });
  }
}

