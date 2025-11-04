'use client'

import { useState } from 'react'

export default function FormularioContactoSimple() {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  // Estados para manejar la UI (loading, success, error)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Lógica de envío actualizada
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Llamar a nuestro endpoint /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Mapear los campos de español a inglés
        body: JSON.stringify({
          name: nombre, // Mapeo español -> inglés
          email: email,
          message: mensaje, // Mapeo español -> inglés
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Algo salió mal al enviar el mensaje.')
      }

      // ¡Éxito!
      setStatus('success')
      // Limpiar formulario
      setNombre('')
      setEmail('')
      setMensaje('')
    } catch (error: any) {
      // ¡Error!
      setStatus('error')
      setErrorMessage(error.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label 
          htmlFor="nombre" 
          className="block text-sm font-medium text-brand-text opacity-70 mb-2 font-sans"
        >
          NOMBRE
        </label>
        <input 
          type="text" 
          id="nombre" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={status === 'loading'}
          required 
          className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      
      <div className="mb-5">
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-brand-text opacity-70 mb-2 font-sans"
        >
          EMAIL
        </label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          required 
          className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      
      <div className="mb-5">
        <label 
          htmlFor="mensaje" 
          className="block text-sm font-medium text-brand-text opacity-70 mb-2 font-sans"
        >
          MENSAJE
        </label>
        <textarea 
          id="mensaje" 
          rows={5} 
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          disabled={status === 'loading'}
          required 
          className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full bg-brand-orange hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-brand-bg font-bold py-4 px-6 rounded-lg text-lg transition duration-300 font-sans"
      >
        {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {/* Mensajes de Estado (reemplazan el alert) */}
      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-900/30 border border-green-600/50 rounded-lg text-green-400 text-center font-sans">
          ¡Mensaje enviado con éxito! Te contactaré pronto.
        </div>
      )}
      
      {status === 'error' && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-600/50 rounded-lg text-red-400 text-center font-sans">
          Error: {errorMessage}
        </div>
      )}
    </form>
  )
}
