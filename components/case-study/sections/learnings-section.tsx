import { LearningsSection } from '@/lib/types'

interface LearningsSectionProps {
  data: LearningsSection
}

export function LearningsSectionComponent({ data }: LearningsSectionProps) {
  return (
    <section id="learnings" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Learnings</h2>

      <div className="space-y-6 mb-12">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="space-y-6 mb-12">
        {data.keyTakeaways.map((takeaway, index) => (
          <div key={index} className="rounded-lg border bg-card p-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {takeaway.title}
            </h3>
            <p className="text-muted-foreground mb-3">{takeaway.description}</p>
            <div className="pt-3 border-t">
              <div className="text-sm font-medium text-accent">{takeaway.impact}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <h3 className="subsection-title">Recommendations</h3>
      <ul className="space-y-3 mb-8">
        {data.recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-semibold mt-0.5">
              {index + 1}
            </span>
            <span className="text-muted-foreground">{recommendation}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
