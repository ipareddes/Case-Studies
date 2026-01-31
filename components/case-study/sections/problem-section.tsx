import { ProblemSection } from '@/lib/types'
import { CompetitiveAnalysisAccordion } from '../competitive-analysis-accordion'

interface ProblemSectionProps {
  data: ProblemSection
}

export function ProblemSectionComponent({ data }: ProblemSectionProps) {
  return (
    <section id="problem" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Problem</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Pain Points */}
      <h3 className="subsection-title">Core Challenges</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {data.painPoints.map((point, index) => (
          <div key={index} className="rounded-lg border bg-card p-6">
            <h4 className="card-title-small mb-2">
              {point.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {point.description}
            </p>
          </div>
        ))}
      </div>

      {/* Competitive Analysis */}
      <h3 className="subsection-title">Competitive Analysis</h3>
      <CompetitiveAnalysisAccordion
        items={data.competitiveAnalysis}
        className="mb-8"
      />
    </section>
  )
}
