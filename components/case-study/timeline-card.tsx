import { cn } from '@/lib/cn'

interface TimelineItem {
  phase: string
  duration: string
  keyMilestone: string
}

interface TimelineCardProps {
  items: TimelineItem[]
  className?: string
}

export function TimelineCard({ items, className }: TimelineCardProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0"
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-0 w-4 h-4 -ml-[9px] rounded-full bg-accent border-4 border-background" />

          {/* Content */}
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h4 className="font-semibold text-foreground">{item.phase}</h4>
              <span className="text-xs text-muted-foreground">{item.duration}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.keyMilestone}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
