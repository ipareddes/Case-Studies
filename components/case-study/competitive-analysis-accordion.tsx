'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ChevronDown } from 'lucide-react'

interface CompetitiveAnalysisItem {
  company: string
  strengths: string[]
  weaknesses: string[]
  opportunity: string
}

interface CompetitiveAnalysisAccordionProps {
  items: CompetitiveAnalysisItem[]
  className?: string
}

export function CompetitiveAnalysisAccordion({
  items,
  className
}: CompetitiveAnalysisAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={index}
            className={cn(
              "metric-card cursor-pointer transition-all",
              isOpen && "ring-2 ring-accent ring-offset-2"
            )}
            onClick={() => toggleItem(index)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Competitor Analysis
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {item.company}
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ml-4 mt-1",
                  isOpen && "rotate-180"
                )}
              />
            </div>

            {isOpen && (
              <div className="mt-4 pt-4 border-t animate-in slide-in-from-top-2">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">
                      Strengths
                    </div>
                    <ul className="space-y-1">
                      {item.strengths.map((strength, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-green-600 mt-0.5">+</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">
                      Weaknesses
                    </div>
                    <ul className="space-y-1">
                      {item.weaknesses.map((weakness, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-red-600 mt-0.5">-</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="text-sm font-semibold text-foreground mb-1">
                      Our Opportunity
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.opportunity}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
