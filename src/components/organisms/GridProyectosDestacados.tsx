import Image from 'next/image'
import Link from 'next/link'

export default function GridProyectosDestacados() {
  return (
    <section id="portafolio" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-12 text-brand-text font-titulo">
          Mi Trabajo Destacado
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:scale-[1.03]">
            <Image 
              src="https://placehold.co/600x400/22222c/eeebe3?text=Proyecto+Branding" 
              alt="Proyecto 1" 
              width={600}
              height={400}
              className="w-full h-64 object-cover"
              unoptimized={true}
            />
            <div className="p-6">
              <h3 className="text-2xl mb-2 text-brand-text font-titulo">
                Creación de Marca
              </h3>
              <p className="text-brand-text opacity-70 font-sans">
                Branding
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:scale-[1.03]">
            <Image 
              src="https://placehold.co/600x400/22222c/eeebe3?text=Proyecto+Audiovisual" 
              alt="Proyecto 2" 
              width={600}
              height={400}
              className="w-full h-64 object-cover"
              unoptimized={true}
            />
            <div className="p-6">
              <h3 className="text-2xl mb-2 text-brand-text font-titulo">
                Video Corporativo
              </h3>
              <p className="text-brand-text opacity-70 font-sans">
                Audiovisual / Reels
              </p>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:scale-[1.03]">
            <Image 
              src="https://placehold.co/600x400/22222c/eeebe3?text=Proyecto+Motion" 
              alt="Proyecto 3" 
              width={600}
              height={400}
              className="w-full h-64 object-cover"
              unoptimized={true}
            />
            <div className="p-6">
              <h3 className="text-2xl mb-2 text-brand-text font-titulo">
                Animación de Logo
              </h3>
              <p className="text-brand-text opacity-70 font-sans">
                Motion Graphics
              </p>
            </div>
          </div>
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
