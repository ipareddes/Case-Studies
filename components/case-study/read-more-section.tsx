'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

interface ReadMoreSectionProps {
  children: React.ReactNode
  maxHeight?: number
  className?: string
}

export function ReadMoreSection({
  children,
  maxHeight = 240,
  className
}: ReadMoreSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          !isExpanded && "relative"
        )}
        style={{ maxHeight: isExpanded ? 'none' : `${maxHeight}px` }}
      >
        {children}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none" />
        )}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
      >
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  )
}
