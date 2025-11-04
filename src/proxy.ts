import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session'; // Importamos el manejador de sesión

// Definimos el tipo de nuestra sesión (para TypeScript)
interface AdminSession {
  isAdmin?: boolean;
}

// 1. Configuración de la sesión (debe ser IDÉNTICA a la de la API de login)
const sessionOptions = {
  cookieName: 'admin_session',
  password: process.env.SESSION_COOKIE_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- REGISTRO DE SEGURIDAD 1: PROTEGER LA COCINA (API) ---
  if (pathname.startsWith('/api/portfolio')) {
    const authorization = request.headers.get('Authorization');
    
    // Si la petición a la API no tiene el "pase de cocina" (Bearer Token) correcto, la rechazamos.
    if (authorization !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    // Si lo tiene, puede pasar.
    return NextResponse.next();
  }

  // --- REGISTRO DE SEGURIDAD 2: PROTEGER EL EDIFICIO DE ADMIN (UI) ---
  if (pathname.startsWith('/admin')) {
    // Obtenemos la "llave maestra" (la cookie) del usuario
    const session = await getIronSession<AdminSession>(request, new NextResponse(), sessionOptions);

    // Si el usuario NO tiene la llave (no ha iniciado sesión), lo echamos.
    if (!session.isAdmin) {
      // Lo redirigimos a la página de login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    // Si tiene la llave, puede pasar.
    return NextResponse.next();
  }

  // Si la ruta no es ni de admin ni de la API del portfolio, no hacemos nada.
  return NextResponse.next();
}

// 8. Regla del Guardia: "Vigilaré la puerta de /admin y la de /api/portfolio"
export const config = {
  proxy: ['/admin/:path*', '/api/portfolio/:path*'],
};
