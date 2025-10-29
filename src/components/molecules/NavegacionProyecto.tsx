import Link from 'next/link'

interface NavegacionProyectoProps {
  nextProjectTitle?: string
  nextProjectHref?: string
  alignment?: 'left' | 'center' | 'right'
  className?: string
}

export default function NavegacionProyecto({ 
  nextProjectTitle = "Siguiente Proyecto",
  nextProjectHref = "#",
  alignment = 'right',
  className = ""
}: NavegacionProyectoProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-center md:text-right'
  }

  return (
    <div className={`${alignmentClasses[alignment]} ${className}`}>
      <Link 
        href={nextProjectHref}
        className="inline-flex items-center space-x-2 text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition font-sans text-lg"
      >
        <span>{nextProjectTitle}</span>
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  )
}
