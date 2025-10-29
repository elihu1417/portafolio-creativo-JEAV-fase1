export default function EncabezadoServicios() {
  return (
    <header className="py-16 md:py-24 text-center bg-gray-900">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-titulo mb-4 animate-on-scroll">
          Mis Servicios
        </h1>
        <p 
          className="text-lg md:text-xl text-brand-text opacity-70 font-sans max-w-2xl mx-auto animate-on-scroll" 
          style={{ transitionDelay: '0.1s' }}
        >
          Soluciones creativas y estratégicas diseñadas para impulsar tu marca y conectar con tu audiencia.
        </p>
      </div>
    </header>
  )
}
