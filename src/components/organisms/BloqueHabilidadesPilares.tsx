export default function BloqueHabilidadesPilares() {
  return (
    <section className="py-16 md:py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-titulo text-center mb-16 animate-on-scroll">
          Mis Pilares Creativos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* TarjetaHabilidad 1: Branding */}
          <div 
            className="bg-gray-900 p-8 rounded-lg text-center transition duration-300 hover:shadow-glow-cyan animate-on-scroll" 
            style={{ transitionDelay: '0.1s' }}
          >
            <svg 
              className="w-16 h-16 text-brand-orange mx-auto mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="text-2xl mb-3 font-titulo">Branding</h3>
            <p className="font-sans opacity-70">
              Construcción de identidades de marca memorables y estratégicas.
            </p>
          </div>
          
          {/* TarjetaHabilidad 2: Audiovisual */}
          <div 
            className="bg-gray-900 p-8 rounded-lg text-center transition duration-300 hover:shadow-glow-cyan animate-on-scroll" 
            style={{ transitionDelay: '0.2s' }}
          >
            <svg 
              className="w-16 h-16 text-brand-blue mx-auto mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl mb-3 font-titulo">Audiovisual</h3>
            <p className="font-sans opacity-70">
              Producción y postproducción de video con impacto (Corporativo, Reels).
            </p>
          </div>
          
          {/* TarjetaHabilidad 3: Motion Graphics */}
          <div 
            className="bg-gray-900 p-8 rounded-lg text-center transition duration-300 hover:shadow-glow-cyan animate-on-scroll" 
            style={{ transitionDelay: '0.3s' }}
          >
            <svg 
              className="w-16 h-16 text-brand-cyan mx-auto mb-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-2xl mb-3 font-titulo">Motion Graphics</h3>
            <p className="font-sans opacity-70">
              Animación 2D y 3D para dar vida a ideas y mensajes complejos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
