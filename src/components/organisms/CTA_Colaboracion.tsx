import Link from 'next/link'

export default function CTA_Colaboracion() {
  return (
    <section className="py-24 bg-gray-900 text-center">
      <div className="container mx-auto px-6 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-titulo mb-8">
          ¿Listo para crear algo juntos?
        </h2>
        <div className="space-x-4">
          <Link 
            href="/contacto" 
            className="inline-block bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-3 px-8 rounded-full text-lg transition duration-300 font-sans"
          >
            Hablemos de tu proyecto
          </Link>
        </div>
      </div>
    </section>
  )
}
