import { cn } from '@/lib/cn'

interface FrameworkCardProps {
  name: string
  description: string
  howUsed: string
  className?: string
}

export function FrameworkCard({
  name,
  description,
  howUsed,
  className
}: FrameworkCardProps) {
  return (
    <div className={cn("rounded-lg border bg-card p-6", className)}>
      <h4 className="font-semibold text-lg text-foreground mb-2">{name}</h4>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="pt-3 border-t">
        <p className="text-xs font-semibold text-foreground mb-1">How We Used It</p>
        <p className="text-sm text-muted-foreground">{howUsed}</p>
      </div>
    </div>
  )
}
