import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Solo proteger rutas de admin
  if (pathname.startsWith('/admin/proyectos')) {
    // Verificar si hay token de autenticación (temporal con cookies)
    const isAuthenticated = request.cookies.get('admin-auth')
    
    if (!isAuthenticated) {
      // Redirigir al login
      const loginUrl = new URL('/admin', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
