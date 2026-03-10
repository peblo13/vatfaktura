'use client'

import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { 
      href: '/#partners', 
      label: 'Partnerzy',
      emoji: '💰'
    },
    { 
      href: '/partners', 
      label: 'Wszystkie Partnerzy',
      emoji: '🎯'
    },
    { 
      href: '/pricing', 
      label: '100% Bezpłatnie',
      emoji: '✨'
    },
    { 
      href: '/login', 
      label: 'Zaloguj się',
      emoji: '🔐'
    },
    { 
      href: '/register', 
      label: 'Załóż konto',
      emoji: '🚀'
    },
  ]

  return (
    <div className="sm:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-blue-300 hover:text-blue-100 hover:bg-blue-500/20 transition-all duration-200"
        aria-label="Menu"
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-3 top-full mt-2 w-48 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Menu Container */}
          <div className="bg-slate-900/95 backdrop-blur-md border border-blue-500/30 rounded-lg shadow-xl overflow-hidden">
            <nav className="py-2 space-y-0">
              {navItems.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-cyan-500/20 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.emoji}</span>
                      <span className="text-sm font-medium text-blue-200 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Arrow pointer */}
          <div className="absolute -top-1 right-4 w-2 h-2 bg-blue-500/30 border border-blue-500/30 transform rotate-45"></div>
        </div>
      )}

      {/* Backdrop - click to close */}
      {open && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  )
}
