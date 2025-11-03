import DetalleProyectoGeneral from '@/components/organisms/DetalleProyectoGeneral'
import DetalleProyectoReel from '@/components/organisms/DetalleProyectoReel'

interface ProyectoPageProps {
  params: Promise<{
    id: string
  }>
}

// Proyectos que usan el layout especial de Reels
const reelProjects = ['5']

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { id } = await params
  
  // Decidir qué layout usar basándose en el ID del proyecto
  const isReelProject = reelProjects.includes(id)
  
  return (
    <main>
      {isReelProject ? (
        <DetalleProyectoReel projectId={id} />
      ) : (
        <DetalleProyectoGeneral projectId={id} />
      )}
    </main>
  )
}
