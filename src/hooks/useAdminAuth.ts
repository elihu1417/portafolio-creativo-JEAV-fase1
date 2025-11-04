'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

// Clave constante para evitar inconsistencias
const TOKEN_KEY = 'adminToken'

// Helper para verificar si sessionStorage está disponible
const getSessionStorage = () => {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage
  } catch (e) {
    return null
  }
}

export function useAdminAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación leyendo el token guardado
    const checkAuth = () => {
      const storage = getSessionStorage()
      if (!storage) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }
      
      const token = storage.getItem(TOKEN_KEY)
      if (token) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = useCallback(async (password: string) => {
    try {
      // Llamamos al endpoint de autenticación
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.ok && data.token) {
        // Guardamos el ADMIN_TOKEN para usarlo en las llamadas a API
        const storage = getSessionStorage()
        if (storage) {
          storage.setItem(TOKEN_KEY, data.token)
          setIsAuthenticated(true)
          return true
        } else {
          console.error('sessionStorage no está disponible')
          return false
        }
      } else {
        // Error en la autenticación
        return false
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      return false
    }
  }, []) // No tiene dependencias externas

  const logout = useCallback(() => {
    // Limpiar el token
    const storage = getSessionStorage()
    if (storage) {
      storage.removeItem(TOKEN_KEY)
    }
    setIsAuthenticated(false)
    
    // TODO: Llamar a endpoint de logout si existe para limpiar la cookie de sesión
    // Por ahora, solo redirigimos a la página de login
    router.push('/login')
  }, [router]) // Depende de router

  const getToken = useCallback(() => {
    const storage = getSessionStorage()
    if (!storage) {
      return null
    }
    return storage.getItem(TOKEN_KEY)
  }, []) // No tiene dependencias externas

  return { isAuthenticated, isLoading, login, logout, getToken }
}
