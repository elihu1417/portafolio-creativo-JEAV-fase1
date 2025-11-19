// Este es el manual del mesero en /api/portfolio

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importamos al Chef

// Trabajo 1: Cuando el Admin pide VER TODO el portafolio (GET)
// (Esta función no cambia)
export async function GET() {
  try {
    const items = await prisma.portfolioItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los items' }, { status: 500 });
  }
}

// Trabajo 2: Cuando el Admin quiere CREAR un nuevo trabajo (POST)
// (Esta función está ACTUALIZADA para el nuevo schema)
export async function POST(request: Request) {
  try {
    // El mesero toma los datos del nuevo formulario
    const body = await request.json();
    
    // Desestructuramos TODOS los campos nuevos
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

    // Validación simple
    if (!title || !category || !resumeCorto || !resumeLargo || !imagenPortadaUrl || !imagenPrincipalUrl) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    // El mesero le da la orden al Chef: "Crea un 'PortfolioItem' con todo esto"
    // Log para debug
    console.log('Creando proyecto con isPublished:', isPublished);
    
    const newItem = await prisma.portfolioItem.create({
      data: {
        title,
        isPublished: Boolean(isPublished), // Asegurar que sea un booleano
        category,
        tags, // Array de strings
        resumeCorto,
        resumeLargo,
        imagenPortadaUrl,
        imagenPrincipalUrl,
        contentBlocks, // Objeto JSON
        colaboradores, // Objeto JSON
        videoUrl: videoUrl || null, // Opcional
      },
    });
    
    console.log('Proyecto creado exitosamente:', {
      id: newItem.id,
      title: newItem.title,
      isPublished: newItem.isPublished
    });
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    // Captura de error más detallada
    console.error("Error en POST /api/portfolio:", error);
    return NextResponse.json({ error: 'Error al crear el item' }, { status: 500 });
  }
}
