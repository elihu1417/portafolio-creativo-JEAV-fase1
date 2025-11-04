'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/useAdminAuth'

interface AdminProyectoPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminProyectoPage({ params }: AdminProyectoPageProps) {
  const { id } = await params
  
  return <EditorProyecto projectId={id} />
}

// Tipos para los bloques de contenido
type ContentBlock = 
  | { type: 'image'; id: string; url: string; caption?: string }
  | { type: 'text'; id: string; content: string }
  | { type: 'video'; id: string; url: string; caption?: string }
  | { type: 'reel-carousel'; id: string; reels: Array<{ url: string; title?: string }> }

function EditorProyecto({ projectId }: { projectId: string }) {
  const router = useRouter()
  const { getToken } = useAdminAuth()

  // Estados de UI
  const [loadingData, setLoadingData] = useState(true) // Carga inicial de datos
  const [loading, setLoading] = useState(false) // Guardado/actualización
  const [error, setError] = useState<string | null>(null)
  const [uploadingPortada, setUploadingPortada] = useState(false)
  const [uploadingPrincipal, setUploadingPrincipal] = useState(false)
  const [uploadingBlockImage, setUploadingBlockImage] = useState<string | null>(null) // ID del bloque subiendo imagen

  // Estados del formulario
  const [projectStatus, setProjectStatus] = useState(false) // isPublished
  const [projectTitle, setProjectTitle] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('') // Se convertirá a array
  const [resumeCorto, setResumeCorto] = useState('')
  const [resumeLargo, setResumeLargo] = useState('')
  const [imagenPortadaUrl, setImagenPortadaUrl] = useState('')
  const [imagenPrincipalUrl, setImagenPrincipalUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]) // Array de bloques
  const [colaboradores, setColaboradores] = useState<any[]>([]) // Array de {nombre, rol}

  // Función helper para generar IDs únicos
  const generateBlockId = () => `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Función para detectar si es un proyecto de tipo "reel"
  const isReelProject = () => {
    const tagsArray = tags.toLowerCase().split(',').map(t => t.trim())
    return category === 'audiovisual' && (
      tagsArray.includes('reel') || 
      tagsArray.includes('reels') || 
      tagsArray.includes('instagram reels') ||
      tagsArray.includes('shorts')
    )
  }

  // Función para agregar un nuevo bloque
  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = (() => {
      switch (type) {
        case 'image':
          return { type: 'image', id: generateBlockId(), url: '', caption: '' }
        case 'text':
          return { type: 'text', id: generateBlockId(), content: '' }
        case 'video':
          return { type: 'video', id: generateBlockId(), url: '', caption: '' }
        case 'reel-carousel':
          return { type: 'reel-carousel', id: generateBlockId(), reels: [] }
      }
    })()
    
    setContentBlocks([...contentBlocks, newBlock])
  }

  // Función para eliminar un bloque
  const removeBlock = (blockId: string) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== blockId))
  }

  // Función para actualizar un bloque
  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setContentBlocks(contentBlocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ))
  }

  // Función para mover un bloque (arriba/abajo)
  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = contentBlocks.findIndex(b => b.id === blockId)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= contentBlocks.length) return

    const newBlocks = [...contentBlocks]
    ;[newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]]
    setContentBlocks(newBlocks)
  }

  // Función helper para subir imágenes
  const handleImageUpload = async (file: File) => {
    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      })

      if (!response.ok) {
        throw new Error('Falló la subida del archivo.')
      }

      const blob = await response.json()
      return blob.url // Devuelve la URL pública
    } catch (error) {
      console.error('Error al subir imagen:', error)
      setError('Error al subir la imagen.')
      return null
    }
  }

  // Handler para subir imagen de un bloque
  const handleBlockImageChange = (blockId: string, file: File) => {
    ;(async () => {
      setUploadingBlockImage(blockId)
      const url = await handleImageUpload(file)
      if (url) {
        updateBlock(blockId, { url } as Partial<ContentBlock>)
      }
      setUploadingBlockImage(null)
    })()
  }

  // Cargar datos del proyecto al montar el componente
  useEffect(() => {
    const fetchProjectData = async () => {
      setLoadingData(true)
      setError(null)

      try {
        const token = getToken()
        
        if (!token) {
          setError('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.')
          setLoadingData(false)
          return
        }

        const response = await fetch(`/api/portfolio/${projectId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Proyecto no encontrado')
          }
          if (response.status === 401) {
            throw new Error('No autorizado. Por favor, inicia sesión nuevamente.')
          }
          throw new Error('Error al cargar el proyecto')
        }

        const projectData = await response.json()

        // Mapear los datos de la API al estado del formulario
        setProjectStatus(projectData.isPublished || false)
        setProjectTitle(projectData.title || '')
        setCategory(projectData.category || '')
        
        // Convertir array de tags a string separado por comas
        if (Array.isArray(projectData.tags)) {
          setTags(projectData.tags.join(', '))
        } else {
          setTags('')
        }
        
        setResumeCorto(projectData.resumeCorto || '')
        setResumeLargo(projectData.resumeLargo || '')
        setImagenPortadaUrl(projectData.imagenPortadaUrl || '')
        setImagenPrincipalUrl(projectData.imagenPrincipalUrl || '')
        setVideoUrl(projectData.videoUrl || '')
        
        // Cargar bloques de contenido
        if (projectData.contentBlocks) {
          // Si es un array, usarlo directamente
          if (Array.isArray(projectData.contentBlocks)) {
            setContentBlocks(projectData.contentBlocks)
          } 
          // Si es un objeto, convertirlo a array
          else if (typeof projectData.contentBlocks === 'object') {
            setContentBlocks([projectData.contentBlocks])
          }
          // Si es string, parsearlo
          else if (typeof projectData.contentBlocks === 'string') {
            try {
              const parsed = JSON.parse(projectData.contentBlocks)
              setContentBlocks(Array.isArray(parsed) ? parsed : [parsed])
            } catch {
              setContentBlocks([])
            }
          }
        } else {
          setContentBlocks([])
        }
        
        // Convertir JSON de colaboradores a array
        if (projectData.colaboradores) {
          if (Array.isArray(projectData.colaboradores)) {
            setColaboradores(projectData.colaboradores)
          } 
          else if (typeof projectData.colaboradores === 'object') {
            setColaboradores([projectData.colaboradores])
          }
          else if (typeof projectData.colaboradores === 'string') {
            try {
              const parsed = JSON.parse(projectData.colaboradores)
              setColaboradores(Array.isArray(parsed) ? parsed : [parsed])
            } catch {
              setColaboradores([])
            }
          }
        } else {
          setColaboradores([])
        }
      } catch (err: any) {
        setError(err.message || 'Error al cargar el proyecto')
        console.error('Error al cargar proyecto:', err)
      } finally {
        setLoadingData(false)
      }
    }

    if (projectId) {
      fetchProjectData()
    }
  }, [projectId, getToken])

  // Handlers síncronos para los inputs de archivo
  const handlePortadaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Usamos una función anónima autoejecutable para manejar la asincronía
    ;(async () => {
      setUploadingPortada(true)
      const url = await handleImageUpload(file)
      if (url) {
        setImagenPortadaUrl(url) // Guarda la URL en el estado
      }
      setUploadingPortada(false)
      // Resetear el input para permitir seleccionar el mismo archivo de nuevo
      e.target.value = ''
    })()
  }

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Usamos una función anónima autoejecutable
    ;(async () => {
      setUploadingPrincipal(true)
      const url = await handleImageUpload(file)
      if (url) {
        setImagenPrincipalUrl(url) // Guarda la URL en el estado
      }
      setUploadingPrincipal(false)
      // Resetear el input para permitir seleccionar el mismo archivo de nuevo
      e.target.value = ''
    })()
  }

  // Función para manejar el envío del formulario
  const handleSubmit = async (isPublished: boolean) => {
    setLoading(true)
    setError(null)

    try {
      // Obtener el token de autenticación
      const token = getToken()
      
      if (!token) {
        setError('No se encontró el token de autenticación. Por favor, inicia sesión nuevamente.')
        setLoading(false)
        return
      }

      // Convertir tags de string a array
      const tagsArray = tags
        ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : []

      // Preparar los datos para enviar
      const formData = {
        title: projectTitle,
        isPublished: isPublished,
        category: category,
        tags: tagsArray,
        resumeCorto: resumeCorto,
        resumeLargo: resumeLargo,
        imagenPortadaUrl: imagenPortadaUrl,
        imagenPrincipalUrl: imagenPrincipalUrl,
        contentBlocks: contentBlocks.length > 0 ? contentBlocks : null,
        colaboradores: colaboradores.length > 0 ? colaboradores : null,
        videoUrl: videoUrl || null,
      }

      // Validación básica
      if (!projectTitle || !category || !resumeCorto || !resumeLargo || !imagenPortadaUrl || !imagenPrincipalUrl) {
        setError('Por favor, completa todos los campos requeridos.')
        setLoading(false)
        return
      }

      // Llamar a la API (PUT para actualizar)
      const response = await fetch(`/api/portfolio/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el proyecto')
      }

      // Éxito: redirigir al dashboard
      router.push('/admin/proyectos')
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el proyecto. Por favor, intenta de nuevo.')
      console.error('Error al actualizar proyecto:', err)
    } finally {
      setLoading(false)
    }
  }

  // Mostrar estado de carga mientras se obtienen los datos
  if (loadingData) {
    return (
      <div className="bg-gray-800 text-brand-text font-sans min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-cyan mx-auto mb-4"></div>
          <p className="text-lg">Cargando proyecto...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 text-brand-text font-sans min-h-screen">
      {/* AdminHeader */}
      <header className="bg-gray-900 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/admin/proyectos" className="text-sm text-brand-text opacity-70 hover:opacity-100 transition">
            &lt; Volver a Proyectos
          </Link>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            projectStatus ? 'bg-green-600' : 'bg-yellow-600'
          } text-white`}>
            {projectStatus ? 'Publicado' : 'Borrador'}
          </span>
        </div>
      </header>

      {/* Layout Principal (2 Columnas) */}
      <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: ConstructorContenido */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">
            Editar Proyecto: <span className="font-normal">{projectTitle || '[Sin título]'}</span>
          </h1>

          {/* ConstructorContenido */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Cuerpo del Proyecto</h2>

            {/* ListaBloquesContenido */}
            <div className="min-h-[300px] border-2 border-dashed border-gray-600 p-4 rounded mb-6 bg-gray-800">
              {contentBlocks.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[200px]">
                  <p className="text-center text-sm text-brand-text opacity-50">
                    Los bloques aparecerán aquí cuando los agregues
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contentBlocks.map((block, index) => (
                    <div 
                      key={block.id} 
                      className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-brand-cyan transition"
                    >
                      {/* Controles del bloque */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-brand-text opacity-50">
                            {block.type === 'image' ? '📷 Imagen' : 
                             block.type === 'text' ? '📝 Texto' : 
                             block.type === 'video' ? '🎥 Video' : 
                             '🎬 Carrusel Reels'}
                          </span>
                          <span className="text-xs text-brand-text opacity-30">#{index + 1}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveBlock(block.id, 'up')}
                            disabled={index === 0}
                            className="text-xs text-brand-cyan hover:text-white disabled:opacity-30 disabled:cursor-not-allowed p-1"
                            title="Mover arriba"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveBlock(block.id, 'down')}
                            disabled={index === contentBlocks.length - 1}
                            className="text-xs text-brand-cyan hover:text-white disabled:opacity-30 disabled:cursor-not-allowed p-1"
                            title="Mover abajo"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="text-xs text-red-400 hover:text-red-300 p-1"
                            title="Eliminar"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      {/* Renderizado del bloque según su tipo */}
                      {block.type === 'image' && (
                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingBlockImage === block.id || loading || loadingData}
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleBlockImageChange(block.id, file)
                                e.target.value = ''
                              }}
                              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-cyan file:text-white hover:file:opacity-90 file:cursor-pointer cursor-pointer"
                            />
                            {uploadingBlockImage === block.id && (
                              <p className="mt-2 text-xs text-brand-cyan">Subiendo...</p>
                            )}
                          </div>
                          {block.url && (
                            <div>
                              <img
                                src={block.url}
                                alt="Preview"
                                className="w-full max-w-md h-auto rounded border border-gray-600"
                              />
                              <input
                                type="text"
                                value={block.url}
                                onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                                placeholder="URL de la imagen"
                                className="mt-2 w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-xs focus:border-brand-cyan focus:outline-none"
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                            placeholder="Descripción opcional"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none"
                          />
                        </div>
                      )}

                      {block.type === 'text' && (
                        <textarea
                          value={block.content}
                          onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                          placeholder="Escribe el contenido del texto aquí..."
                          rows={6}
                          className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none resize-y"
                        />
                      )}

                      {block.type === 'video' && (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={block.url}
                            onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                            placeholder="URL del video (YouTube, Vimeo, etc.)"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none"
                          />
                          {block.url && (
                            <div className="aspect-video bg-gray-900 rounded border border-gray-600 flex items-center justify-center">
                              <p className="text-xs text-brand-text opacity-50">Preview del video</p>
                            </div>
                          )}
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                            placeholder="Descripción opcional"
                            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none"
                          />
                        </div>
                      )}

                      {block.type === 'reel-carousel' && (
                        <div className="space-y-3">
                          <p className="text-xs text-brand-text opacity-50 mb-2">
                            {block.reels.length} reel(s) agregado(s)
                          </p>
                          <button
                            onClick={() => {
                              const newReel = { url: '', title: '' }
                              updateBlock(block.id, { reels: [...block.reels, newReel] } as Partial<ContentBlock>)
                            }}
                            className="w-full border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded text-sm transition"
                          >
                            + Agregar Reel
                          </button>
                          {block.reels.map((reel, reelIndex) => (
                            <div key={reelIndex} className="bg-gray-800 rounded p-3 border border-gray-600">
                              <input
                                type="text"
                                value={reel.url}
                                onChange={(e) => {
                                  const newReels = [...block.reels]
                                  newReels[reelIndex] = { ...reel, url: e.target.value }
                                  updateBlock(block.id, { reels: newReels } as Partial<ContentBlock>)
                                }}
                                placeholder="URL del reel"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-xs focus:border-brand-cyan focus:outline-none mb-2"
                              />
                              <input
                                type="text"
                                value={reel.title || ''}
                                onChange={(e) => {
                                  const newReels = [...block.reels]
                                  newReels[reelIndex] = { ...reel, title: e.target.value }
                                  updateBlock(block.id, { reels: newReels } as Partial<ContentBlock>)
                                }}
                                placeholder="Título opcional"
                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white text-xs focus:border-brand-cyan focus:outline-none"
                              />
                              <button
                                onClick={() => {
                                  const newReels = block.reels.filter((_, i) => i !== reelIndex)
                                  updateBlock(block.id, { reels: newReels } as Partial<ContentBlock>)
                                }}
                                className="mt-2 text-xs text-red-400 hover:text-red-300"
                              >
                                Eliminar reel
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* MenuAñadirBloque */}
            <div className="border-t border-gray-600 pt-6">
              <h3 className="text-md font-semibold mb-3">Añadir Nuevo Bloque:</h3>
              <div className="flex flex-wrap gap-3">
                {!isReelProject() && (
                  <>
                    <button
                      onClick={() => addBlock('image')}
                      disabled={loading || loadingData}
                      className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Imagen (3:2)
                    </button>
                    <button
                      onClick={() => addBlock('text')}
                      disabled={loading || loadingData}
                      className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Texto
                    </button>
                    <button
                      onClick={() => addBlock('video')}
                      disabled={loading || loadingData}
                      className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      + Video Horiz (16:9)
                    </button>
                  </>
                )}
                <button
                  onClick={() => addBlock('reel-carousel')}
                  disabled={loading || loadingData}
                  className="border border-gray-600 hover:border-brand-cyan text-brand-text py-2 px-4 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
                  disabled={loading || loadingData}
                  className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                    projectStatus ? 'bg-brand-cyan' : 'bg-gray-600'
                  } ${loading || loadingData ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            
            {/* Mensaje de error */}
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-600/50 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleSubmit(false)}
                disabled={loading || loadingData}
                className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={loading || loadingData}
                className="w-full bg-brand-cyan hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition"
              >
                {loading ? 'Actualizando...' : 'Actualizar y Publicar'}
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
                  disabled={loading || loadingData}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                  required
                  placeholder="Ingresa el título del proyecto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Categoría Principal *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={loading || loadingData}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                >
                  <option value="">Selecciona una categoría</option>
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
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  disabled={loading || loadingData}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                  placeholder="Ej: Diseño estratégico, Restaurante"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Resumen Corto *</label>
                <textarea
                  rows={3}
                  value={resumeCorto}
                  onChange={(e) => setResumeCorto(e.target.value)}
                  disabled={loading || loadingData}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                  required
                  placeholder="Este resumen será visible en el grid del portafolio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Resumen Largo (Detalles)
                </label>
                <textarea
                  rows={6}
                  value={resumeLargo}
                  onChange={(e) => setResumeLargo(e.target.value)}
                  disabled={loading || loadingData}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:border-brand-cyan focus:outline-none disabled:opacity-50"
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
                <input
                  type="file"
                  accept="image/*"
                  disabled={loading || loadingData || uploadingPortada}
                  onChange={handlePortadaChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-cyan file:text-white hover:file:opacity-90 file:cursor-pointer cursor-pointer"
                />
                {uploadingPortada && (
                  <p className="mt-2 text-sm text-brand-cyan">Subiendo imagen...</p>
                )}
                {imagenPortadaUrl && !uploadingPortada && (
                  <div className="mt-2">
                    <p className="text-xs text-green-400 mb-2">✓ Imagen {loadingData ? 'del proyecto' : 'subida correctamente'}</p>
                    <img
                      src={imagenPortadaUrl}
                      alt="Preview portada"
                      className="w-full max-w-xs h-auto rounded border border-gray-600"
                    />
                    <p className="text-xs text-gray-400 mt-2 truncate">{imagenPortadaUrl}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Imagen Principal (Detalle 3:2) *</label>
                <input
                  type="file"
                  accept="image/*"
                  disabled={loading || loadingData || uploadingPrincipal}
                  onChange={handlePrincipalChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-cyan file:text-white hover:file:opacity-90 file:cursor-pointer cursor-pointer"
                />
                {uploadingPrincipal && (
                  <p className="mt-2 text-sm text-brand-cyan">Subiendo imagen...</p>
                )}
                {imagenPrincipalUrl && !uploadingPrincipal && (
                  <div className="mt-2">
                    <p className="text-xs text-green-400 mb-2">✓ Imagen {loadingData ? 'del proyecto' : 'subida correctamente'}</p>
                    <img
                      src={imagenPrincipalUrl}
                      alt="Preview principal"
                      className="w-full max-w-xs h-auto rounded border border-gray-600"
                    />
                    <p className="text-xs text-gray-400 mt-2 truncate">{imagenPrincipalUrl}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Video URL (Opcional)</label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={loading || loadingData}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                  placeholder="URL del video (ej: YouTube, Vimeo)"
                />
              </div>
            </div>
          </div>

          {/* CardColaboradores */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Colaboradores</h2>
            <div className="space-y-3 mb-4">
              {colaboradores.length === 0 ? (
                <p className="text-sm text-gray-400">No hay colaboradores agregados</p>
              ) : (
                colaboradores.map((colab, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={colab.nombre || ''}
                      onChange={(e) => {
                        const newColabs = [...colaboradores]
                        newColabs[index] = { ...newColabs[index], nombre: e.target.value }
                        setColaboradores(newColabs)
                      }}
                      disabled={loading || loadingData}
                      placeholder="Nombre"
                      className="flex-grow bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                    />
                    <input
                      type="text"
                      value={colab.rol || ''}
                      onChange={(e) => {
                        const newColabs = [...colaboradores]
                        newColabs[index] = { ...newColabs[index], rol: e.target.value }
                        setColaboradores(newColabs)
                      }}
                      disabled={loading || loadingData}
                      placeholder="Rol"
                      className="flex-grow bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white text-sm focus:border-brand-cyan focus:outline-none disabled:opacity-50"
                    />
                    <button
                      onClick={() => {
                        setColaboradores(colaboradores.filter((_, i) => i !== index))
                      }}
                      disabled={loading || loadingData}
                      className="text-red-500 hover:text-white text-xs p-1 disabled:opacity-50"
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              onClick={() => {
                setColaboradores([...colaboradores, { nombre: '', rol: '' }])
              }}
              disabled={loading || loadingData}
              className="w-full border border-gray-600 hover:border-brand-cyan disabled:opacity-50 text-brand-text py-2 px-4 rounded transition text-xs"
            >
              + Añadir Colaborador
            </button>
          </div>

        </aside>
      </div>
    </div>
  )
}
