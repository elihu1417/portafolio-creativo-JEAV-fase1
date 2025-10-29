'use client'

import { useState } from 'react'
import Image from 'next/image'
import BotonPlayVideo from '../atoms/BotonPlayVideo'

interface BloqueVideoEmbebidoProps {
  thumbnailSrc: string
  thumbnailAlt: string
  videoSrc?: string
  aspectRatio?: '16:9' | '4:3' | '3:2'
  className?: string
}

export default function BloqueVideoEmbebido({ 
  thumbnailSrc, 
  thumbnailAlt, 
  videoSrc,
  aspectRatio = '16:9',
  className = ''
}: BloqueVideoEmbebidoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]'
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  return (
    <div className={`animate-on-scroll ${className}`}>
      <div className={`${aspectClasses[aspectRatio]} w-full rounded-lg overflow-hidden shadow-lg`}>
        {!isPlaying ? (
          <div 
            className="w-full h-full bg-gray-800 flex items-center justify-center relative group cursor-pointer"
            onClick={handlePlay}
          >
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt}
              width={1280}
              height={720}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition z-10"></div>
            <BotonPlayVideo onClick={handlePlay} />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            {videoSrc ? (
              <iframe
                src={videoSrc}
                className="w-full h-full"
                allowFullScreen
                title={thumbnailAlt}
              />
            ) : (
              <div className="text-white text-center">
                <p className="text-lg mb-4">Video no disponible</p>
                <button 
                  onClick={() => setIsPlaying(false)}
                  className="text-brand-cyan hover:text-white transition"
                >
                  Volver al thumbnail
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
