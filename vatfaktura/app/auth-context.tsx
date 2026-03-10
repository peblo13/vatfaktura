'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  company: string
  nip: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, company: string, nip: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('vatfaktura_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      }
    } catch (error) {
      console.error('[v0] Failed to load user from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      if (typeof window === 'undefined') return
      const users = JSON.parse(localStorage.getItem('vatfaktura_users') || '[]')
      const userRecord = users.find((u: any) => u.email === email && u.password === password)
      
      if (!userRecord) {
        throw new Error('Nieprawidłowe dane logowania')
      }

      const { password: _, ...userData } = userRecord
      setUser(userData)
      localStorage.setItem('vatfaktura_user', JSON.stringify(userData))
    } catch (error) {
      console.error('[v0] Login failed:', error)
      throw error
    }
  }

  const register = async (email: string, password: string, company: string, nip: string) => {
    try {
      if (typeof window === 'undefined') return
      const users = JSON.parse(localStorage.getItem('vatfaktura_users') || '[]')
      
      if (users.find((u: any) => u.email === email)) {
        throw new Error('Użytkownik z tym emailem już istnieje')
      }

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        company,
        nip,
      }

      users.push({ ...newUser, password })
      localStorage.setItem('vatfaktura_users', JSON.stringify(users))

      setUser(newUser)
      localStorage.setItem('vatfaktura_user', JSON.stringify(newUser))
    } catch (error) {
      console.error('[v0] Register failed:', error)
      throw error
    }
  }

  const logout = () => {
    try {
      if (typeof window !== 'undefined') {
        setUser(null)
        localStorage.removeItem('vatfaktura_user')
      }
    } catch (error) {
      console.error('[v0] Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
