'use client'

import { useState } from 'react'
import Image from 'next/image'
import InformacionProyecto from '../molecules/InformacionProyecto'
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

interface DetalleProyectoGeneralProps {
  projectData: ProjectData
}

export default function DetalleProyectoGeneral({ projectData }: DetalleProyectoGeneralProps) {
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
        // Los proyectos de tipo reel no deberían usar este componente, pero por si acaso
        return null
      default:
        return null
    }
  }

  return (
    <article className="project-standard">
      {/* Imagen principal */}
      <section className="mb-12 md:mb-16">
        <div className="aspect-[3/2] w-full">
          <Image
            src={projectData.imagenPrincipalUrl || projectData.imagenPortadaUrl}
            alt={projectData.title}
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Información del proyecto */}
      <section className="container mx-auto px-6 mb-16 md:mb-24 max-w-3xl">
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
      </section>

      {/* Bloques de contenido */}
      {contentBlocks.length > 0 && (
        <section className="container mx-auto px-6 space-y-16 md:space-y-24 max-w-4xl">
          {contentBlocks
            .filter(block => block.type !== 'reel-carousel') // Filtrar bloques de reel
            .map((block, index) => renderContentBlock(block, index))}
        </section>
      )}

      {/* Elementos finales */}
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
