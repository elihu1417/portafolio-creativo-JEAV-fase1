import DetalleProyectoGeneral from '@/components/organisms/DetalleProyectoGeneral'

interface ProyectoPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProyectoPage({ params }: ProyectoPageProps) {
  const { id } = await params
  
  return (
    <main>
      <DetalleProyectoGeneral projectId={id} />
    </main>
  )
}
