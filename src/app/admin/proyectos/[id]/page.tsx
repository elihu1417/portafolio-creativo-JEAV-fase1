'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface AdminProyectoPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminProyectoPage({ params }: AdminProyectoPageProps) {
  const { id } = await params
  
  return <EditorProyecto projectId={id} />
}

function EditorProyecto({ projectId }: { projectId: string }) {
  const [projectStatus, setProjectStatus] = useState(false) // false = Borrador, true = Publicado
  const [projectTitle, setProjectTitle] = useState('Nombre Proyecto Placeholder')

  return (
    <div className="bg-gray-800 text-brand-text font-sans min-h-screen">
      {/* AdminHeader */}
      <header className="bg-gray-900 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/admin/proyectos" className="text-sm text-brand-text opacity-70 hover:opacity-100 transition">
            &lt; Volver a Proyectos
          </Link>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            projectStatus ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
          }`}>
            {projectStatus ? 'Publicado' : 'Borrador'}
          </span>
        </div>
      </header>

      {/* Layout Principal (2 Columnas) */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: ConstructorContenido */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">
            Editar Proyecto: <span className="font-normal">{projectTitle}</span>
          </h1>

          {/* ConstructorContenido */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Cuerpo del Proyecto</h2>

            {/* ListaBloquesContenido */}
            <div className="min-h-[300px] border-2 border-dashed border-gray-600 p-4 rounded mb-6 bg-gray-800">
              <p className="text-center text-xs text-brand-text opacity-50 mt-4 pt-4 border-t border-gray-600">
                Arrastra los bloques para reordenar (funcionalidad pendiente)
              </p>
            </div>

            {/* MenuAñadirBloque */}
            <div className="border-t border-gray-600 pt-6">
              <h3 className="text-md font-semibold mb-3">Añadir Nuevo Bloque:</h3>
              <div className="flex flex-wrap gap-3">
                <button className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition">
                  + Imagen (3:2)
                </button>
                <button className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition">
                  + Texto
                </button>
                <button className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition">
                  + Video Horiz (16:9)
                </button>
                <button className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition">
                  + Carrusel Reels
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: PanelConfiguracion */}
        <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-[76px] self-start">
          
          {/* CardPublicacion */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Publicación</h2>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Estado:</label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setProjectStatus(!projectStatus)}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    projectStatus ? 'bg-brand-cyan' : 'bg-gray-600'
                  }`}
                >
                  <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    projectStatus ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
                <span className={`text-sm font-semibold ${projectStatus ? 'text-green-400' : 'text-yellow-400'}`}>
                  {projectStatus ? 'Publicado' : 'Borrador'}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition">
                Guardar Cambios
              </button>
              <button className="w-full bg-brand-cyan hover:opacity-90 text-white font-bold py-2 px-4 rounded transition">
                Publicar Proyecto
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition mt-4">
                Eliminar Proyecto
              </button>
            </div>
          </div>

          {/* CardInfoPrincipal */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Información Principal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Título del Proyecto *</label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Categoría Principal *</label>
                <select className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none">
                  <option value="branding">Branding</option>
                  <option value="motion">Motion Graphics</option>
                  <option value="audiovisual">Audiovisual</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subcategorías / Tags (separados por coma)
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
                  placeholder="Diseño estratégico, Restaurante"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Resumen Corto *</label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Resumen Largo (Detalles)
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none"
                  placeholder="Este texto se mostrará al hacer clic en 'Más Información'..."
                />
              </div>
            </div>
          </div>

          {/* CardMediaPrincipal */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Media Principal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Imagen Portada (Grid 4:3) *</label>
                <div className="border-2 border-dashed border-gray-600 rounded p-4 cursor-pointer hover:border-brand-cyan transition">
                  <p className="text-xs text-center mb-2">Haz clic para subir imagen</p>
                  <div className="w-24 h-18 bg-gray-700 rounded flex items-center justify-center mx-auto">
                    <span className="text-xs">4:3</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Imagen Principal (Detalle 3:2) *</label>
                <div className="border-2 border-dashed border-gray-600 rounded p-4 cursor-pointer hover:border-brand-cyan transition">
                  <p className="text-xs text-center mb-2">Haz clic para subir imagen</p>
                  <div className="w-24 h-16 bg-gray-700 rounded flex items-center justify-center mx-auto">
                    <span className="text-xs">3:2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CardColaboradores */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Colaboradores</h2>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="flex-grow bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Rol"
                  className="flex-grow bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none"
                />
                <button className="text-red-500 hover:text-white text-xs p-1">X</button>
              </div>
            </div>
            <button className="w-full border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition text-xs">
              + Añadir Colaborador
            </button>
          </div>

        </aside>
      </div>
    </div>
  )
}
