import { cn } from "@/lib/cn"

interface QuoteCalloutProps {
  text: string
  author: string
  role?: string
  className?: string
}

export function QuoteCallout({ text, author, role, className }: QuoteCalloutProps) {
  return (
    <div className={cn("quote", className)}>
      <p className="quote-text">&ldquo;{text}&rdquo;</p>
      <div className="quote-author">
        <strong>{author}</strong>
        {role && <span>, {role}</span>}
      </div>
    </div>
  )
}
