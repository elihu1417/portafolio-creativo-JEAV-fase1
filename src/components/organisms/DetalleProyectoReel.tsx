'use client'

import { useState } from 'react'
import InformacionProyecto from '../molecules/InformacionProyecto'
import ReelPrincipal from '../molecules/ReelPrincipal'
import CarruselReels from './CarruselReels'
import BloqueTextoAnimado from '../molecules/BloqueTextoAnimado'
import CTA_Proyecto from '../molecules/CTA_Proyecto'
import NavegacionProyecto from '../molecules/NavegacionProyecto'

interface ReelData {
  id: string
  thumbnailSrc: string
  thumbnailAlt: string
  videoSrc?: string
}

interface ProyectoReelData {
  id: string
  title: string
  category: string
  subcategory?: string
  shortDescription: string
  longDescription: string
  role?: string
  mainReel: ReelData
  otherReels: ReelData[]
  strategyText?: string
  nextProject?: {
    title: string
    href: string
  }
}

interface DetalleProyectoReelProps {
  projectId: string
}

// Datos de ejemplo - esto se conectará con una base de datos
const reelProjectsData: Record<string, ProyectoReelData> = {
  '5': {
    id: '5',
    title: 'Proyecto Campaña Reels',
    category: 'Audiovisual',
    subcategory: 'Reels',
    shortDescription: 'Creamos una serie de videos cortos y dinámicos para Instagram.',
    longDescription: 'El objetivo era capturar la atención rápidamente en el feed de Instagram. Se produjeron 5 variantes diferentes, cada una adaptada a un mensaje específico de la campaña, optimizadas para la reproducción automática y el engagement.',
    role: 'Edición y Postproducción',
    mainReel: {
      id: 'main-reel',
      thumbnailSrc: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=360&h=640&fit=crop&crop=center',
      thumbnailAlt: 'Reel Principal Thumbnail'
    },
    otherReels: [
      {
        id: 'reel-2',
        thumbnailSrc: 'https://images.unsplash.com/photo-1611162617474-5b5e474737cb?w=180&h=320&fit=crop&crop=center',
        thumbnailAlt: 'Reel 2 Thumbnail'
      },
      {
        id: 'reel-3',
        thumbnailSrc: 'https://images.unsplash.com/photo-1611162617303-8ec5aaa42d98?w=180&h=320&fit=crop&crop=center',
        thumbnailAlt: 'Reel 3 Thumbnail'
      },
      {
        id: 'reel-4',
        thumbnailSrc: 'https://images.unsplash.com/photo-1611162617195-51b753d8837e?w=180&h=320&fit=crop&crop=center',
        thumbnailAlt: 'Reel 4 Thumbnail'
      },
      {
        id: 'reel-5',
        thumbnailSrc: 'https://images.unsplash.com/photo-1611162617082-f233e8221f41?w=180&h=320&fit=crop&crop=center',
        thumbnailAlt: 'Reel 5 Thumbnail'
      }
    ],
    strategyText: 'Párrafo explicando la estrategia o el impacto de esta campaña de Reels.',
    nextProject: {
      title: 'Siguiente Proyecto en Reels',
      href: '#'
    }
  }
}

export default function DetalleProyectoReel({ projectId }: DetalleProyectoReelProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  
  const project = reelProjectsData[projectId]
  
  if (!project) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-titulo mb-4">Proyecto Reels no encontrado</h1>
        <p className="text-lg font-sans opacity-70">El proyecto que buscas no existe.</p>
      </div>
    )
  }

  const handleToggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }

  const handleReelClick = (reelId: string) => {
    console.log('Reproducir reel:', reelId)
    // Aquí se implementaría la lógica para reproducir el reel
  }

  return (
    <article className="project-reel">
      {/* Detalle Proyecto Reel */}
      <section className="container mx-auto px-6 mt-12 mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Columna Izquierda: Reel Principal */}
        <div className="md:col-span-1 flex justify-center md:justify-end">
          <ReelPrincipal
            thumbnailSrc={project.mainReel.thumbnailSrc}
            thumbnailAlt={project.mainReel.thumbnailAlt}
            onClick={() => handleReelClick(project.mainReel.id)}
          />
        </div>

        {/* Columna Derecha: Detalles del Proyecto */}
        <div className="md:col-span-2">
          <InformacionProyecto
            title={project.title}
            category={project.category}
            subcategory={project.subcategory}
            shortDescription={project.shortDescription}
            longDescription={project.longDescription}
            collaborators={project.role ? `Rol: ${project.role}` : undefined}
            isExpanded={isDetailsExpanded}
            onToggleDetails={handleToggleDetails}
          />
        </div>
      </section>

      {/* Sección: Otros Reels del Proyecto */}
      {project.otherReels && project.otherReels.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-titulo mb-8 text-center md:text-left">
              Otros Reels del Proyecto
            </h2>
            <CarruselReels 
              reels={project.otherReels.map(reel => ({
                id: reel.id,
                thumbnailSrc: reel.thumbnailSrc,
                thumbnailAlt: reel.thumbnailAlt,
                onClick: () => handleReelClick(reel.id)
              }))}
            />
          </div>
        </section>
      )}

      {/* Bloques de Contenido Adicional */}
      {project.strategyText && (
        <section className="container mx-auto px-6 space-y-16 md:space-y-24 max-w-4xl mt-16 md:mt-24">
          <BloqueTextoAnimado
            content="Estrategia detrás de los Reels"
            isHeading={true}
            headingLevel="h2"
          />
          <BloqueTextoAnimado content={project.strategyText} />
        </section>
      )}

      {/* Elementos Finales */}
      <section className="container mx-auto px-6 mt-24 mb-24 max-w-4xl space-y-16">
        <CTA_Proyecto />
        
        {project.nextProject && (
          <NavegacionProyecto
            nextProjectTitle={project.nextProject.title}
            nextProjectHref={project.nextProject.href}
          />
        )}
      </section>
    </article>
  )
}
