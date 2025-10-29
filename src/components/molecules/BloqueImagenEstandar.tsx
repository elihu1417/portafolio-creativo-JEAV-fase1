import Image from 'next/image'

interface BloqueImagenEstandarProps {
  src: string
  alt: string
  aspectRatio?: '3:2' | '16:9' | '4:3' | '1:1'
  className?: string
}

export default function BloqueImagenEstandar({ 
  src, 
  alt, 
  aspectRatio = '3:2',
  className = ''
}: BloqueImagenEstandarProps) {
  const aspectClasses = {
    '3:2': 'aspect-[3/2]',
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  }

  return (
    <div className={`animate-on-scroll ${className}`}>
      <div className={`${aspectClasses[aspectRatio]} w-full overflow-hidden rounded-lg shadow-lg`}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
