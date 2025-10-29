import Link from 'next/link'
import Image from 'next/image'

export default function FooterPublico() {
  return (
    <footer className="py-16 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Image
              src="/Logo JEAV.svg"
              alt="Logo Juan Elihu Arrieta Vela"
              width={60}
              height={32}
              className="h-8 w-auto mb-2"
            />
            <p className="text-brand-text opacity-70 max-w-xs font-sans">
              Creatividad y estrategia para marcas que merecen ser vistas.
            </p>
          </div>
          <div>
            <h4 className="text-lg mb-4 text-brand-text font-sans">
              Mapa del Sitio
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/portafolio" 
                  className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans"
                >
                  Portafolio
                </Link>
              </li>
              <li>
                <Link 
                  href="/servicios" 
                  className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacto" 
                  className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg mb-4 text-brand-text font-sans">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans"
                >
                  Términos de Servicio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-brand-text opacity-50 font-sans">
          <p>© 2025 Juan Elihu Arrieta Vela. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
