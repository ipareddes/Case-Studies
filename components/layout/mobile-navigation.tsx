'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/lib/types'

interface MobileNavigationProps {
  sections: Section[]
}

export function MobileNavigation({ sections }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="px-4 py-2 relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card shadow-sm hover:bg-muted/50 transition-colors"
        >
          <span className="text-sm font-medium text-foreground">Jump to section</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 rounded-lg border border-border bg-card shadow-lg overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="w-full text-left px-4 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border-b border-border last:border-b-0"
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
