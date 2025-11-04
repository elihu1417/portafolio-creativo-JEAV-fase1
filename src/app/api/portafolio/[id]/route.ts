// Este es el manual del mesero en /api/portfolio/[id]

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importamos al Chef

// Trabajo 1: Cuando el Admin quiere EDITAR un trabajo específico (PUT)
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // El mesero toma el ID del trabajo a editar
    const body = await request.json(); // Y toma los nuevos datos
    const { title, description, imageUrl, videoUrl, info } = body;

    // El mesero le dice al Chef: "Actualiza el 'PortfolioItem' con este ID"
    const updatedItem = await prisma.portfolioItem.update({
      where: { id: id }, // Busca por el ID
      data: { // Y actualiza con estos datos
        title,
        description,
        imageUrl,
        videoUrl,
        info,
      },
    });
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar el item' }, { status: 500 });
  }
}

// Trabajo 2: Cuando el Admin quiere BORRAR un trabajo específico (DELETE)
export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // El mesero toma el ID del trabajo a borrar

    // El mesero le dice al Chef: "Borra el 'PortfolioItem' con este ID"
    await prisma.portfolioItem.delete({
      where: { id: id },
    });
    
    // El mesero regresa y dice "¡Listo, borrado!"
    return NextResponse.json({ message: 'Item eliminado' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar el item' }, { status: 500 });
  }
}