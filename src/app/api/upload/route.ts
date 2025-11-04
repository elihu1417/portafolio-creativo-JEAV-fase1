import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { customAlphabet } from 'nanoid';

// Genera un ID aleatorio y seguro para el nombre del archivo
const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json(
      { error: 'No se proporcionó "filename".' },
      { status: 400 }
    );
  }
  
  // request.body es un ReadableStream, lo pasamos directamente
  if (!request.body) {
    return NextResponse.json(
      { error: 'No se proporcionó ningún archivo.' },
      { status: 400 }
    );
  }

  // 1. Generamos un nombre de archivo único
  const randomId = nanoid();
  const uniqueFilename = `${randomId}-${filename}`;

  try {
    // 2. Subimos el archivo al "almacén" (Vercel Blob)
    // El SDK de @vercel/blob usa automáticamente la variable BLOB_READ_WRITE_TOKEN
    const blob = await put(uniqueFilename, request.body, {
      access: 'public', // Queremos que la imagen sea visible públicamente
    });

    // 3. Devolvemos la URL pública del archivo subido
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
