import { ChallengesSection } from '@/lib/types'
import { ExpandableMetricCard } from '../expandable-metric-card'

interface ChallengesSectionProps {
  data: ChallengesSection
}

export function ChallengesSectionComponent({ data }: ChallengesSectionProps) {
  return (
    <section id="challenges" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Challenges</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-3 mb-8">
        {data.challenges.map((challenge, index) => (
          <ExpandableMetricCard
            key={index}
            header="Challenge"
            title={challenge.title}
            content={
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">The Challenge</div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Our Solution</div>
                  <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                </div>
                <div className="pt-3 border-t">
                  <div className="text-sm font-medium text-foreground mb-2">Key Learnings</div>
                  <ul className="space-y-1">
                    {challenge.learnings.map((learning, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-0.5">→</span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  )
}
