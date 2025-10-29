export default function BloqueBiografiaFilosofia() {
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6 max-w-3xl space-y-12">
        <div className="animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-titulo mb-4">Mi Trayectoria</h2>
          <p className="text-xl font-sans leading-relaxed opacity-80">
            Soy Juan Elihu Arrieta Vela, un creativo multidisciplinario enfocado en la intersección de la estrategia, el diseño y la producción audiovisual. Desde 2020, he tenido la oportunidad de colaborar con marcas y proyectos diversos, buscando siempre generar un impacto visual y narrativo significativo.
          </p>
        </div>
        
        <div className="animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
          <h2 className="text-3xl md:text-4xl font-titulo mb-4">Mi Filosofía</h2>
          <p className="text-xl font-sans leading-relaxed opacity-80">
            Creo firmemente en el poder de la creatividad fundamentada en la estrategia. Mi proceso comienza por entender profundamente los objetivos de negocio y la audiencia para desarrollar soluciones visuales que no solo sean estéticas, sino también efectivas.
          </p>
          <p className="text-xl font-sans leading-relaxed opacity-80 mt-4">
            La colaboración es esencial. Valoro la comunicación abierta y la co-creación con clientes y equipos para lograr resultados excepcionales.
          </p>
        </div>
        
        <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-titulo mb-4">Visión Futura: ESCI</h2>
          <p className="text-xl font-sans leading-relaxed opacity-80">
            Este portafolio es también la semilla de ESCI, un proyecto futuro enfocado en crear un ecosistema creativo. La visión es construir un estudio y plataforma que sirva como puente entre el talento creativo emergente y los negocios que necesitan soluciones innovadoras y accesibles para crecer.
          </p>
        </div>
      </div>
    </section>
  )
}
