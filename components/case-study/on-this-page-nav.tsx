'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Section } from '@/lib/types'
import { Menu } from 'lucide-react'

interface OnThisPageNavProps {
  sections: Section[]
}

export function OnThisPageNav({ sections }: OnThisPageNavProps) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      // Get all section elements
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }))

      // Find which section is currently in view
      const scrollPosition = window.scrollY + 200 // Offset for header

      let currentSection = sections[0]?.id || ''

      for (const { id, element } of sectionElements) {
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = id
        }
      }

      setActiveSection(currentSection)
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sections])

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <aside className="hidden xl:block on-this-page-nav">
      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
        <Menu className="w-4 h-4" />
        <span className="text-sm font-semibold">On this page</span>
      </div>

      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={cn(
              "on-page-link w-full text-left",
              activeSection === section.id && "active"
            )}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </aside>
  )
}
