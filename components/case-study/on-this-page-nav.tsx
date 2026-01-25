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
      // Use a smaller offset to highlight sections as they enter viewport
      const scrollPosition = window.scrollY + 150

      let currentSection = sections[0]?.id || ''

      // Find the section that is currently at or just past the scroll position
      for (const { id, element } of sectionElements) {
        if (element) {
          const elementTop = element.offsetTop
          if (elementTop <= scrollPosition) {
            currentSection = id
          }
        }
      }

      setActiveSection(currentSection)
    }

    // Initial check
    handleScroll()

    // Add scroll listener with debouncing for better performance
    let timeoutId: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleScroll, 10)
    }

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll)
      clearTimeout(timeoutId)
    }
  }, [sections])

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Account for fixed header (64px) + extra spacing (40px)
      const offset = 104
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })

      // Update active section immediately for better UX
      setActiveSection(sectionId)
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
