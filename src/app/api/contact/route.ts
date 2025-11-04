// Este es el manual del mesero en /api/contact

import { NextResponse } from 'next/server';
// 1. Importamos al "Chef" (Prisma) que sabe cómo usar la despensa
import { prisma } from '@/lib/prisma'; 

// 2. Este mesero SÓLO sabe responder a peticiones "POST" (enviar un nuevo mensaje)
export async function POST(request: Request) {
  
  // 3. El mesero intenta hacer su trabajo (con un try/catch para manejar errores)
  try {
    // 4. Lee la "orden" (los datos) que le dio el cliente (el formulario)
    const body = await request.json();
    const { name, email, message } = body;

    // 5. El mesero le entrega la orden al "Chef" (Prisma) y le dice:
    // "Crea un nuevo 'ContactSubmission' con estos datos"
    const newSubmission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
      },
    });

    // 6. El Chef le confirma al mesero. El mesero regresa al cliente y le dice:
    // "¡Todo bien! Aquí tienes tu recibo (los datos guardados)"
    return NextResponse.json(newSubmission, { status: 201 });

  } catch (error) {
    // 7. Si algo sale mal (ej. el Chef se tropieza), el mesero regresa y le dice:
    // "Lo siento, hubo un error en la cocina"
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
  }
}