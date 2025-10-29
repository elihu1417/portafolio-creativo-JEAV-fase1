'use client'

import { useState } from 'react'
import Image from 'next/image'
import InformacionProyecto from '../molecules/InformacionProyecto'
import BloqueTextoAnimado from '../molecules/BloqueTextoAnimado'
import BloqueImagenEstandar from '../molecules/BloqueImagenEstandar'
import BloqueVideoEmbebido from '../molecules/BloqueVideoEmbebido'
import CTA_Proyecto from '../molecules/CTA_Proyecto'
import NavegacionProyecto from '../molecules/NavegacionProyecto'

interface ProjectData {
  id: string
  title: string
  category: string
  subcategory?: string
  shortDescription: string
  longDescription: string
  collaborators?: string
  mainImage: string
  mainImageAlt: string
  content: Array<{
    type: 'text' | 'image' | 'video' | 'heading'
    content: string
    src?: string
    alt?: string
    aspectRatio?: string
    videoSrc?: string
  }>
  nextProject?: {
    title: string
    href: string
  }
}

interface DetalleProyectoGeneralProps {
  projectId: string
}

// Datos de ejemplo - esto se conectará con una base de datos
const projectData: Record<string, ProjectData> = {
  '1': {
    id: '1',
    title: 'Identidad Corporativa TechStart',
    category: 'Branding',
    subcategory: 'Identidad Corporativa',
    shortDescription: 'Desarrollo de identidad visual completa para startup tecnológica.',
    longDescription: 'Para su composición, nos inspiramos en la innovación y la confianza. Exploramos diferentes paletas de colores que transmitieran modernidad y profesionalismo, creando un sistema visual coherente que se adapta a todos los touchpoints de la marca.',
    collaborators: 'Juan Elihu Arrieta Vela (Diseñador Principal)',
    mainImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
    mainImageAlt: 'Identidad corporativa moderna con logo minimalista',
    content: [
      {
        type: 'text',
        content: 'Párrafo animado sobre el proceso de creación de la identidad visual.'
      },
      {
        type: 'image',
        content: 'Detalle del proyecto',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
        alt: 'Detalle del proyecto',
        aspectRatio: '3:2'
      },
      {
        type: 'heading',
        content: 'Resultados Obtenidos'
      },
      {
        type: 'text',
        content: 'Otro párrafo animado describiendo el impacto de la nueva identidad en el mercado.'
      },
      {
        type: 'video',
        content: 'Video del proceso creativo',
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1280&h=720&fit=crop&crop=center',
        alt: 'Video Thumbnail (16:9)',
        aspectRatio: '16:9',
        videoSrc: 'https://www.youtube.com/embed/example'
      }
    ],
    nextProject: {
      title: 'Siguiente Proyecto en Branding',
      href: '/proyecto/2'
    }
  }
}

export default function DetalleProyectoGeneral({ projectId }: DetalleProyectoGeneralProps) {
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
  
  console.log('DetalleProyectoGeneral - projectId:', projectId)
  console.log('DetalleProyectoGeneral - projectData keys:', Object.keys(projectData))
  
  const project = projectData[projectId]
  
  if (!project) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-titulo mb-4">Proyecto no encontrado</h1>
        <p className="text-lg font-sans opacity-70">El proyecto que buscas no existe.</p>
        <p className="text-sm font-sans opacity-50 mt-2">ID buscado: {projectId}</p>
      </div>
    )
  }

  const handleToggleDetails = () => {
    setIsDetailsExpanded(!isDetailsExpanded)
  }

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <BloqueTextoAnimado 
            key={index}
            content={block.content}
          />
        )
      case 'heading':
        return (
          <BloqueTextoAnimado 
            key={index}
            content={block.content}
            isHeading={true}
            headingLevel="h2"
          />
        )
      case 'image':
        return (
          <BloqueImagenEstandar 
            key={index}
            src={block.src || ''}
            alt={block.alt || ''}
            aspectRatio={block.aspectRatio as any}
          />
        )
      case 'video':
        return (
          <BloqueVideoEmbebido 
            key={index}
            thumbnailSrc={block.src || ''}
            thumbnailAlt={block.alt || ''}
            videoSrc={block.videoSrc}
            aspectRatio={block.aspectRatio as any}
          />
        )
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
            src={project.mainImage}
            alt={project.mainImageAlt}
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Información del proyecto */}
      <section className="container mx-auto px-6 mb-16 md:mb-24 max-w-3xl">
        <InformacionProyecto
          title={project.title}
          category={project.category}
          subcategory={project.subcategory}
          shortDescription={project.shortDescription}
          longDescription={project.longDescription}
          collaborators={project.collaborators}
          isExpanded={isDetailsExpanded}
          onToggleDetails={handleToggleDetails}
        />
      </section>

      {/* Bloques de contenido */}
      <section className="container mx-auto px-6 space-y-16 md:space-y-24 max-w-4xl">
        {project.content.map((block, index) => renderContentBlock(block, index))}
      </section>

      {/* Elementos finales */}
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
