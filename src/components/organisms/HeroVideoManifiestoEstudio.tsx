'use client'

import { useState } from 'react'

export default function HeroVideoManifiestoEstudio() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const handlePlayClick = () => {
    setIsVideoLoaded(true)
  }

  return (
    <section className="py-24 md:py-32 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-titulo mb-12 animate-on-scroll">
          Quién Soy
        </h1>
        
        {/* Molécula: ReproductorVideoEmbebido */}
        <div 
          className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer relative animate-on-scroll" 
          style={{ transitionDelay: '0.2s' }}
          onClick={handlePlayClick}
        >
          {!isVideoLoaded ? (
            <>
              {/* Placeholder Thumbnail */}
              <img 
                src="https://placehold.co/1280x720/428ce6/22222c?text=Video+Manifiesto+(16:9)" 
                alt="Video Manifiesto Thumbnail" 
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-60 transition"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition z-10"></div>
              {/* Botón Play */}
              <svg 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-20 h-20 text-white opacity-80 group-hover:opacity-100 transition" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                  clipRule="evenodd"
                />
              </svg>
            </>
          ) : (
            /* iframe real iría aquí al hacer clic */
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Video Manifiesto"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </section>
  )
}
