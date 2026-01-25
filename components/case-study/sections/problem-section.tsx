import { ProblemSection } from '@/lib/types'
import { ExpandableMetricCard } from '../expandable-metric-card'

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
            <h4 className="text-lg font-semibold text-foreground mb-2">
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
      <div className="space-y-3 mb-8">
        {data.competitiveAnalysis.map((competitor, index) => (
          <ExpandableMetricCard
            key={index}
            header="Competitor Analysis"
            title={competitor.company}
            content={
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Strengths</div>
                  <ul className="space-y-1">
                    {competitor.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">+</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Weaknesses</div>
                  <ul className="space-y-1">
                    {competitor.weaknesses.map((weakness, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">-</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-sm font-semibold text-foreground mb-1">Our Opportunity</div>
                  <p className="text-sm text-muted-foreground">{competitor.opportunity}</p>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  )
}
