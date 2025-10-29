import EncabezadoServicios from '../../components/organisms/EncabezadoServicios'
import IntroduccionServicios from '../../components/organisms/IntroduccionServicios'
import ListaServiciosDetallada from '../../components/organisms/ListaServiciosDetallada'
import CTA_Servicios from '../../components/organisms/CTA_Servicios'

export default function ServiciosPage() {
  return (
    <main id="servicios-main">
      <EncabezadoServicios />
      <IntroduccionServicios />
      <ListaServiciosDetallada />
      <CTA_Servicios />
    </main>
  )
}
