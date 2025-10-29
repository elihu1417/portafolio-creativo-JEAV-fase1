interface BloqueTextoAnimadoProps {
  content: string
  isHeading?: boolean
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export default function BloqueTextoAnimado({ 
  content, 
  isHeading = false, 
  headingLevel = 'h2',
  className = ''
}: BloqueTextoAnimadoProps) {
  const HeadingTag = headingLevel

  if (isHeading) {
    return (
      <div className={`animate-on-scroll ${className}`}>
        <HeadingTag className="text-3xl font-titulo mb-4">{content}</HeadingTag>
      </div>
    )
  }

  return (
    <div className={`animate-on-scroll ${className}`}>
      <p className="text-xl md:text-2xl font-sans leading-relaxed">{content}</p>
    </div>
  )
}
