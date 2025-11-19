'use client'

import ReelThumbnail from '../molecules/ReelThumbnail'
import { isYouTubeUrl, getYouTubeEmbedUrl } from '@/lib/youtube'

interface Reel {
  id: string
  thumbnailSrc: string
  thumbnailAlt: string
  onClick?: () => void
  reelUrl?: string
}

interface CarruselReelsProps {
  reels: Reel[]
  className?: string
  playingReelUrl?: string | null
  onReelClick?: (url: string) => void
}

export default function CarruselReels({ 
  reels, 
  className = '',
  playingReelUrl,
  onReelClick
}: CarruselReelsProps) {
  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {reels.map((reel) => {
        const isPlaying = playingReelUrl === reel.reelUrl
        
        return (
          <div key={reel.id} className="flex-shrink-0">
            {isPlaying && reel.reelUrl ? (
              // Mostrar el video embebido si está reproduciendo
              <div className="w-[280px] aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden shadow-xl">
                {isYouTubeUrl(reel.reelUrl) ? (
                  <iframe
                    src={`${getYouTubeEmbedUrl(reel.reelUrl)}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={reel.thumbnailAlt}
                  />
                ) : (
                  <video
                    src={reel.reelUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ) : (
              <ReelThumbnail
                thumbnailSrc={reel.thumbnailSrc}
                thumbnailAlt={reel.thumbnailAlt}
                onClick={reel.onClick}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
