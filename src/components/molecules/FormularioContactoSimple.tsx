'use client'

import { useState } from 'react'

export default function FormularioContactoSimple() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se implementaría la lógica de envío del formulario
    console.log('Formulario enviado:', formData)
    // Por ahora solo mostramos un alert
    alert('¡Mensaje enviado! Te contactaremos pronto.')
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    })
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
          name="nombre" 
          id="nombre" 
          value={formData.nombre}
          onChange={handleChange}
          required 
          className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans"
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
          name="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          required 
          className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans"
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
          name="mensaje" 
          id="mensaje" 
          rows={5} 
          value={formData.mensaje}
          onChange={handleChange}
          required 
          className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans"
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-4 px-6 rounded-lg text-lg transition duration-300 font-sans"
      >
        Enviar mensaje
      </button>
    </form>
  )
}
