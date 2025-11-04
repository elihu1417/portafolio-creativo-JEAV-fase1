import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getFeaturedProjects() {
  try {
    // Obtener los primeros 3 proyectos publicados más recientes
    const projects = await prisma.portfolioItem.findMany({
      where: {
        isPublished: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    })

    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      category: project.category,
      image: project.imagenPortadaUrl,
      href: `/proyecto/${project.id}`,
    }))
  } catch (error) {
    console.error('Error al obtener proyectos destacados:', error)
    return []
  }
}

export default async function GridProyectosDestacados() {
  const featuredProjects = await getFeaturedProjects()

  return (
    <section id="portafolio" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-12 text-brand-text font-titulo">
          Mi Trabajo Destacado
        </h2>
        
        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link 
                key={project.id} 
                href={project.href}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:scale-[1.03] block"
              >
                <Image 
                  src={project.image || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop'} 
                  alt={project.title} 
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl mb-2 text-brand-text font-titulo">
                    {project.title}
                  </h3>
                  <p className="text-brand-text opacity-70 font-sans">
                    {project.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-brand-text opacity-70 font-sans">
              No hay proyectos destacados disponibles en este momento.
            </p>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link 
            href="/portafolio" 
            className="border-2 border-brand-orange text-brand-orange font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:bg-brand-orange hover:text-brand-bg font-sans"
          >
            Ver todo el portafolio
          </Link>
        </div>
      </div>
    </section>
  )
}
