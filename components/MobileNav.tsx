'use client'

import Link from 'next/link'

const navItems = [
  { 
    href: '/', 
    label: 'Home', 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    href: '/movies', 
    label: 'Movies', 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M7 12h10M7 8h10M7 16h10" />
      </svg>
    )
  },
  { 
    href: '/health', 
    label: 'Health', 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  { 
    href: '/nutrition', 
    label: 'Nutrition', 
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a9 9 0 019 9c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9z" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    href: '/chat',
    label: 'Chat',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    )
  }
]

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function MobileNav({ isOpen, setIsOpen }: MobileNavProps) {
  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[55] transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Navigation Menu */}
      <aside
        className={`lg:hidden fixed top-0 right-0 h-full w-[280px] bg-[#18181b] border-l border-foreground/10 z-[60] transform transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col bg-transparent">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold gradient-text">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2 flex-grow">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-primary/10 active:bg-primary/20 transition-colors group bg-foreground/5"
              >
                <div className="text-foreground/80 group-hover:text-primary transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium text-foreground">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <footer className="mt-auto pt-6 border-t border-foreground/10">
            <a
              href="https://github.com/sanjaychethu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors group bg-foreground/5"
            >
              <svg className="w-6 h-6 text-foreground/80 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-medium text-foreground">Developed by V Sanjay</span>
            </a>
          </footer>
        </div>
      </aside>
    </>
  )
} 