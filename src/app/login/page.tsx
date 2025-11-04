'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAdminAuth } from '../../hooks/useAdminAuth'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAdminAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // Llamamos al login que ahora usa el endpoint real
      const success = await login(password)
      
      if (success) {
        router.push('/admin/proyectos')
      } else {
        setError('Contraseña incorrecta')
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.')
      console.error('Error en login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Panel de Administración
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-brand-cyan focus:outline-none"
              required
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
          
          {error && (
            <div className="bg-red-600 text-white p-3 rounded text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-cyan hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
