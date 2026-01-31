import { cn } from '@/lib/cn'

interface MetricCardProps {
  metric: string
  before: string
  after: string
  change?: string
  trend?: 'positive' | 'negative' | 'neutral'
  businessValue: string
  className?: string
}

export function MetricCard({
  metric,
  before,
  after,
  change,
  trend = 'neutral',
  businessValue,
  className
}: MetricCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <div className="mb-4">
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {metric}
        </div>
        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold text-foreground">
            {after}
          </div>
          {change && (
            <div
              className={cn(
                "text-sm font-semibold",
                trend === 'positive' && 'text-green-600',
                trend === 'negative' && 'text-red-600',
                trend === 'neutral' && 'text-gray-600'
              )}
            >
              {change}
            </div>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          From: {before}
        </div>
      </div>
      <div className="pt-3 border-t">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Business Value:</span>{' '}
          {businessValue}
        </p>
      </div>
    </div>
  )
}
