'use client'

import { useEffect, useState } from 'react'

export function FuturisticLoader() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Track page load progress
    const handleStart = () => {
      setIsVisible(true)
      setProgress(10)
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => setIsVisible(false), 1200)
    }

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        const increment = Math.random() * 20
        return Math.min(prev + increment, 89)
      })
    }, 300)

    window.addEventListener('beforeunload', handleStart)

    // Check if page is fully loaded
    if (document.readyState === 'complete') {
      handleComplete()
    } else {
      window.addEventListener('load', handleComplete)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('load', handleComplete)
    }
  }, [])

  if (!isVisible && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Container with backdrop blur */}
      <div className="relative h-1.5 overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900/80 backdrop-blur-sm border-b-2 border-blue-500/30">
        
        {/* Layer 1: Base glow background */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%,
              rgba(34, 211, 238, 0.15) ${Math.max(progress - 5, 0)}%,
              rgba(34, 211, 238, 0.25) ${progress}%,
              transparent ${progress + 10}%)`,
            filter: 'blur(8px)',
          }}
        />

        {/* Layer 2: Main progress bar with gradient */}
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-200 ease-out relative"
          style={{
            width: `${progress}%`,
            boxShadow: `
              0 0 20px rgba(34, 211, 238, 1),
              0 0 40px rgba(59, 130, 246, 0.8),
              0 0 60px rgba(168, 85, 247, 0.4),
              inset 0 0 20px rgba(255, 255, 255, 0.5)
            `,
          }}
        >
          {/* Inner shimmer */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              opacity: 0.4,
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>

        {/* Layer 3: Outer glow halo */}
        <div
          className="absolute top-0 h-full blur-lg"
          style={{
            width: `${progress + 5}%`,
            background: `linear-gradient(90deg, 
              transparent 0%,
              rgba(34, 211, 238, 0.3) 80%,
              transparent 100%)`,
            filter: 'blur(12px)',
          }}
        />

        {/* Layer 4: Animated scan line */}
        <div
          className="absolute top-0 h-full w-20 pointer-events-none"
          style={{
            left: `${progress}%`,
            background: `linear-gradient(90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.8) 50%,
              transparent 100%)`,
            filter: 'blur(4px)',
            boxShadow: `0 0 15px rgba(255, 255, 255, 0.6)`,
            opacity: progress > 0 && progress < 100 ? 1 : 0,
            animation: progress < 100 ? 'scan-line 0.8s ease-in-out infinite' : 'none',
          }}
        />

        {/* Layer 5: Energy particles */}
        {progress > 0 && progress < 100 && (
          <>
            <div
              className="absolute top-1/2 h-1 bg-gradient-to-r from-cyan-300 via-blue-400 to-transparent rounded-full"
              style={{
                left: `${progress}%`,
                width: '40px',
                opacity: Math.sin(Date.now() / 100) * 0.5 + 0.5,
                boxShadow: '0 0 10px rgba(34, 211, 238, 0.8)',
                filter: 'blur(1px)',
                transform: 'translateY(-50%)',
              }}
            />
          </>
        )}

        {/* Layer 6: Completion explosion */}
        {progress === 100 && (
          <>
            <div className="absolute inset-0 h-full bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 animate-pulse" />
            <div
              className="absolute inset-0 h-full"
              style={{
                background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.8), transparent)',
                animation: 'completion-flash 0.8s ease-out forwards',
              }}
            />
          </>
        )}

        {/* Futuristic corners */}
        <div className="absolute top-0 left-0 w-6 h-1.5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-cyan-400/60" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
        </div>
        <div className="absolute top-0 right-0 w-6 h-1.5 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-full border-r-2 border-t-2 border-cyan-400/60" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        </div>
      </div>

      {/* Percentage counter */}
      <div className="absolute top-4 right-4 flex items-center gap-2 pointer-events-auto select-none">
        <span className="text-xs sm:text-sm font-mono font-bold">
          <span
            className="inline-block min-w-[2rem] text-right bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
            }}
          >
            {Math.min(Math.round(progress), 100)}%
          </span>
        </span>
        <div
          className="w-1 h-1 rounded-full bg-cyan-400"
          style={{
            boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)',
            animation: progress < 100 ? 'pulse 1s ease-in-out infinite' : 'none',
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes scan-line {
          0%, 100% {
            opacity: 0.3;
            filter: blur(4px);
          }
          50% {
            opacity: 1;
            filter: blur(2px);
          }
        }

        @keyframes completion-flash {
          0% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 0;
            filter: blur(20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}
