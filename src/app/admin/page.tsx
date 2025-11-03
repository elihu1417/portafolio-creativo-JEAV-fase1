'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAdminAuth } from '../../hooks/useAdminAuth'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { login } = useAdminAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Login básico - TODO: Reemplazar con autenticación real
    const success = login(username, password)
    
    if (success) {
      router.push('/admin/proyectos')
    } else {
      setError('Credenciales incorrectas')
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
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white focus:border-brand-cyan focus:outline-none"
              required
              placeholder="admin"
            />
          </div>
          
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
            />
          </div>
          
          {error && (
            <div className="bg-red-600 text-white p-3 rounded text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-brand-cyan hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Credenciales de prueba:</p>
          <p>Usuario: <span className="text-brand-cyan">admin</span></p>
          <p>Contraseña: <span className="text-brand-cyan">admin</span></p>
        </div>
      </div>
    </div>
  )
}
