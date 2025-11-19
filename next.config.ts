/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Permite cualquier ruta dentro de placehold.co
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Permite cualquier ruta dentro de images.unsplash.com
      },
      {
        protocol: 'https',
        hostname: 'jrdaazx1taa24svx.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**', // Permite cualquier ruta dentro de Vercel Blob Storage
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**', // Permite thumbnails de YouTube
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/**', // Permite thumbnails de YouTube (formato alternativo)
      },
      {
        protocol: 'https',
        hostname: 'youtu.be',
        port: '',
        pathname: '/**', // Permite URLs de YouTube (aunque no se usará directamente como imagen)
      },
      {
        protocol: 'https',
        hostname: 'www.youtube.com',
        port: '',
        pathname: '/**', // Permite URLs de YouTube (aunque no se usará directamente como imagen)
      },
      {
        protocol: 'https',
        hostname: 'youtube.com',
        port: '',
        pathname: '/**', // Permite URLs de YouTube (sin www)
      },
    ],
  },
}

module.exports = nextConfig