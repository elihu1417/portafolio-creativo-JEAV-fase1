import SeccionServicioDetalle from './SeccionServicioDetalle'

export default function ListaServiciosDetallada() {
  const servicios = [
    {
      titulo: "Branding y Creación de Identidad",
      descripcion: "Creamos marcas con propósito y personalidad. Partimos de la estrategia para definir tu voz, tu mensaje y tu identidad visual, asegurando que conectes auténticamente con tu público.",
      entregables: [
        "Estrategia de Marca",
        "Diseño de Logotipo y Variantes",
        "Manual de Identidad Visual",
        "Paleta de Colores y Tipografías",
        "Diseño de Papelería (Opcional)"
      ],
      enlace: "/portafolio?filter=branding",
      textoEnlace: "Ver proyectos de Branding",
      icono: (
        <svg 
          className="w-40 h-40 text-brand-orange" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      alternarLayout: false,
      delay: "0s"
    },
    {
      titulo: "Motion Graphics y Animación",
      descripcion: "Damos vida a tus ideas con animación 2D y 3D. Desde logotipos animados hasta videos explicativos complejos, creamos contenido visualmente atractivo que capta la atención y comunica eficazmente.",
      entregables: [
        "Animación de Logotipo",
        "Videos Explicativos Animados",
        "Gráficos Animados para Redes Sociales",
        "Infografías Animadas",
        "Introducciones/Outros para Videos"
      ],
      enlace: "/portafolio?filter=motion",
      textoEnlace: "Ver proyectos de Motion Graphics",
      icono: (
        <svg 
          className="w-40 h-40 text-brand-cyan" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      alternarLayout: true,
      delay: "0.1s"
    },
    {
      titulo: "Contenido Audiovisual",
      descripcion: "Producimos contenido audiovisual que cuenta historias y conecta. Desde videos corporativos pulidos hasta Reels dinámicos para redes sociales, manejamos todo el proceso, desde la preproducción hasta la postproducción final.",
      entregables: [
        "Videos Corporativos e Institucionales",
        "Producción de Reels y Contenido para Redes",
        "Edición y Postproducción Profesional",
        "Cobertura de Eventos",
        "Videos Publicitarios"
      ],
      enlace: "/portafolio?filter=audiovisual",
      textoEnlace: "Ver proyectos Audiovisuales",
      icono: (
        <svg 
          className="w-40 h-40 text-brand-blue" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      alternarLayout: false,
      delay: "0.2s"
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-900 space-y-20 md:space-y-28">
      {servicios.map((servicio, index) => (
        <SeccionServicioDetalle
          key={index}
          titulo={servicio.titulo}
          descripcion={servicio.descripcion}
          entregables={servicio.entregables}
          enlace={servicio.enlace}
          textoEnlace={servicio.textoEnlace}
          icono={servicio.icono}
          alternarLayout={servicio.alternarLayout}
          delay={servicio.delay}
        />
      ))}
    </section>
  )
}
