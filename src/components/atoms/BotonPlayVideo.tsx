interface BotonPlayVideoProps {
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export default function BotonPlayVideo({ 
  onClick, 
  size = 'md' 
}: BotonPlayVideoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  }

  return (
    <button 
      onClick={onClick}
      className={`relative z-20 ${sizeClasses[size]} text-white opacity-80 hover:opacity-100 transition`}
    >
      <svg 
        fill="currentColor" 
        viewBox="0 0 20 20"
        className="w-full h-full"
      >
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}
