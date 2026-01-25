import Link from 'next/link'
import { Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button className="lg:hidden w-10 h-10 flex items-center justify-center">
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo - Desktop */}
        <Link href="/" className="hidden lg:flex items-center text-foreground">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 10 L20 35 L50 50 L80 35 Z"/>
            <path d="M20 40 L50 90 L80 40 L50 55 Z"/>
          </svg>
        </Link>

        {/* Logo - Mobile (centered) */}
        <Link href="/" className="lg:hidden absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="currentColor" className="text-foreground">
            <path d="M50 10 L20 35 L50 50 L80 35 Z"/>
            <path d="M20 40 L50 90 L80 40 L50 55 Z"/>
          </svg>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          <Link href="/#case-studies" className="nav-link font-semibold text-foreground">
            Case Studies
          </Link>
        </div>

        {/* Contact Button */}
        <Link
          href="#contact"
          className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
        >
          Contact
        </Link>
      </nav>
    </header>
  )
}
