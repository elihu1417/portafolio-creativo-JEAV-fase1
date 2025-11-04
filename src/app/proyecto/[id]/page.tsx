import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import DetalleProyectoGeneral from '@/components/organisms/DetalleProyectoGeneral'
import DetalleProyectoReel from '@/components/organisms/DetalleProyectoReel'

interface ProyectoPageProps {
  params: Promise<{
    id: string
  }>
}

// Función para detectar si un proyecto es de tipo Reels
function isReelProject(project: any): boolean {
  const tagsLower = (project.tags || []).map((t: string) => t.toLowerCase())
  const hasReelTags = tagsLower.some((t: string) => 
    t.includes('reel') || t.includes('reels') || t.includes('shorts') || t.includes('instagram reels')
  )
  
  // Verificar si hay bloques de tipo reel-carousel
  const hasReelCarousel = Array.isArray(project.contentBlocks) && 
    project.contentBlocks.some((block: any) => block.type === 'reel-carousel')
  
  return project.category.toLowerCase() === 'audiovisual' && (hasReelTags || hasReelCarousel)
}

// Función para obtener el siguiente proyecto publicado
async function getNextProject(currentId: string): Promise<{ title: string; href: string } | null> {
  try {
    const currentProject = await prisma.portfolioItem.findUnique({
      where: { id: currentId },
    })
    
    if (!currentProject) return null
    
    const nextProject = await prisma.portfolioItem.findFirst({
      where: {
        isPublished: true,
        createdAt: {
          gt: currentProject.createdAt,
        },
      },
      orderBy: { createdAt: 'asc' },
    })
    
    if (!nextProject) return null
    
    return {
      title: nextProject.title,
      href: `/proyecto/${nextProject.id}`,
    }
  } catch (error) {
    console.error('Error al obtener siguiente proyecto:', error)
    return null
  }
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { id } = await params
  
  try {
    // Obtener el proyecto de la base de datos
    const project = await prisma.portfolioItem.findFirst({
      where: {
        id: id,
        isPublished: true,
      },
    })

    if (!project) {
      notFound()
    }

    // Obtener el siguiente proyecto
    const nextProject = await getNextProject(id)

    // Detectar si es un proyecto Reels
    const isReel = isReelProject(project)

    // Preparar los datos para los componentes
    const projectData = {
      id: project.id,
      title: project.title,
      category: project.category,
      resumeCorto: project.resumeCorto,
      resumeLargo: project.resumeLargo,
      imagenPrincipalUrl: project.imagenPrincipalUrl,
      imagenPortadaUrl: project.imagenPortadaUrl,
      videoUrl: project.videoUrl,
      contentBlocks: project.contentBlocks,
      colaboradores: project.colaboradores,
      tags: project.tags || [],
      nextProject,
    }

    return (
      <main>
        {isReel ? (
          <DetalleProyectoReel projectData={projectData} />
        ) : (
          <DetalleProyectoGeneral projectData={projectData} />
        )}
      </main>
    )
  } catch (error) {
    console.error('Error al cargar proyecto:', error)
    notFound()
  }
}
