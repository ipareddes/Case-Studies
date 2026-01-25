'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ChevronDown } from 'lucide-react'

interface ExpandableMetricCardProps {
  header: string
  title: string
  content: React.ReactNode
  className?: string
}

export function ExpandableMetricCard({
  header,
  title,
  content,
  className
}: ExpandableMetricCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "metric-card cursor-pointer transition-all",
        isExpanded && "ring-2 ring-accent ring-offset-2",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="text-sm text-muted-foreground mb-1">{header}</div>
          <div className="text-xl font-semibold text-foreground">{title}</div>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ml-4 mt-1",
            isExpanded && "rotate-180"
          )}
        />
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t animate-in slide-in-from-top-2">
          {content}
        </div>
      )}
    </div>
  )
}
