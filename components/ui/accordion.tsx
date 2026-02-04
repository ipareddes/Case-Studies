'use client'

import { useState, useCallback, useRef, KeyboardEvent } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface AccordionItem {
  id: string
  trigger: React.ReactNode
  content: React.ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(
    items.find(item => item.defaultOpen)?.id || null
  )
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const itemCount = items.length
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

    if (newIndex !== null && buttonRefs.current[newIndex]) {
      buttonRefs.current[newIndex]?.focus()
    }
  }, [items.length])

  return (
    <div className={cn("space-y-3", className)} role="region" aria-label="Accordion">
      {items.map((item, index) => {
        const isOpen = openItemId === item.id
        const triggerId = `accordion-trigger-${item.id}`
        const contentId = `accordion-content-${item.id}`

        return (
          <div
            key={item.id}
            className="rounded-lg border bg-card overflow-hidden transition-all"
          >
            {/* Accordion Header */}
            <button
              ref={(el) => { buttonRefs.current[index] = el }}
              id={triggerId}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="flex-1">
                {item.trigger}
              </div>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4",
                  isOpen && "transform rotate-180"
                )}
              />
            </button>

            {/* Accordion Content */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={cn(
                "transition-all duration-200 ease-in-out",
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              )}
            >
              <div className="px-6 pb-6 pt-4 border-t border-border">
                {item.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
