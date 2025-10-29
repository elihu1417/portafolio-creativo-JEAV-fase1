'use client'

import { useState } from 'react'

interface BotonToggleDetallesProps {
  isExpanded: boolean
  onToggle: () => void
  textCollapsed?: string
  textExpanded?: string
}

export default function BotonToggleDetalles({ 
  isExpanded, 
  onToggle, 
  textCollapsed = "Más información",
  textExpanded = "Menos información"
}: BotonToggleDetallesProps) {
  return (
    <button 
      onClick={onToggle}
      className="mt-6 text-brand-cyan hover:text-white transition flex items-center space-x-2 font-sans"
    >
      <span>{isExpanded ? textExpanded : textCollapsed}</span>
      <svg 
        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  )
}
