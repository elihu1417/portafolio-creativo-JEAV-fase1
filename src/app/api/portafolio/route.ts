// Este es el manual del mesero en /api/portfolio

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importamos al Chef

// Trabajo 1: Cuando el Admin pide VER TODO el portafolio (GET)
export async function GET() {
  try {
    // El mesero le pide al Chef: "Busca TODOS los 'PortfolioItem'"
    const items = await prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' }, // Ordenados del más nuevo al más viejo
    });
    // El mesero regresa con la lista
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los items' }, { status: 500 });
  }
}

// Trabajo 2: Cuando el Admin quiere CREAR un nuevo trabajo (POST)
export async function POST(request: Request) {
  try {
    // El mesero toma los datos del nuevo trabajo
    const body = await request.json();
    const { title, description, imageUrl, videoUrl, info } = body;

    // El mesero le da la orden al Chef: "Crea un 'PortfolioItem'"
    const newItem = await prisma.portfolioItem.create({
      data: {
        title,
        description,
        imageUrl,
        videoUrl, // Opcional
        info,     // Opcional
      },
    });
    // El mesero regresa con el nuevo item creado
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear el item' }, { status: 500 });
  }
}