import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Tipo para la sesión del admin
interface AdminSession {
  isAdmin?: boolean;
}

// 1. Configuración de la sesión (la "llave maestra")
const sessionOptions = {
  cookieName: "admin_session", // Nombre de nuestra cookie
  password: process.env.SESSION_COOKIE_SECRET as string, // La clave secreta para firmarla
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
    httpOnly: true, // No accesible desde JavaScript en el navegador
  },
};

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  // 2. Comparamos la contraseña enviada con nuestro secreto
  if (password === process.env.ADMIN_PASSWORD) {
    // 3. ¡Contraseña correcta! Creamos la sesión.
    const response = new NextResponse();
    const session = await getIronSession<AdminSession>(request, response, sessionOptions);
    session.isAdmin = true; // Guardamos en la cookie que es un admin
    await session.save();

    // 4. Le enviamos al frontend el ADMIN_TOKEN para que lo use en las llamadas a API
    return NextResponse.json(
      { ok: true, token: process.env.ADMIN_TOKEN },
      { headers: response.headers } // Adjuntamos las cookies de la sesión
    );
  }

  // 5. Contraseña incorrecta
  return NextResponse.json(
    { ok: false, error: "Contraseña incorrecta" },
    { status: 401 }
  );
}
