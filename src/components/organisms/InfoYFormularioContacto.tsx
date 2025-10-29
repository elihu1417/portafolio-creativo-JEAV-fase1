import DatosContacto from '@/components/molecules/DatosContacto'
import IconosRedesSociales from '@/components/molecules/IconosRedesSociales'
import FormularioContactoSimple from '@/components/molecules/FormularioContactoSimple'

export default function InfoYFormularioContacto() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Layout Asimétrico (2 Columnas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          
          {/* Columna Izquierda (Información) */}
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-titulo mb-6">Información de Contacto</h2>
            <p className="text-lg font-sans leading-relaxed opacity-80 mb-8">
              Puedes enviarme un mensaje usando el formulario, o si prefieres, utilizar alguno de los siguientes métodos. Estaré encantado de responder lo antes posible.
            </p>

            {/* Molécula: DatosContacto */}
            <DatosContacto />

            {/* Molécula: IconosRedesSociales */}
            <IconosRedesSociales />
          </div>

          {/* Columna Derecha (Formulario) */}
          <div 
            className="bg-gray-900 p-8 md:p-12 rounded-lg shadow-2xl animate-on-scroll" 
            style={{ transitionDelay: '0.1s' }}
          >
            {/* Molécula: FormularioContactoSimple */}
            <FormularioContactoSimple />
          </div>

        </div>
      </div>
    </section>
  )
}
