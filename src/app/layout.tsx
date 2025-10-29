import type { Metadata } from 'next'
import '@/app/globals.css'
import CustomCursor from '@/components/atoms/CustomCursor'
import NavegacionPrincipal from '@/components/organisms/NavegacionPrincipal'
import FooterPublico from '@/components/organisms/FooterPublico'

export const metadata: Metadata = { 
  title: 'Portafolio Creativo', 
}

export default function RootLayout({ 
  children, 
}: { 
  children: React.ReactNode 
}) { 
  return (
    <html lang="es">
      <body>
        <CustomCursor />
        <NavegacionPrincipal />
        {children}
        <FooterPublico />
      </body>
    </html>
  )
}