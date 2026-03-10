'use client'

import React from 'react'
import { PitProvider } from './pit-context'

export function PitProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PitProvider userId={''}>
      {children}
    </PitProvider>
  )
}
