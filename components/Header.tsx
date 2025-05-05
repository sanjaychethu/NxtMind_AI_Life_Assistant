'use client'

import Link from 'next/link'

export default function Header() {
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
            <Link 
              href="/login" 
              className="btn btn-primary"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 hover:bg-foreground/10 rounded-lg transition-colors">
            <span className="sr-only">Open menu</span>
            <svg 
              className="h-6 w-6 transition-transform duration-300 hover:scale-110" 
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
    </header>
  )
} 