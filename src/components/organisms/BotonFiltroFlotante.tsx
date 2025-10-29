'use client'

import { useState, useEffect } from 'react'

interface BotonFiltroFlotanteProps {
  onOpenModal: () => void
}

export default function BotonFiltroFlotante({ onOpenModal }: BotonFiltroFlotanteProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const filterBar = document.getElementById('filter-bar-static')
      if (filterBar) {
        const rect = filterBar.getBoundingClientRect()
        setShowButton(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!showButton) return null

  return (
    <div id="floating-filter-button" className="fixed bottom-8 right-8 z-50">
      <button 
        className="bg-brand-text text-brand-bg w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition"
        onClick={onOpenModal}
        aria-label="Abrir filtros"
      >
        <svg 
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V17l-4 4v-9.586L4.293 6.707A1 1 0 014 6V4z"
          />
        </svg>
      </button>
    </div>
  )
}
