'use client'

import { useState } from 'react'
import styles from '../../app/portafolio/portafolio.module.css'

interface BarraFiltrosProps {
  onFilterChange: (filter: string, subfilter?: string) => void
  isButtonActive: (buttonFilter: string, buttonSubFilter?: string) => boolean
}

export default function BarraFiltros({ onFilterChange, isButtonActive }: BarraFiltrosProps) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  return (
    <section id="filter-bar-static" className="py-12 bg-brand-bg">
      <div className="container mx-auto px-6 flex justify-center flex-wrap gap-3 md:gap-4">
        <button 
          className={`${styles['filter-button']} ${isButtonActive('all') ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
          data-filter="all"
        >
          Todos
        </button>
        
        <button 
          className={`${styles['filter-button']} ${isButtonActive('branding') ? styles.active : ''}`}
          onClick={() => onFilterChange('branding')}
          data-filter="branding"
        >
          Branding
        </button>
        
        <button 
          className={`${styles['filter-button']} ${isButtonActive('motion') ? styles.active : ''}`}
          onClick={() => onFilterChange('motion')}
          data-filter="motion"
        >
          Motion Graphics
        </button>
        
        <div 
          className={styles['filter-button-wrapper']}
          onMouseEnter={() => setIsSubMenuOpen(true)}
          onMouseLeave={() => setIsSubMenuOpen(false)}
        >
          <button 
            className={`${styles['filter-button']} ${isButtonActive('audiovisual') ? styles.active : ''}`}
            onClick={() => onFilterChange('audiovisual')}
            data-filter="audiovisual"
          >
            Audiovisual
          </button>
          
          <div className={`${styles['sub-filter-menu']} ${isSubMenuOpen ? styles['sub-menu-open'] : ''}`}>
            <button 
              className={`${styles['sub-filter-button']} ${isButtonActive('audiovisual', 'horizontal') ? styles.active : ''}`}
              onClick={() => onFilterChange('audiovisual', 'horizontal')}
              data-subfilter="horizontal"
            >
              Corporativos
            </button>
            <button 
              className={`${styles['sub-filter-button']} ${isButtonActive('audiovisual', 'reel') ? styles.active : ''}`}
              onClick={() => onFilterChange('audiovisual', 'reel')}
              data-subfilter="reel"
            >
              Reels
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
