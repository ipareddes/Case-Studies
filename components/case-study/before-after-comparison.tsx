import { BeforeAfter } from "@/lib/types"
import { cn } from "@/lib/cn"

interface BeforeAfterComparisonProps {
  data: BeforeAfter
  className?: string
}

export function BeforeAfterComparison({ data, className }: BeforeAfterComparisonProps) {
  return (
    <div className={cn("side-by-side", className)}>
      {/* Before Column */}
      <div className="rounded-lg border bg-card p-6">
        <div className="inline-block px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
          Before
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {data.before.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {data.before.description}
        </p>
        <div className="space-y-2">
          {data.before.painPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <span className="text-destructive mt-0.5">✕</span>
              <span className="text-muted-foreground">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* After Column */}
      <div className="rounded-lg border bg-card p-6">
        <div className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
          After
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {data.after.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {data.after.description}
        </p>
        <div className="space-y-2">
          {data.after.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <span className="text-green-600 mt-0.5">✓</span>
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
