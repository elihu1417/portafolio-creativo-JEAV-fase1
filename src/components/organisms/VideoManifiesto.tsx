export default function VideoManifiesto() {
  return (
    <section id="manifiesto" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-12 text-brand-text font-titulo">
          Conoce mi Proceso
        </h2>
        <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
          <video 
            className="w-full h-full object-cover"
            controls
            playsInline
          >
            <source 
              src="/VIDEOS/Video Intriducion ECI.mp4" 
              type="video/mp4" 
            />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    </section>
  )
}
