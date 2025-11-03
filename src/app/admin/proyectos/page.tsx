'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAdminAuth } from '../../../hooks/useAdminAuth'

// Datos de ejemplo - esto se conectará con la base de datos
const proyectosEjemplo = [
  {
    id: '1',
    title: 'Identidad Corporativa TechStart',
    category: 'Branding',
    status: 'publicado',
    lastModified: '2025-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop'
  },
  {
    id: '2',
    title: 'Animación de Producto',
    category: 'Motion Graphics',
    status: 'publicado',
    lastModified: '2025-01-10',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=150&fit=crop'
  },
  {
    id: '5',
    title: 'Proyecto Campaña Reels',
    category: 'Audiovisual',
    status: 'borrador',
    lastModified: '2025-01-08',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=150&fit=crop'
  }
]

export default function AdminProyectosPage() {
  const [proyectos] = useState(proyectosEjemplo)
  const { logout } = useAdminAuth()

  return (
    <div className="bg-gray-800 text-brand-text font-sans min-h-screen">
      {/* Admin Header */}
      <header className="bg-gray-900 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button 
            onClick={logout}
            className="text-sm text-brand-text opacity-70 hover:opacity-100 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Proyectos</h2>
          <Link 
            href="/admin/proyectos/nuevo"
            className="bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-2 px-6 rounded-lg transition"
          >
            + Nuevo Proyecto
          </Link>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={proyecto.thumbnail}
                  alt={proyecto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold truncate flex-1">{proyecto.title}</h3>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    proyecto.status === 'publicado' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}>
                    {proyecto.status === 'publicado' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
                <p className="text-sm text-brand-text opacity-70 mb-4">{proyecto.category}</p>
                <div className="flex gap-2">
                  <Link 
                    href={`/admin/proyectos/${proyecto.id}`}
                    className="flex-1 bg-brand-cyan hover:opacity-90 text-white font-bold py-2 px-4 rounded text-center transition text-sm"
                  >
                    Editar
                  </Link>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay proyectos */}
        {proyectos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-brand-text opacity-70 mb-4">
              No hay proyectos aún
            </p>
            <Link 
              href="/admin/proyectos/nuevo"
              className="inline-block bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-2 px-6 rounded-lg transition"
            >
              Crear tu primer proyecto
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
