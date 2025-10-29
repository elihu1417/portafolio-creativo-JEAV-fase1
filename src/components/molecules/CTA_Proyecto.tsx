import Link from 'next/link'

interface CTA_ProyectoProps {
  title?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

export default function CTA_Proyecto({ 
  title = "¿Te gustó este proyecto?",
  buttonText = "Hablemos de tu idea",
  buttonHref = "/contacto",
  className = ""
}: CTA_ProyectoProps) {
  return (
    <div className={`bg-gray-900 p-12 rounded-lg shadow-xl text-center ${className}`}>
      <h2 className="text-3xl md:text-4xl font-titulo mb-6">{title}</h2>
      <Link 
        href={buttonHref}
        className="inline-block bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-3 px-8 rounded-full text-lg transition duration-300 font-sans"
      >
        {buttonText}
      </Link>
    </div>
  )
}
