'use client'

import { PortfolioItem } from '../../hooks/usePortfolioFilters'
import ItemPortafolio from '../molecules/ItemPortafolio'

interface GridPortafolioProps {
  filteredItems: PortfolioItem[]
}

export default function GridPortafolio({ filteredItems }: GridPortafolioProps) {

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <ItemPortafolio
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              subcategory={item.subcategory}
              image={item.image}
              alt={item.alt}
              href={item.href}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
