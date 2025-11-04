'use client'

import { useState } from 'react'
import EncabezadoPortafolio from '@/components/organisms/EncabezadoPortafolio'
import BarraFiltros from '@/components/organisms/BarraFiltros'
import GridPortafolio from '@/components/organisms/GridPortafolio'
import BotonFiltroFlotante from '@/components/organisms/BotonFiltroFlotante'
import ModalFiltros from '@/components/organisms/ModalFiltros'
import { usePortfolioFilters, PortfolioItem } from '@/hooks/usePortfolioFilters'

interface PortafolioPageClientProps {
  initialPortfolioData: PortfolioItem[]
}

export default function PortafolioPageClient({ initialPortfolioData }: PortafolioPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { filteredItems, filterPortfolio, isButtonActive } = usePortfolioFilters(initialPortfolioData)

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

