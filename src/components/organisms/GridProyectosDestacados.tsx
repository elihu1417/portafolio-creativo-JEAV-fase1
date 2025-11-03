import Image from 'next/image'
import Link from 'next/link'

export default function GridProyectosDestacados() {
  const featuredProjects = [
    {
      id: '1',
      title: 'Identidad Corporativa TechStart',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center',
      href: '/proyecto/1'
    },
    {
      id: '3',
      title: 'Video Corporativo Empresarial',
      category: 'Audiovisual / Corporativos',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&crop=center',
      href: '/proyecto/3'
    },
    {
      id: '2',
      title: 'Animación de Producto',
      category: 'Motion Graphics',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
      href: '/proyecto/2'
    }
  ]

  return (
    <section id="portafolio" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-12 text-brand-text font-titulo">
          Mi Trabajo Destacado
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Link 
              key={project.id} 
              href={project.href}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:scale-[1.03] block"
            >
              <Image 
                src={project.image} 
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
