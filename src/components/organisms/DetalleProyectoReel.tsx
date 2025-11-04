'use client'

import { useState } from 'react'
import InformacionProyecto from '../molecules/InformacionProyecto'
import ReelPrincipal from '../molecules/ReelPrincipal'
import CarruselReels from './CarruselReels'
import BloqueTextoAnimado from '../molecules/BloqueTextoAnimado'
import BloqueImagenEstandar from '../molecules/BloqueImagenEstandar'
import BloqueVideoEmbebido from '../molecules/BloqueVideoEmbebido'
import CTA_Proyecto from '../molecules/CTA_Proyecto'
import NavegacionProyecto from '../molecules/NavegacionProyecto'
import { getYouTubeThumbnail, getYouTubeEmbedUrl, isYouTubeUrl } from '@/lib/youtube'

interface ContentBlock {
  type: 'image' | 'text' | 'video' | 'reel-carousel'
  id: string
  url?: string
  content?: string
  caption?: string
  reels?: Array<{ url: string; title?: string }>
}

interface ProjectData {
  id: string
  title: string
  category: string
  resumeCorto: string
  resumeLargo: string
  imagenPrincipalUrl: string
  imagenPortadaUrl: string
  videoUrl?: string | null
  contentBlocks?: any
  colaboradores?: any
  tags?: string[]
  nextProject?: {
    title: string
    href: string
  } | null
}

interface DetalleProyectoReelProps {
  projectData: ProjectData
}

export default function DetalleProyectoReel({ projectData }: DetalleProyectoReelProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)

  // Parsear contentBlocks si es necesario
  let contentBlocks: ContentBlock[] = []
  if (projectData.contentBlocks) {
    if (Array.isArray(projectData.contentBlocks)) {
      contentBlocks = projectData.contentBlocks
    } else if (typeof projectData.contentBlocks === 'string') {
      try {
        contentBlocks = JSON.parse(projectData.contentBlocks)
      } catch {
        contentBlocks = []
      }
    } else {
      contentBlocks = [projectData.contentBlocks]
    }
  }

  // Encontrar el bloque de reel-carousel principal (el primero)
  const mainReelBlock = contentBlocks.find(block => block.type === 'reel-carousel')
  const mainReel = mainReelBlock?.reels?.[0] || null
  
  // Obtener los otros reels (excluyendo el principal)
  const otherReels = mainReelBlock?.reels?.slice(1) || []

  // Formatear colaboradores
  let colaboradoresText: string | undefined = undefined
  if (projectData.colaboradores) {
    let colaboradoresArray: Array<{ nombre?: string; rol?: string }> = []
    if (Array.isArray(projectData.colaboradores)) {
      colaboradoresArray = projectData.colaboradores
    } else if (typeof projectData.colaboradores === 'string') {
      try {
        colaboradoresArray = JSON.parse(projectData.colaboradores)
      } catch {
        colaboradoresArray = []
      }
    } else {
      colaboradoresArray = [projectData.colaboradores]
    }
    
    colaboradoresText = colaboradoresArray
      .map((colab) => {
        if (colab.nombre && colab.rol) {
          return `${colab.nombre} (${colab.rol})`
        } else if (colab.nombre) {
          return colab.nombre
        }
        return ''
      })
      .filter(Boolean)
      .join(', ')
  }

  const handleToggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }

  const handleReelClick = (reelUrl: string) => {
    console.log('Reproducir reel:', reelUrl)
    // Aquí se implementaría la lógica para reproducir el reel
  }

  // Renderizar bloques de contenido adicionales (texto, imagen, video)
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <BloqueTextoAnimado 
            key={block.id || index}
            content={block.content || ''}
          />
        )
      case 'image':
        return (
          <BloqueImagenEstandar 
            key={block.id || index}
            src={block.url || ''}
            alt={block.caption || projectData.title}
            aspectRatio="3:2"
          />
        )
      case 'video':
        const videoUrl = block.url || ''
        // Si es una URL de YouTube, generar el thumbnail y convertir a embed
        const thumbnailSrc = isYouTubeUrl(videoUrl) 
          ? (getYouTubeThumbnail(videoUrl) || videoUrl)
          : videoUrl
        const embedUrl = isYouTubeUrl(videoUrl)
          ? (getYouTubeEmbedUrl(videoUrl) || videoUrl)
          : videoUrl
        
        return (
          <BloqueVideoEmbebido 
            key={block.id || index}
            thumbnailSrc={thumbnailSrc}
            thumbnailAlt={block.caption || projectData.title}
            videoSrc={embedUrl}
            aspectRatio="16:9"
          />
        )
      case 'reel-carousel':
        // Ya se renderiza en la sección de reels
        return null
      default:
        return null
    }
  }

  // Obtener otros bloques de contenido (excluyendo el primer reel-carousel)
  const otherContentBlocks = contentBlocks.filter((block, index) => {
    if (block.type === 'reel-carousel') {
      // Solo excluir el primer bloque de reel-carousel
      return index !== contentBlocks.findIndex(b => b.type === 'reel-carousel')
    }
    return true
  })

  return (
    <article className="project-reel">
      {/* Detalle Proyecto Reel */}
      <section className="container mx-auto px-6 mt-12 mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Columna Izquierda: Reel Principal */}
        <div className="md:col-span-1 flex justify-center md:justify-end">
          {mainReel ? (
            <ReelPrincipal
              thumbnailSrc={mainReel.url || projectData.imagenPortadaUrl}
              thumbnailAlt={mainReel.title || projectData.title}
              onClick={() => handleReelClick(mainReel.url || '')}
            />
          ) : (
            <ReelPrincipal
              thumbnailSrc={projectData.imagenPortadaUrl || projectData.imagenPrincipalUrl}
              thumbnailAlt={projectData.title}
              onClick={() => {}}
            />
          )}
        </div>

        {/* Columna Derecha: Detalles del Proyecto */}
        <div className="md:col-span-2">
          <InformacionProyecto
            title={projectData.title}
            category={projectData.category}
            subcategory={projectData.tags?.join(', ') || undefined}
            shortDescription={projectData.resumeCorto}
            longDescription={projectData.resumeLargo}
            collaborators={colaboradoresText}
            isExpanded={isDetailsExpanded}
            onToggleDetails={handleToggleDetails}
          />
        </div>
      </section>

      {/* Sección: Otros Reels del Proyecto */}
      {otherReels.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-titulo mb-8 text-center md:text-left text-brand-text">
              Otros Reels del Proyecto
            </h2>
            <CarruselReels 
              reels={otherReels.map((reel, index) => ({
                id: reel.url || `reel-${index}`,
                thumbnailSrc: reel.url || projectData.imagenPortadaUrl,
                thumbnailAlt: reel.title || `${projectData.title} - Reel ${index + 2}`,
                onClick: () => handleReelClick(reel.url || '')
              }))}
            />
          </div>
        </section>
      )}

      {/* Bloques de Contenido Adicional */}
      {otherContentBlocks.length > 0 && (
        <section className="container mx-auto px-6 space-y-16 md:space-y-24 max-w-4xl mt-16 md:mt-24">
          {otherContentBlocks.map((block, index) => renderContentBlock(block, index))}
        </section>
      )}

      {/* Elementos Finales */}
      <section className="container mx-auto px-6 mt-24 mb-24 max-w-4xl space-y-16">
        <CTA_Proyecto />
        
        {projectData.nextProject && (
          <NavegacionProyecto
            nextProjectTitle={projectData.nextProject.title}
            nextProjectHref={projectData.nextProject.href}
          />
        )}
      </section>
    </article>
  )
}
