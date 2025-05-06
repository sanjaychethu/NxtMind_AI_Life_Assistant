'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MenuIcon, XMarkIcon, HomeIcon, FilmIcon, HeartIcon, BrainIcon } from '@heroicons/react/24/outline'

const navItems = [
  { href: '/', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
  { href: '/movies', label: 'Movies', icon: <FilmIcon className="w-5 h-5" /> },
  { href: '/health', label: 'Health', icon: <HeartIcon className="w-5 h-5" /> },
  { href: '/nutrition', label: 'Nutrition', icon: <BrainIcon className="w-5 h-5" /> }
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-background/60 border border-foreground/10 hover:border-primary/30 transition-all duration-300"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Navigation Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <aside
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-background border-l border-foreground/10 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-8 gradient-text">Menu</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
} 