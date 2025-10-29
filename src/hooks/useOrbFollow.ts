'use client'

import { useState, useEffect, useRef } from 'react'

export function useOrbFollow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const [orbTop, setOrbTop] = useState<string>('50%')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !orbContainerRef.current || !orbRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const y = e.pageY - (containerRect.top + window.scrollY)
      const containerHeight = containerRef.current.offsetHeight
      let yPercent = y / containerHeight
      const orbContainerHeight = orbContainerRef.current.offsetHeight
      const orbHeight = orbRef.current.offsetHeight
      const paddingPercent = (orbHeight / 2) / orbContainerHeight

      if (yPercent < paddingPercent) yPercent = paddingPercent
      if (yPercent > (1 - paddingPercent)) yPercent = (1 - paddingPercent)

      window.requestAnimationFrame(() => {
        setOrbTop((yPercent * 100) + '%')
      })
    }

    const handleMouseLeave = () => {
      window.requestAnimationFrame(() => {
        setOrbTop('50%')
      })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return {
    containerRef,
    orbContainerRef,
    orbRef,
    orbTop
  }
}
