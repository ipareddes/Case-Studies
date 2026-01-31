import { cn } from '@/lib/cn'

interface LongTermImpactCardProps {
  area: string
  impact: string
  sustainability: string
  className?: string
}

export function LongTermImpactCard({
  area,
  impact,
  sustainability,
  className
}: LongTermImpactCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <h4 className="font-semibold text-foreground mb-3">{area}</h4>
      <p className="text-sm text-muted-foreground mb-3">{impact}</p>
      <div className="pt-3 border-t">
        <p className="text-xs font-semibold text-foreground mb-1">
          Sustainability:
        </p>
        <p className="text-xs text-muted-foreground">{sustainability}</p>
      </div>
    </div>
  )
}
