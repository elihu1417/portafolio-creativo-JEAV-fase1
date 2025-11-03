'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useAdminAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación
    const checkAuth = () => {
      const auth = sessionStorage.getItem('adminAuthenticated')
      if (auth === 'true') {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (username: string, password: string) => {
    // Autenticación básica - TODO: Reemplazar con sistema real
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('adminAuthenticated', 'true')
      document.cookie = 'admin-auth=authenticated; path=/'
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    document.cookie = 'admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    setIsAuthenticated(false)
    router.push('/admin')
  }

  return { isAuthenticated, isLoading, login, logout }
}
