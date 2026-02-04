'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react'
import { caseStudies } from '@/lib/data/case-studies'

const navLinks = [
  { label: 'Experience', href: '#experience', hasDropdown: true },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
]

const experienceItems = [
  { company: 'Numaris', logo: '/images/logos/numaris.svg', desc: 'SaaS Fleet Management', href: '/case-study/numaris-fleet-management' },
  { company: 'GBM', logo: '/images/logos/gbm.svg', desc: 'Investment Trading Platform', href: '/case-study/gbm-trading-platform' },
  { company: 'Mercado Pago', logo: '/images/logos/mercado-pago.svg', desc: 'Fintech & Financial Inclusion', href: '/case-study/mercadopago-investing' },
  { company: 'Clip', logo: '/images/logos/clip.svg', desc: 'Point of Sale & Payments', href: '/case-study/clip-pos-platform' },
  { company: 'Yalo.ai', logo: '/images/logos/yalo.svg', desc: 'Conversational Commerce AI', href: '/case-study/yalo-conversational-banking' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setDropdownOpen(false)
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-lg border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2 text-foreground shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md" aria-label="CRAFT - Go to homepage">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary">
              <svg width="16" height="16" viewBox="0 0 100 100" fill="currentColor" className="text-primary-foreground">
                <path d="M50 10 L20 35 L50 50 L80 35 Z" />
                <path d="M20 40 L50 90 L80 40 L50 55 Z" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight hidden sm:inline">CRAFT</span>
          </Link>

          {/* Desktop Navigation — centered */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    aria-controls="experience-dropdown"
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                  >
                    {link.label}
                    <ChevronUp
                      aria-hidden="true"
                      className={`size-3.5 transition-transform duration-200 ${dropdownOpen ? '' : 'rotate-180'}`}
                    />
                  </button>

                  {/* Dropdown panel */}
                  <div
                    id="experience-dropdown"
                    role="menu"
                    aria-label="Experience navigation"
                    className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[540px] rounded-xl border bg-background shadow-lg transition-all duration-200 origin-top ${
                      dropdownOpen
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {experienceItems.map((item) => (
                        <Link
                          key={item.company}
                          href={item.href}
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-start gap-3 rounded-lg px-3 py-3 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <div className="flex size-10 shrink-0 items-center justify-center">
                            <Image src={item.logo} alt={`${item.company} logo`} width={40} height={40} className="object-contain" />
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold">{item.company}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t px-4 py-2.5">
                      <Link
                        href="#experience"
                        onClick={() => setDropdownOpen(false)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        View all experience &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Let's talk — desktop */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border bg-background px-3.5 py-1.5 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Let&rsquo;s talk <MessageSquare className="size-4" />
            </Link>

            {/* Chat icon — mobile only */}
            <Link
              href="#contact"
              className="sm:hidden flex size-9 items-center justify-center rounded-full border hover:bg-accent transition-colors"
              aria-label="Contact"
            >
              <MessageSquare className="size-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden flex size-9 items-center justify-center rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Open mobile menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Sheet Menu ────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sheet — slides from left */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[280px] sm:w-[320px] bg-background border-r border-border shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sheet header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex size-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>
          <Link
            href="#home"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-foreground"
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-primary">
              <svg width="14" height="14" viewBox="0 0 100 100" fill="currentColor" className="text-primary-foreground">
                <path d="M50 10 L20 35 L50 50 L80 35 Z" />
                <path d="M20 40 L50 90 L80 40 L50 55 Z" />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight">CRAFT</span>
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-5 py-6 gap-1 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href}>
                <button
                  onClick={() => setMobilePortfolioOpen((v) => !v)}
                  aria-expanded={mobilePortfolioOpen}
                  aria-controls="mobile-experience-submenu"
                  className="flex w-full items-center justify-between py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                >
                  {link.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      mobilePortfolioOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobilePortfolioOpen && (
                  <div id="mobile-experience-submenu" className="flex flex-col gap-1 pb-2 pl-1" role="menu">
                    {experienceItems.map((item) => (
                      <Link
                        key={item.company}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <div className="flex size-8 shrink-0 items-center justify-center">
                          <Image src={item.logo} alt={`${item.company} logo`} width={32} height={32} className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.company}</span>
                          <span className="text-xs text-muted-foreground">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="#experience"
                      role="menuitem"
                      onClick={() => setIsOpen(false)}
                      className="px-2 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
                    >
                      View all &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </>
  )
}
