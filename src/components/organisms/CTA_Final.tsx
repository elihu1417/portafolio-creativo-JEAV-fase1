export default function CTA_Final() {
  return (
    <section id="contacto" className="py-24 bg-brand-bg">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="bg-gray-900 p-8 md:p-12 rounded-lg shadow-2xl">
            <form action="#" method="POST">
              <div className="mb-5">
                <label htmlFor="nombre" className="block text-sm font-medium text-brand-text opacity-70 mb-2 font-sans">
                  NOMBRE
                </label>
                <input 
                  type="text" 
                  name="nombre" 
                  id="nombre" 
                  className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-sm font-medium text-brand-text opacity-70 mb-2 font-sans">
                  EMAIL
                </label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="mensaje" className="block text-sm font-medium text-brand-text opacity-70 mb-2 font-sans">
                  MENSAJE
                </label>
                <textarea 
                  name="mensaje" 
                  id="mensaje" 
                  rows={4} 
                  className="w-full p-3 bg-brand-bg border border-gray-700 rounded-lg text-brand-text focus:ring-brand-orange focus:border-brand-orange font-sans"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-brand-orange hover:opacity-90 text-brand-bg font-bold py-4 px-6 rounded-lg text-lg transition duration-300 font-sans"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl mb-6 text-brand-text font-titulo">
              Hablemos de tu próximo proyecto.
            </h2>
            <p className="text-xl text-brand-text opacity-70 mb-8 max-w-lg font-sans">
              Ayudo a marcas a conectar y destacarse a través de creatividad y estrategia.
            </p>
            
            <div className="flex justify-center md:justify-start space-x-6">
              <a 
                href="#" 
                className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition" 
                title="LinkedIn"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-brand-text opacity-70 hover:opacity-100 hover:text-brand-cyan transition" 
                title="Instagram"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.227-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.646-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.281.073 1.689.073-4.948s-.014-3.667-.072-4.947c-.197-4.358-2.618-6.78-6.979-6.98-1.281-.059-1.689-.073-4.947-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
