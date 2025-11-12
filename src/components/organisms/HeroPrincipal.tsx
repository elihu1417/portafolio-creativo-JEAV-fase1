import Link from 'next/link'

export default function HeroPrincipal() {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source 
          src="/VIDEOS/VIDEO INCIO.mp4" 
          type="video/mp4" 
        />
      </video>
      <div className="absolute inset-0 bg-brand-bg opacity-70 z-10"></div>

      <div className="relative z-20 p-4">
        <h1 className="text-6xl md:text-8xl font-titulo mb-4 text-brand-text">
          Juan Elihu Arrieta Vela
        </h1>
        <p className="text-xl md:text-2xl text-brand-text mb-8 max-w-2xl mx-auto font-sans">
          Creatividad y estrategia para marcas que merecen ser vistas.
        </p>
        <div className="space-x-4">
          <Link 
            href="/portafolio" 
            className="bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-3 px-8 rounded-full text-lg transition duration-300 font-sans"
          >
            Ver mi trabajo
          </Link>
          <Link 
            href="/contacto" 
            className="border-2 border-brand-text text-brand-text font-bold py-3 px-8 rounded-full text-lg transition duration-300 hover:bg-brand-text hover:text-brand-bg font-sans"
          >
            Hablemos
          </Link>
        </div>
      </div>
         <div className="absolute z-20 top-1/4 left-1/4 w-24 h-24 bg-brand-blue/30 rounded-full animate-wiggle" style={{ animationDuration: '6s' }}></div>
        <div className="absolute z-20 bottom-1/4 right-1/4 w-32 h-32 bg-brand-cyan/30 rounded-full animate-wiggle" style={{ animationDuration: '4s' }}></div>
    </section>
  )
}

