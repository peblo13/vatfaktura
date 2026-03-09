'use client'

import { useState, useEffect } from 'react'
import { getUser, logout as authLogout } from '@/lib/auth'
import type { User } from '@/lib/auth'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const logout = () => {
    authLogout()
    setUser(null)
  }

  return { user, isLoading, logout }
}
