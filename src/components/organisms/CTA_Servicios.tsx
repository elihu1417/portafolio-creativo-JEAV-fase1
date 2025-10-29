import Link from 'next/link'

export default function CTA_Servicios() {
  return (
    <section className="py-24 bg-brand-bg text-center">
      <div className="container mx-auto px-6 animate-on-scroll">
        <h2 className="text-4xl md:text-5xl font-titulo mb-8">
          ¿Interesado en algún servicio?
        </h2>
        <div className="space-x-4">
          <Link 
            href="/contacto" 
            className="inline-block bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-3 px-8 rounded-full text-lg transition duration-300 font-sans"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>
    </section>
  )
}
