/**
 * Extrae el ID de video de una URL de YouTube
 * Soporta formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  // Patrones para diferentes formatos de URL de YouTube
  const patterns = [
    // https://www.youtube.com/watch?v=VIDEO_ID o https://youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    // https://www.youtube.com/shorts/VIDEO_ID o https://youtube.com/shorts/VIDEO_ID
    /(?:youtube\.com\/shorts\/)([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Genera la URL del thumbnail de YouTube a partir de una URL de video
 * Retorna null si no es una URL válida de YouTube
 */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = extractYouTubeVideoId(url)
  if (!videoId) return null

  // Usar maxresdefault para la mejor calidad (1280x720)
  // Si no está disponible, YouTube automáticamente usa hqdefault (480x360)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

/**
 * Verifica si una URL es de YouTube
 */
export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null
}

/**
 * Convierte una URL de YouTube a formato embed
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url)
  if (!videoId) return null

  return `https://www.youtube.com/embed/${videoId}`
}

