'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'

// Tipo basado en el modelo PortfolioItem de Prisma (nuevo schema)
type PortfolioItem = {
  id: string
  title: string
  isPublished: boolean
  category: string
  tags: string[]
  resumeCorto: string
  resumeLargo: string
  imagenPortadaUrl: string
  imagenPrincipalUrl: string
  contentBlocks?: any | null
  colaboradores?: any | null
  videoUrl?: string | null
  createdAt: string
  updatedAt: string
}

// Tipo para el proyecto con estructura compatible con el UI
type Proyecto = {
  id: string
  title: string
  category: string
  status: 'publicado' | 'borrador'
  lastModified: string
  thumbnail: string
}

export default function AdminProyectosPage() {
  const { getToken, logout } = useAdminAuth()
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Función para eliminar un proyecto
  const handleDelete = async (id: string) => {
    // 1. Pedir confirmación para seguridad
    if (!window.confirm("¿Estás seguro de que quieres eliminar este proyecto? Esta acción no se puede deshacer.")) {
      return
    }

    const token = getToken() // Obtenemos el "pase de cocina"
    if (!token) {
      setError("Error de autenticación. Inicia sesión de nuevo.")
      return
    }

    try {
      // 2. Llamar al "mesero especialista" (DELETE)
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('No se pudo eliminar el proyecto.')
      }

      // 3. (Éxito) Actualizar la UI sin recargar la página
      // Filtramos el array 'proyectos' para quitar el que acabamos de borrar
      setProyectos(prevProyectos => prevProyectos.filter(proyecto => proyecto.id !== id))
      
      // Limpiar el error si había uno previo
      setError(null)
    } catch (err: any) {
      setError(err.message || 'Error al eliminar el proyecto')
      console.error('Error al eliminar proyecto:', err)
    }
  }

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      setLoading(true)
      setError(null)

      const token = getToken() // Obtenemos el token del sessionStorage

      if (!token) {
        setError('No se encontró el token de autenticación.')
        setLoading(false)
        return
      }

      try {
        // Llamar al endpoint /api/portfolio con el token de autorización
        const response = await fetch('/api/portfolio', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          // El middleware nos rechazó o hubo un error en el servidor
          if (response.status === 401) {
            throw new Error('No autorizado. Por favor, inicia sesión nuevamente.')
          }
          throw new Error('Error al obtener los proyectos')
        }

        const data: PortfolioItem[] = await response.json()

        // Mapear los datos de PortfolioItem a la estructura que usa el componente
        const proyectosMapeados: Proyecto[] = data.map((item) => {
          // Usar los campos directos del nuevo schema
          const category = item.category || 'Sin categoría'
          const status = item.isPublished ? 'publicado' : 'borrador'
          
          // Formatear la fecha de última modificación
          const lastModified = new Date(item.updatedAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })

          return {
            id: item.id,
            title: item.title,
            category: category,
            status: status,
            lastModified: lastModified,
            thumbnail: item.imagenPortadaUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=150&fit=crop'
          }
        })

        setProyectos(proyectosMapeados)
      } catch (err: any) {
        setError(err.message || 'Error al cargar los proyectos')
        console.error('Error al obtener proyectos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [getToken]) // Dependemos de getToken

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

        {/* Estado de carga */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-xl text-brand-text opacity-70">Cargando proyectos...</p>
          </div>
        )}

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-900/30 border border-red-600/50 rounded-lg p-4 mb-6">
            <p className="text-red-400 font-sans">Error: {error}</p>
          </div>
        )}

        {/* Grid de Proyectos */}
        {!loading && !error && proyectos.length > 0 && (
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
                    <button 
                      onClick={() => handleDelete(proyecto.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensaje si no hay proyectos */}
        {!loading && !error && proyectos.length === 0 && (
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
