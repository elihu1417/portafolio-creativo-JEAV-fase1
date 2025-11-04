
import ReelThumbnail from '../molecules/ReelThumbnail'

interface Reel {
  id: string
  thumbnailSrc: string
  thumbnailAlt: string
  onClick?: () => void
}

interface CarruselReelsProps {
  reels: Reel[]
  className?: string
}

export default function CarruselReels({ reels, className = '' }: CarruselReelsProps) {
  return (
    <div className={`flex gap-4 overflow-x-auto pb-4 ${className}`}>
      {reels.map((reel) => (
        <div key={reel.id} className="flex-shrink-0">
          <ReelThumbnail
            thumbnailSrc={reel.thumbnailSrc}
            thumbnailAlt={reel.thumbnailAlt}
            onClick={reel.onClick}
          />
        </div>
      ))}
    </div>
  )
}
