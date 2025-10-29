import HeroPrincipal from '@/components/organisms/HeroPrincipal'
import GridProyectosDestacados from '@/components/organisms/GridProyectosDestacados'
import VideoManifiesto from '@/components/organisms/VideoManifiesto'
import ServiciosDestacados from '@/components/organisms/ServiciosDestacados'
import ProcesoTrabajo from '@/components/organisms/ProcesoTrabajo'
import CTA_Final from '@/components/organisms/CTA_Final'

export default function Home() {
  return (
    <main>
      <HeroPrincipal />
      <GridProyectosDestacados />
      <VideoManifiesto />
      <ServiciosDestacados />
      <ProcesoTrabajo />
      <CTA_Final />
    </main>
  );
}