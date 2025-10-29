'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProcesoTrabajo() {
  const [activeTab, setActiveTab] = useState('1')

  const processData = {
    '1': { 
      title: '1. Descubrimiento', 
      desc: 'Aquí va el texto para el paso 1. Hablamos sobre la marca, objetivos y audiencia.', 
      img: 'https://placehold.co/400x400/22222c/eeebe3?text=Ilustración+Paso+1' 
    },
    '2': { 
      title: '2. Estrategia y Diseño', 
      desc: 'Aquí va el texto para el paso 2. Desarrollamos la estrategia creativa y los conceptos visuales.', 
      img: 'https://placehold.co/400x400/22222c/eeebe3?text=Ilustración+Paso+2' 
    },
    '3': { 
      title: '3. Desarrollo y Producción', 
      desc: 'Aquí va el texto para el paso 3. Creamos y producimos todos los elementos del proyecto.', 
      img: 'https://placehold.co/400x400/22222c/eeebe3?text=Ilustración+Paso+3' 
    },
    '4': { 
      title: '4. Entrega y Lanzamiento', 
      desc: 'Aquí va el texto para el paso 4. Entregamos el proyecto final y lanzamos al mercado.', 
      img: 'https://placehold.co/400x400/22222c/eeebe3?text=Ilustración+Paso+4' 
    }
  }

  const handleTabClick = (tabNum: string) => {
    setActiveTab(tabNum)
  }

  return (
    <section id="proceso" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl text-center mb-16 text-brand-text font-titulo">
          Mi Magia no es Secreta
        </h2>
        
        <div className="bg-brand-bg p-8 md:p-12 rounded-lg shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col">
            <div className="flex space-x-4 mb-6">
              <button 
                onClick={() => handleTabClick('1')}
                className={`w-12 h-12 rounded-full font-bold text-lg font-sans transition duration-300 ${
                  activeTab === '1' 
                    ? 'bg-brand-orange text-brand-bg' 
                    : 'bg-gray-800 text-brand-text opacity-70 hover:opacity-100'
                }`}
              >
                1
              </button>
              <button 
                onClick={() => handleTabClick('2')}
                className={`w-12 h-12 rounded-full font-bold text-lg font-sans transition duration-300 ${
                  activeTab === '2' 
                    ? 'bg-brand-orange text-brand-bg' 
                    : 'bg-gray-800 text-brand-text opacity-70 hover:opacity-100'
                }`}
              >
                2
              </button>
              <button 
                onClick={() => handleTabClick('3')}
                className={`w-12 h-12 rounded-full font-bold text-lg font-sans transition duration-300 ${
                  activeTab === '3' 
                    ? 'bg-brand-orange text-brand-bg' 
                    : 'bg-gray-800 text-brand-text opacity-70 hover:opacity-100'
                }`}
              >
                3
              </button>
              <button 
                onClick={() => handleTabClick('4')}
                className={`w-12 h-12 rounded-full font-bold text-lg font-sans transition duration-300 ${
                  activeTab === '4' 
                    ? 'bg-brand-orange text-brand-bg' 
                    : 'bg-gray-800 text-brand-text opacity-70 hover:opacity-100'
                }`}
              >
                4
              </button>
            </div>
            
            <div id="process-content">
              <h3 className="text-3xl mb-4 text-brand-text font-titulo">
                {processData[activeTab as keyof typeof processData].title}
              </h3>
              <p className="text-brand-text opacity-70 text-lg font-sans">
                {processData[activeTab as keyof typeof processData].desc}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <Image 
              src={processData[activeTab as keyof typeof processData].img}
              alt="Ilustración del proceso" 
              width={400}
              height={400}
              className="rounded-lg transition-opacity duration-300"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
