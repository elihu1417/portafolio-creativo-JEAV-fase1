'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function NavegacionPrincipal() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between items-center p-6 bg-brand-bg bg-opacity-80 backdrop-blur-md">
        <div className="text-3xl font-titulo text-brand-text">
          <Link href="/">
            <Image
              src="/Logo JEAV.svg"
              alt="Logo JH"
              width={60}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        
        {/* Menú de escritorio */}
        <div className="hidden md:flex space-x-6 font-sans">
          <Link 
            href="/" 
            className="text-brand-text hover:text-brand-cyan transition"
          >
            Inicio
          </Link>
          <Link 
            href="/portafolio" 
            className="text-brand-text hover:text-brand-cyan transition"
          >
            Portafolio
          </Link>
          <Link 
            href="/servicios" 
            className="text-brand-text hover:text-brand-cyan transition"
          >
            Servicios
          </Link>
          <Link 
            href="/quien-soy" 
            className="text-brand-text hover:text-brand-cyan transition font-bold"
          >
            Quién Soy
          </Link>
          <Link 
            href="/contacto" 
            className="text-brand-text hover:text-brand-cyan transition"
          >
            Hablemos
          </Link>
        </div>

        {/* Botón de contacto - oculto en móvil */}
        <Link 
          href="/contacto" 
          className="hidden md:block bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-2 px-5 rounded-full transition font-sans"
        >
          Contacto
        </Link>

        {/* Botón hamburguesa - visible solo en móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-brand-text hover:text-brand-cyan transition"
          aria-label="Abrir menú"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      </nav>

      {/* Panel de menú móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-brand-bg bg-opacity-95 backdrop-blur-md">
          <div className="flex flex-col h-full">
            {/* Header del menú móvil */}
            <div className="flex justify-between items-center p-6">
              <div className="text-3xl font-titulo text-brand-text">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/Logo JEAV.svg"
                    alt="Logo JH"
                    width={60}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-brand-text hover:text-brand-cyan transition"
                aria-label="Cerrar menú"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* Enlaces del menú móvil */}
            <div className="flex flex-col items-center justify-center space-y-8 flex-1 font-sans">
              <Link 
                href="/" 
                className="text-2xl text-brand-text hover:text-brand-cyan transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/portafolio" 
                className="text-2xl text-brand-text hover:text-brand-cyan transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portafolio
              </Link>
              <Link 
                href="/servicios" 
                className="text-2xl text-brand-text hover:text-brand-cyan transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                href="/quien-soy" 
                className="text-2xl text-brand-text hover:text-brand-cyan transition font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Quién Soy
              </Link>
              <Link 
                href="/contacto" 
                className="text-2xl text-brand-text hover:text-brand-cyan transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hablemos
              </Link>
              
              {/* Botón de contacto en móvil */}
              <Link 
                href="/contacto" 
                className="bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-3 px-8 rounded-full transition font-sans text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}