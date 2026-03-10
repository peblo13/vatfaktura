'use client'

import { useEffect } from 'react'

interface AdSenseBannerProps {
  slot: string
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle'
  responsive?: boolean
  className?: string
}

export function AdSenseBanner({ 
  slot, 
  format = 'auto',
  responsive = true,
  className = ''
}: AdSenseBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({})
      }
    } catch (err) {
      console.log('[v0] AdSense error:', err)
    }
  }, [slot])

  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9110227480064306"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}

export function AdSenseDisplay300x250() {
  return <AdSenseBanner slot="1234567890" format="rectangle" className="my-6" />
}

export function AdSenseDisplay728x90() {
  return <AdSenseBanner slot="0987654321" format="horizontal" className="my-6" />
}

export function AdSenseDisplayAuto() {
  return <AdSenseBanner slot="5555555555" format="auto" className="my-8" />
}
