import Link from 'next/link'
import Image from 'next/image'

interface ItemPortafolioProps {
  id: string
  title: string
  category: string
  subcategory?: string
  image: string
  alt: string
  href: string
}

export default function ItemPortafolio({
  id,
  title,
  category,
  subcategory,
  image,
  alt,
  href
}: ItemPortafolioProps) {
  return (
    <Link 
      href={href} 
      className="portfolio-item block bg-gray-900 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-glow-cyan group"
      data-category={category}
      data-subfilter={subcategory}
    >
      <div className="aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl mb-1 font-titulo">{title}</h3>
        <p className="text-brand-text opacity-70 font-sans text-sm">
          {subcategory ? `${category} / ${subcategory}` : category}
        </p>
      </div>
    </Link>
  )
}
