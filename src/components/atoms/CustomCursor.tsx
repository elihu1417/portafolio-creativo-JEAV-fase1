'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const updateCursor = () => {
      if (cursorRef.current) {
        const { x, y } = mousePositionRef.current
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }

      animationFrameRef.current = window.requestAnimationFrame(updateCursor)
    }

    animationFrameRef.current = window.requestAnimationFrame(updateCursor)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <div id="custom-cursor-glow" ref={cursorRef} />
}
