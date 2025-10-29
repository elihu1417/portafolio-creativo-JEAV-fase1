import Link from 'next/link'

interface SeccionServicioDetalleProps {
  titulo: string
  descripcion: string
  entregables: string[]
  enlace: string
  textoEnlace: string
  icono: React.ReactNode
  alternarLayout?: boolean
  delay?: string
}

export default function SeccionServicioDetalle({
  titulo,
  descripcion,
  entregables,
  enlace,
  textoEnlace,
  icono,
  alternarLayout = false,
  delay = '0s'
}: SeccionServicioDetalleProps) {
  return (
    <div 
      className="container mx-auto px-6 animate-on-scroll" 
      style={{ transitionDelay: delay }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        {/* Columna Izquierda: Icono/Imagen */}
        <div className={`md:col-span-1 flex justify-center ${alternarLayout ? 'md:order-last' : ''}`}>
          {icono}
        </div>
        
        {/* Columna Derecha: Texto */}
        <div className={`md:col-span-2 ${alternarLayout ? 'md:order-first' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-titulo mb-4">{titulo}</h2>
          <p className="text-lg font-sans leading-relaxed opacity-80 mb-6">
            {descripcion}
          </p>
          <h4 className="font-bold text-lg mb-3 font-sans">Entregables Clave:</h4>
          <ul className="entregables-list font-sans opacity-80 mb-8 space-y-2">
            {entregables.map((entregable, index) => (
              <li key={index} className="flex items-center">
                <svg 
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                    clipRule="evenodd"
                  />
                </svg>
                {entregable}
              </li>
            ))}
          </ul>
          <Link 
            href={enlace} 
            className="inline-flex items-center space-x-2 text-brand-cyan hover:text-white transition font-sans font-bold"
          >
            <span>{textoEnlace}</span>
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
