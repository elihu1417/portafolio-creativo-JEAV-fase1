'use client'

import { useEffect } from 'react'
import styles from '../../app/portafolio/portafolio.module.css'

interface ModalFiltrosProps {
  isOpen: boolean
  onClose: () => void
  onFilterChange: (filter: string, subfilter?: string) => void
  isButtonActive: (buttonFilter: string, buttonSubFilter?: string) => boolean
}

export default function ModalFiltros({ 
  isOpen, 
  onClose, 
  onFilterChange, 
  isButtonActive 
}: ModalFiltrosProps) {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div 
      id="filter-modal" 
      className="fixed inset-0 z-[60] bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="bg-brand-bg p-8 rounded-lg shadow-2xl max-w-sm w-full">
        <h3 className="text-2xl font-titulo mb-6 text-center">Filtrar Proyectos</h3>
        <div className="flex flex-col space-y-3 items-center">
          <button 
            className={`${styles['filter-modal-button']} w-full text-center ${isButtonActive('all') ? styles.active : ''}`}
            onClick={() => onFilterChange('all')}
            data-filter="all"
          >
            Todos
          </button>
          
          <button 
            className={`${styles['filter-modal-button']} w-full text-center ${isButtonActive('branding') ? styles.active : ''}`}
            onClick={() => onFilterChange('branding')}
            data-filter="branding"
          >
            Branding
          </button>
          
          <button 
            className={`${styles['filter-modal-button']} w-full text-center ${isButtonActive('motion') ? styles.active : ''}`}
            onClick={() => onFilterChange('motion')}
            data-filter="motion"
          >
            Motion Graphics
          </button>
          
          <button 
            className={`${styles['filter-modal-button']} w-full text-center ${isButtonActive('audiovisual') ? styles.active : ''}`}
            onClick={() => onFilterChange('audiovisual')}
            data-filter="audiovisual"
          >
            Audiovisual
          </button>
          
          <button 
            className={`${styles['filter-modal-button']} w-full text-center ml-4 opacity-50 ${isButtonActive('audiovisual', 'horizontal') ? `${styles.active} opacity-100` : ''}`}
            onClick={() => onFilterChange('audiovisual', 'horizontal')}
            data-subfilter="horizontal"
          >
            └ Corporativos
          </button>
          
          <button 
            className={`${styles['filter-modal-button']} w-full text-center ml-4 opacity-50 ${isButtonActive('audiovisual', 'reel') ? `${styles.active} opacity-100` : ''}`}
            onClick={() => onFilterChange('audiovisual', 'reel')}
            data-subfilter="reel"
          >
            └ Reels
          </button>
          
          <button 
            id="close-filter-modal"
            className="mt-4 text-brand-text opacity-70 hover:opacity-100 transition"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
