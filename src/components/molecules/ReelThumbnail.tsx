import Image from 'next/image'
import BotonPlayVideo from '../atoms/BotonPlayVideo'

interface ReelThumbnailProps {
  thumbnailSrc: string
  thumbnailAlt: string
  onClick?: () => void
  className?: string
}

export default function ReelThumbnail({ 
  thumbnailSrc, 
  thumbnailAlt,
  onClick,
  className = ''
}: ReelThumbnailProps) {
  return (
    <div className={`aspect-[9/16] bg-gray-800 rounded-md overflow-hidden relative group cursor-pointer ${className}`}>
      <Image
        src={thumbnailSrc}
        alt={thumbnailAlt}
        width={180}
        height={320}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition">
        <BotonPlayVideo size="sm" onClick={onClick} />
      </div>
    </div>
  )
}
