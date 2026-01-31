'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ChevronDown } from 'lucide-react'

interface DecisionOption {
  option: string
  pros: string[]
  cons: string[]
}

interface DecisionCardProps {
  decision: string
  context: string
  optionsConsidered: DecisionOption[]
  chosenApproach: string
  rationale: string
  tradeoffs?: string[]
  outcome: string
  className?: string
}

export function DecisionCard({
  decision,
  context,
  optionsConsidered,
  chosenApproach,
  rationale,
  tradeoffs,
  outcome,
  className
}: DecisionCardProps) {
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
          <div className="text-sm text-muted-foreground mb-1">Decision</div>
          <div className="text-xl font-semibold text-foreground">{decision}</div>
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
          <div className="space-y-4">
            {/* Context */}
            <div>
              <div className="text-sm font-medium text-foreground mb-2">Context</div>
              <p className="text-sm text-muted-foreground">{context}</p>
            </div>

            {/* Options Considered */}
            <div>
              <div className="text-sm font-medium text-foreground mb-3">Options Considered</div>
              <div className="space-y-4">
                {optionsConsidered.map((option, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-sm mb-3">{option.option}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-green-700 mb-2">Pros:</p>
                        <ul className="space-y-1">
                          {option.pros.map((pro, i) => (
                            <li key={i} className="text-xs text-gray-700 flex items-start">
                              <span className="text-green-600 mr-1">+</span>
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-red-700 mb-2">Cons:</p>
                        <ul className="space-y-1">
                          {option.cons.map((con, i) => (
                            <li key={i} className="text-xs text-gray-700 flex items-start">
                              <span className="text-red-600 mr-1">-</span>
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chosen Approach */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-2">Chosen Approach</div>
              <p className="text-sm text-blue-800">{chosenApproach}</p>
            </div>

            {/* Rationale */}
            <div>
              <div className="text-sm font-medium text-foreground mb-2">Rationale</div>
              <p className="text-sm text-muted-foreground">{rationale}</p>
            </div>

            {/* Trade-offs */}
            {tradeoffs && tradeoffs.length > 0 && (
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="text-sm font-medium text-amber-900 mb-2">Trade-offs Accepted</div>
                <ul className="space-y-1">
                  {tradeoffs.map((tradeoff, idx) => (
                    <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                      <span className="mt-0.5">⚖️</span>
                      <span>{tradeoff}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-900 mb-2">Outcome</div>
              <p className="text-sm text-green-800">{outcome}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
