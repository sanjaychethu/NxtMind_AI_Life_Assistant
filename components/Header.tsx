'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import MobileNav from '@/components/MobileNav'

export default function Header() {
  const [navOpen, setNavOpen] = useState(false)

  useEffect(() => {
    if (navOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [navOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-surface/80 backdrop-blur-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold gradient-text">
              NexMind
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/health" className="nav-link">
              Health
            </Link>
            <Link href="/movies" className="nav-link">
              Movies
            </Link>
            <Link href="/nutrition" className="nav-link">
              Nutrition
            </Link>
            <Link href="/finance" className="nav-link">
              Finance
            </Link>
            <Link href="/learning" className="nav-link">
              Learning
            </Link>
            <Link href="/travel" className="nav-link">
              Travel
            </Link>
            <Link href="/entertainment" className="nav-link">
              Entertainment
            </Link>
            <a
              href="https://github.com/sanjaychethu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg border border-foreground/10 hover:bg-primary/10 transition-colors text-foreground/70 text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Developed by V Sanjay
            </a>
            <Link 
              href="/login" 
              className="btn btn-primary"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-xl border border-foreground/10 bg-background/80 shadow-lg hover:bg-primary/10 transition-all duration-300 flex items-center justify-center"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            <svg 
              className="h-7 w-7 text-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </nav>
      <MobileNav isOpen={navOpen} setIsOpen={setNavOpen} />
    </header>
  )
} 