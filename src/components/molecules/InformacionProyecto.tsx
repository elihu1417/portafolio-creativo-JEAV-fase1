import BotonToggleDetalles from '../atoms/BotonToggleDetalles'

interface InformacionProyectoProps {
  title: string
  category: string
  subcategory?: string
  shortDescription: string
  longDescription: string
  collaborators?: string
  isExpanded: boolean
  onToggleDetails: () => void
}

export default function InformacionProyecto({
  title,
  category,
  subcategory,
  shortDescription,
  longDescription,
  collaborators,
  isExpanded,
  onToggleDetails
}: InformacionProyectoProps) {
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl">
      <h1 className="text-4xl md:text-5xl font-titulo mb-3">{title}</h1>
      <p className="text-brand-text opacity-70 font-sans mb-4">
        {category} {subcategory && `| ${subcategory}`}
      </p>
      <p className="text-lg font-sans mb-6">{shortDescription}</p>

      <div 
        className={`project-details space-y-4 border-t border-gray-700 pt-6 mt-6 transition-all duration-300 ${
          isExpanded ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        <p className="text-lg font-sans">{longDescription}</p>
        
        {collaborators && (
          <div className="border-t border-gray-700 pt-4 mt-6 text-sm text-brand-text opacity-70">
            <p><strong>Colaboradores:</strong> {collaborators}</p>
          </div>
        )}
      </div>

      <BotonToggleDetalles 
        isExpanded={isExpanded}
        onToggle={onToggleDetails}
      />
    </div>
  )
}
