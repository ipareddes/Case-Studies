import { Persona } from "@/lib/types"
import { cn } from "@/lib/cn"
import { QuoteCallout } from "./quote-callout"

interface PersonaCardProps {
  persona: Persona
  className?: string
}

export function PersonaCard({ persona, className }: PersonaCardProps) {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Persona Header */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {persona.name} - {persona.title}
          </h3>
          <p className="text-lg text-muted-foreground italic">
            {persona.pain}
          </p>
        </div>

        {/* Pain Points */}
        <div>
          <h4 className="subsection-title">Pain Points</h4>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            {persona.painPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Quote */}
        <QuoteCallout text={persona.quote} author={persona.name} />
      </div>

      {/* Automation Workflow */}
      <div className="rounded-lg border bg-card p-6">
        <h4 className="text-lg font-semibold mb-4">Automation Workflow</h4>

        <div className="space-y-4">
          {/* Trigger */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Trigger
            </div>
            <div className="text-base text-foreground">
              {persona.automationRule.trigger}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Conditions
            </div>
            <ul className="space-y-1">
              {persona.automationRule.conditions.map((condition, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div>
            <div className="text-sm font-medium text-muted-foreground mb-1">
              Actions
            </div>
            <ul className="space-y-1">
              {persona.automationRule.actions.map((action, index) => (
                <li key={index} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">→</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Result */}
          <div className="mt-4 pt-4 border-t">
            <div className="text-sm font-semibold text-foreground bg-accent/10 rounded-lg p-3">
              Result: {persona.automationRule.result}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Impact Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {persona.metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.label}</div>
              {metric.change && (
                <div className="metric-change positive">{metric.change}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
