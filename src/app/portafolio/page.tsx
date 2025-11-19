import { prisma } from '@/lib/prisma'
import PortafolioPageClient from './PortafolioPageClient'
import { PortfolioItem } from '@/hooks/usePortfolioFilters'

// Forzar revalidación dinámica para evitar caché
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getPortfolioProjects(): Promise<PortfolioItem[]> {
  try {
    // Obtener todos los proyectos publicados, ordenados por fecha de creación
    const projects = await prisma.portfolioItem.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return projects.map((project) => {
      // Detectar subcategoría basándose en tags y category
      let subcategory: string | undefined = undefined
      const tagsLower = (project.tags || []).map(t => t.toLowerCase())
      
      if (project.category.toLowerCase() === 'audiovisual') {
        if (tagsLower.some(t => t.includes('reel') || t.includes('reels') || t.includes('shorts'))) {
          subcategory = 'reel'
        } else {
          subcategory = 'horizontal'
        }
      }

      return {
        id: project.id,
        title: project.title,
        category: project.category.toLowerCase(),
        subcategory,
        image: project.imagenPortadaUrl,
        alt: `${project.title} - ${project.category}`,
        href: `/proyecto/${project.id}`,
      }
    })
  } catch (error) {
    console.error('Error al obtener proyectos del portafolio:', error)
    return []
  }
}

export default async function PortafolioPage() {
  const portfolioData = await getPortfolioProjects()

  return <PortafolioPageClient initialPortfolioData={portfolioData} />
}
