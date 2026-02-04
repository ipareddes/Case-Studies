'use client'

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/lib/types'

interface MobileNavigationProps {
  sections: Section[]
}

export function MobileNavigation({ sections }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Account for fixed header (64px) + mobile nav bar (60px) + extra spacing (40px)
      const offset = 164
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })

      // Close dropdown after navigation
      setIsOpen(false)
    }
  }

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [isOpen])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const itemCount = sections.length
    let newIndex: number | null = null

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        newIndex = (index + 1) % itemCount
        break
      case 'ArrowUp':
        e.preventDefault()
        newIndex = (index - 1 + itemCount) % itemCount
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = itemCount - 1
        break
    }

    if (newIndex !== null && itemRefs.current[newIndex]) {
      itemRefs.current[newIndex]?.focus()
    }
  }, [sections.length])

  return (
    <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border" ref={menuRef}>
      <div className="px-4 py-2 relative">
        {/* Toggle Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls="section-menu"
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card shadow-sm hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="text-sm font-medium text-foreground">Jump to section</span>
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            id="section-menu"
            role="menu"
            aria-label="Page sections"
            className="absolute top-full left-4 right-4 mt-2 rounded-lg border border-border bg-card shadow-lg overflow-hidden z-50 max-h-[60vh] overflow-y-auto"
          >
            {sections.map((section, index) => (
              <button
                key={section.id}
                ref={(el) => { itemRefs.current[index] = el }}
                role="menuitem"
                onClick={() => handleSectionClick(section.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border-b border-border last:border-b-0 focus-visible:outline-none focus-visible:bg-muted focus-visible:text-foreground"
              >
                {section.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
