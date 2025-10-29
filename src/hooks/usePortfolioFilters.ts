'use client'

import { useState, useEffect } from 'react'

export interface PortfolioItem {
  id: string
  title: string
  category: string
  subcategory?: string
  image: string
  alt: string
  href: string
}

export function usePortfolioFilters(portfolioItems: PortfolioItem[]) {
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSubFilter, setCurrentSubFilter] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(portfolioItems)
  const [showFloatingButton, setShowFloatingButton] = useState(false)

  // Función para filtrar los elementos del portafolio con subfiltros
  const filterPortfolio = (filter: string, subfilter?: string) => {
    // Si se selecciona un filtro principal diferente a audiovisual, limpiar subfiltro
    if (filter !== 'audiovisual') {
      setCurrentSubFilter(null)
    }
    
    setCurrentFilter(filter)
    setCurrentSubFilter(subfilter || null)

    const filtered = portfolioItems.filter(item => {
      if (filter === 'all') return true
      
      if (filter === item.category) {
        if (!subfilter) return true // Mostrar todo de la categoría si no hay subfiltro
        if (subfilter === item.subcategory) return true // Mostrar solo subcategoría
      }
      
      return false
    })

    setFilteredItems(filtered)
  }

  // Función para verificar si un botón está activo
  const isButtonActive = (buttonFilter: string, buttonSubFilter?: string) => {
    // Si es un subfiltro, solo activar si coincide exactamente con el subfiltro actual
    if (buttonSubFilter) {
      return currentSubFilter === buttonSubFilter
    }
    
    // Si es un filtro principal, activar solo si coincide y no hay subfiltro activo
    if (buttonFilter === currentFilter && !currentSubFilter) {
      return true
    }
    
    // Si es audiovisual y hay subfiltro activo, mantener activo el botón principal
    if (buttonFilter === 'audiovisual' && currentFilter === 'audiovisual' && currentSubFilter) {
      return true
    }
    
    return false
  }

  // Efecto para mostrar/ocultar botón flotante
  useEffect(() => {
    const handleScroll = () => {
      const filterBar = document.getElementById('filter-bar-static')
      if (filterBar) {
        const rect = filterBar.getBoundingClientRect()
        setShowFloatingButton(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Filtro inicial
  useEffect(() => {
    filterPortfolio('all')
  }, [])

  return {
    currentFilter,
    filteredItems,
    showFloatingButton,
    filterPortfolio,
    isButtonActive
  }
}
