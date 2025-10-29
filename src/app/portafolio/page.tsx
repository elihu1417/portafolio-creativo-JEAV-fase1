'use client'

import { useState } from 'react'
import EncabezadoPortafolio from '@/components/organisms/EncabezadoPortafolio'
import BarraFiltros from '@/components/organisms/BarraFiltros'
import GridPortafolio from '@/components/organisms/GridPortafolio'
import BotonFiltroFlotante from '@/components/organisms/BotonFiltroFlotante'
import ModalFiltros from '@/components/organisms/ModalFiltros'
import { usePortfolioFilters, PortfolioItem } from '../../hooks/usePortfolioFilters'

// Datos de ejemplo del portafolio
const portfolioData: PortfolioItem[] = [
  {
    id: '1',
    title: 'Identidad Corporativa TechStart',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
    alt: 'Identidad corporativa moderna con logo minimalista',
    href: '/proyecto/1'
  },
  {
    id: '2',
    title: 'Animación de Producto',
    category: 'motion',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    alt: 'Animación 3D de producto con efectos visuales',
    href: '/proyecto/2'
  },
  {
    id: '3',
    title: 'Video Corporativo Empresarial',
    category: 'audiovisual',
    subcategory: 'horizontal',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop&crop=center',
    alt: 'Video corporativo profesional con equipo de trabajo',
    href: '/proyecto/3'
  },
  {
    id: '4',
    title: 'Rebranding Café Artesanal',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
    alt: 'Identidad visual para café con estilo artesanal',
    href: '/proyecto/4'
  },
  {
    id: '5',
    title: 'Reels Creativos para Redes',
    category: 'audiovisual',
    subcategory: 'reel',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=600&fit=crop&crop=center',
    alt: 'Contenido dinámico para redes sociales',
    href: '/proyecto/5'
  },
  {
    id: '6',
    title: 'Motion Graphics Explainer',
    category: 'motion',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&crop=center',
    alt: 'Animación explicativa con gráficos en movimiento',
    href: '/proyecto/6'
  }
]

export default function PortafolioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { filteredItems, filterPortfolio, isButtonActive } = usePortfolioFilters(portfolioData)

  const handleFilterChange = (filter: string, subfilter?: string) => {
    filterPortfolio(filter, subfilter)
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main id="portafolio-main">
      <EncabezadoPortafolio />
      <BarraFiltros 
        onFilterChange={handleFilterChange}
        isButtonActive={isButtonActive}
      />
      <GridPortafolio filteredItems={filteredItems} />
      <BotonFiltroFlotante onOpenModal={handleOpenModal} />
      <ModalFiltros 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onFilterChange={handleFilterChange}
        isButtonActive={isButtonActive}
      />
    </main>
  )
}
