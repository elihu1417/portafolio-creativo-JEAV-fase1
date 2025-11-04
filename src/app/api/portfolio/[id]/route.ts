// Este es el manual del mesero en /api/portfolio/[id]

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importamos al Chef

// Trabajo 0: Cuando el Admin quiere VER un trabajo específico (GET)
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // El mesero toma el ID del trabajo a buscar

    // El mesero le dice al Chef: "Dame el 'PortfolioItem' con este ID"
    const item = await prisma.portfolioItem.findUnique({
      where: { id: id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Proyecto no encontrado' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    let id = 'unknown';
    try {
      const resolvedParams = await context.params;
      id = resolvedParams.id;
    } catch {
      // Si falla obtener params, usar 'unknown'
    }
    console.error(`Error en GET /api/portfolio/${id}:`, error);
    return NextResponse.json({ error: 'Error al obtener el item' }, { status: 500 });
  }
}

// Trabajo 1: Cuando el Admin quiere EDITAR un trabajo específico (PUT)
// (Esta función está ACTUALIZADA para el nuevo schema)
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // El mesero toma el ID del trabajo a editar
    
    // El mesero toma los datos del formulario
    const body = await request.json();
    const {
      title,
      isPublished,
      category,
      tags,
      resumeCorto,
      resumeLargo,
      imagenPortadaUrl,
      imagenPrincipalUrl,
      contentBlocks, // JSON
      colaboradores, // JSON
      videoUrl
    } = body;

    // El mesero le dice al Chef: "Actualiza el 'PortfolioItem' con este ID"
    const updatedItem = await prisma.portfolioItem.update({
      where: { id: id }, // Busca por el ID
      data: { // Y actualiza con todos estos datos
        title,
        isPublished,
        category,
        tags,
        resumeCorto,
        resumeLargo,
        imagenPortadaUrl,
        imagenPrincipalUrl,
        contentBlocks,
        colaboradores,
        videoUrl: videoUrl || null,
      },
    });
    
    return NextResponse.json(updatedItem);
  } catch (error: any) {
    let id = 'unknown';
    try {
      const resolvedParams = await context.params;
      id = resolvedParams.id;
    } catch {
      // Si falla obtener params, usar 'unknown'
    }
    console.error(`Error en PUT /api/portfolio/${id}:`, error);
    return NextResponse.json({ error: 'Error al actualizar el item' }, { status: 500 });
  }
}

// Trabajo 2: Cuando el Admin quiere BORRAR un trabajo específico (DELETE)
// (Esta función no cambia)
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // El mesero toma el ID del trabajo a borrar

    await prisma.portfolioItem.delete({
      where: { id: id },
    });
    
    return NextResponse.json({ message: 'Item eliminado' }, { status: 200 });
  } catch (error: any) {
    let id = 'unknown';
    try {
      const resolvedParams = await context.params;
      id = resolvedParams.id;
    } catch {
      // Si falla obtener params, usar 'unknown'
    }
    console.error(`Error en DELETE /api/portfolio/${id}:`, error);
    return NextResponse.json({ error: 'Error al eliminar el item' }, { status: 500 });
  }
}
