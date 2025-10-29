# Contexto y Requisitos del Proyecto: Portafolio Creativo (Fase 1)

Este documento es la fuente de verdad para el Agente 2 (Implementador) sobre la arquitectura, diseño y funcionalidad del sitio web de portafolio de Juan Elihu Arrieta Vela.

## 1. Stack Tecnológico Mandatorio

* **Framework:** Next.js (con App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Despliegue:** Vercel

## 2. Arquitectura y Filosofía

1.  **Diseño Atómico:** La estructura de carpetas DEBE ser:
    * `/src/components/atoms`
    * `/src/components/molecules`
    * `/src/components/organisms`
    * `/src/app` (Para páginas y layouts de Next.js)
2.  **Filosofía "Portafolio-Semilla":**
    * La Fase 1 es un portafolio personal.
    * Cada componente debe ser agnóstico a los datos (recibir contenido vía `props`) para ser reutilizable en Fases 2 y 3 (plataforma multiusuario).

## 3. Sistema de Diseño (Átomos Fundamentales)

### 3.1. Paleta de Colores (para `tailwind.config.ts`)

* `brand-bg`: `#22222c` (Carbón oscuro - Fondo Base)
* `brand-text`: `#eeebe3` (Blanco hueso - Texto Base)
* `brand-orange`: `#e27240` (Naranja - Acento Primario CTA)
* `brand-blue`: `#428ce6` (Azul - Acento Secundario)
* `brand-cyan`: `#a3eadc` (Cian - Acento Terciario, Glow/Hover)
* `brand-ui-secondary`: `#31313e` (Gris oscuro - Fondo UI)
* `brand-border`: `#4a4a5a` (Gris medio - Bordes UI)

### 3.2. Tipografía (Google Fonts)

* **Títulos:** `font-titulo` - Gasoek One, Regular
* **Cuerpo:** `font-sans` - Zalando Sans, Regular (400) y Bold (700)

### 3.3. Estilos Globales

* Tema oscuro predominante.
* Bordes redondeados: `rounded-lg`, `rounded-full`.
* Efecto "Glow" sutil en hover: `shadow-glow-cyan`.
* Cursor personalizado (efecto "glow" blanco tenue).

## 4. Resumen de Páginas (Fase 1)

**Página de Inicio (`/`)**
* **Referencia:** `prototype-reverted.html`
* **Estructura:** Hero (video fondo), Grid Proyectos Destacados, Servicios Destacados (con orbe), Proceso Interactivo, CTA Final (Formulario + Redes), Footer.

**Portafolio General (`/portafolio`)**
* **Referencia:** `portafolio-final.html`
* **Estructura:** Encabezado, Barra Filtros (estilo píldora), Grid Proyectos (3 cols, tarjetas 4:3), Botón Flotante, Modal Filtros, Footer.

**Detalle Proyecto Estándar (`/portafolio/[slug]`)**
* **Referencia:** `proyecto-detalle-standard-final.html`
* **Estructura:** Imagen Principal (3:2), Info Resumen (desplegable), Flujo Vertical de Bloques (Imagen 3:2, Texto Animado, Video 16:9), CTA Proyecto, Navegación Siguiente.

**Detalle Proyecto Reels (`/portafolio/[slug]`)**
* **Referencia:** `proyecto-detalle-reels-final.html`
* **Estructura:** Intro Reel (Reel 9:16 + Info Desplegable), Carrusel Reels Adicionales, Bloques adicionales, CTA Proyecto, Navegación Siguiente.

**Quién Soy (`/estudio`)**
* **Referencia:** `estudio.html`
* **Estructura:** Título, Video Manifiesto (16:9), Bloques Biografía/Filosofía, Bloque Habilidades (3 Tarjetas), CTA Colaboración.

**Servicios (`/servicios`)**
* **Referencia:** `servicios-final.html`
* **Estructura:** Encabezado, Intro, Lista Servicios Detallada (3 secciones asimétricas), CTA Final (Cotización).

**Contacto (`/contacto`)**
* **Referencia:** `contacto.html`
* **Estructura:** Encabezado, Layout 2 Columnas (Info Contacto + Redes, Formulario).

**Admin - Dashboard (`/admin/proyectos`)**
* **Referencia:** `admin-proyectos.html` (Visual)
* **Estructura:** Header Admin, Título, Botón "+ Añadir", Tabla de Proyectos.

**Admin - Editar Proyecto (`/admin/proyectos/editar/[id]`)**
* **Referencia:** `admin-edit-proyecto.html` (Visual)
* **Estructura:** Layout 2 Columnas (Constructor Bloques Izq, Panel Configuración Der).

## 5. Componentes Clave Reutilizables

* **Generales:** AdminHeader, AdminFooter, NavegacionPrincipal, FooterPublico.
* **Inicio:** HeroPrincipal, GridProyectosDestacados, ServiciosDestacados (con OrbeBrillante), ProcesoTrabajo (interactivo), CTA_Final.
* **Portafolio:** FiltroPortafolio (barra + modal), GridPortafolioCompleto, TarjetaProyecto (4:3).
* **Detalle Proyecto:** ImagenPrincipalProyecto (3:2), InfoResumenProyecto (desplegable), BloqueImagenEstandar (3:2), BloqueTextoAnimado, BloqueVideoEmbebido (16:9), IntroduccionReel (9:16), CarruselReelsAdicionales, CTA_Proyecto, NavegacionProyecto.

## 6. Lógica de Interactividad Requerida (JS)

Implementar lógica de JavaScript (`"use client"`) para:

* Cursor Personalizado (glow).
* Animaciones de Scroll (fade-in + slide-up, usar IntersectionObserver).
* Orbe Interactivo (`/`) (sigue cursor vertical).
* Tabs de Proceso (`/`) (cambiar contenido al clic).
* Filtros Portafolio (`/portafolio`) (lógica de filtrado, estado activo).
* Modal y Botón Flotante (`/portafolio`) (mostrar/ocultar).
* Desplegable Info Proyecto (`/portafolio/[slug]`) (expandir/colapsar).
* Placeholders "Click-to-Play" (reemplazar por `<iframe>`).
* Carrusel Reels (navegación con flechas).
* (Admin) Lógica de Toggles, añadir/eliminar items.

## 7. Principios Fundamentales (No Negociables)

* **SEO Técnico:** HTML Semántico estricto (`<main>`, `<nav>`, `<h1>` único, etc.).
* **Accesibilidad (WCAG):** `alt` text para imágenes, navegación por teclado, foco visible, etiquetas `<label>` correctas.
* **Rendimiento:** Usar `next/image`, `next/link`, `next/font`. Carga diferida (lazy loading) de animaciones y video.
