'use client'

import { useState, useEffect } from 'react'

export function LazyLoadImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
    />
  )
}

export function OptimizePerformance() {
  useEffect(() => {
    // Disable animations on low-end devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms')
    }

    // Reduce animations on mobile
    if (window.innerWidth < 768) {
      // Animation optimization happens through CSS
    }
  }, [])

  return null
}
