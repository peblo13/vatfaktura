'use client'

import { useEffect, useState } from 'react'

interface Particle {
  x: number
  y: number
  id: number
  age: number
  vx: number
  vy: number
  size: number
}

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let particleId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Create multiple particles at different sizes
      for (let i = 0; i < 3; i++) {
        const angle = (Math.random() * Math.PI * 2)
        const velocity = 0.5 + Math.random() * 1.5
        
        const newParticle: Particle = {
          x: e.clientX,
          y: e.clientY,
          id: particleId++,
          age: 0,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: 2 + Math.random() * 4,
        }

        setParticles((prev) => [...prev, newParticle].slice(-150))
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // gravity
            age: p.age + 1,
          }))
          .filter((p) => p.age < 60) // Remove after 60 frames
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {particles.map((particle) => {
        const progress = particle.age / 60
        const opacity = Math.max(0, 1 - progress)
        const scale = 1 + progress * 2
        
        return (
          <div
            key={particle.id}
            className="pointer-events-none fixed"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(34, 211, 238, ${opacity}), rgba(6, 182, 212, ${opacity * 0.5}))`,
              boxShadow: `
                0 0 ${4 + progress * 8}px rgba(34, 211, 238, ${opacity * 0.8}),
                0 0 ${10 + progress * 15}px rgba(6, 182, 212, ${opacity * 0.4}),
                inset 0 0 ${2 + progress * 4}px rgba(165, 243, 252, ${opacity * 0.6})
              `,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
              filter: `blur(${progress * 0.5}px)`,
              borderRadius: '50%',
            }}
          />
        )
      })}
      
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed w-8 h-8 rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4), rgba(6, 182, 212, 0))',
          boxShadow: '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(2px)',
        }}
      />
    </>
  )
}
