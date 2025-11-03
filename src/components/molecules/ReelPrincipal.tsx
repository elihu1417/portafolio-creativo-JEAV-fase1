import Image from 'next/image'
import BotonPlayVideo from '../atoms/BotonPlayVideo'

interface ReelPrincipalProps {
  thumbnailSrc: string
  thumbnailAlt: string
  onClick?: () => void
  className?: string
}

export default function ReelPrincipal({ 
  thumbnailSrc, 
  thumbnailAlt,
  onClick,
  className = ''
}: ReelPrincipalProps) {
  return (
    <div className={`w-full max-w-[280px] sm:max-w-xs aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer ${className}`}>
      <Image
        src={thumbnailSrc}
        alt={thumbnailAlt}
        width={360}
        height={640}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-10 transition z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <BotonPlayVideo onClick={onClick} />
      </div>
    </div>
  )
}
