'use client'

import { useState } from 'react'
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

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id)
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openItemId === item.id

        return (
          <div
            key={item.id}
            className="rounded-lg border bg-card overflow-hidden transition-all"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                {item.trigger}
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4",
                  isOpen && "transform rotate-180"
                )}
              />
            </button>

            {/* Accordion Content */}
            <div
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
