'use client'

import { useOrbFollow } from '@/hooks/useOrbFollow'

export default function ServiciosDestacados() {
  const { containerRef, orbContainerRef, orbRef, orbTop } = useOrbFollow()
  return (
    <section id="servicios" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-16 text-brand-text font-titulo">
          Mis Servicios
        </h2>
        
        <div ref={containerRef} id="services-container" className="relative grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          
          <div className="md:col-span-1 flex justify-center py-4">
            <div ref={orbContainerRef} id="orb-container" className="relative w-20 h-full rounded-full overflow-hidden">
              <div 
                ref={orbRef}
                id="orb" 
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-brand-cyan rounded-full shadow-glow-cyan" 
                style={{ top: orbTop, transition: 'top 0.1s ease-out' }}
              ></div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div className="bg-gray-900 p-8 rounded-lg transition duration-300 hover:shadow-glow-cyan cursor-pointer flex items-center space-x-4">
                <svg className="w-8 h-8 text-brand-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <div>
                  <h3 className="text-2xl mb-1 text-brand-text font-titulo">
                    Branding
                  </h3>
                  <p className="text-brand-text opacity-70 font-sans">
                    Descripción muy básica del servicio de branding.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-lg transition duration-300 hover:shadow-glow-cyan cursor-pointer flex items-center space-x-4">
                <svg className="w-8 h-8 text-brand-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                  <h3 className="text-2xl mb-1 text-brand-text font-titulo">
                    Motion Graphics
                  </h3>
                  <p className="text-brand-text opacity-70 font-sans">
                    Descripción muy básica del servicio de motion graphics.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-lg transition duration-300 hover:shadow-glow-cyan cursor-pointer flex items-center space-x-4">
                <svg className="w-8 h-8 text-brand-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 14m6-6l.01.01"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z"></path>
                </svg>
                <div>
                  <h3 className="text-2xl mb-1 text-brand-text font-titulo">
                    Contenido Audiovisual
                  </h3>
                  <p className="text-brand-text opacity-70 font-sans">
                    Descripción muy básica del servicio de contenido audiovisual.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
