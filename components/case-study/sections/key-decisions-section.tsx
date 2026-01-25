import { KeyDecisionsSection } from '@/lib/types'
import { ExpandableMetricCard } from '../expandable-metric-card'

interface KeyDecisionsSectionProps {
  data: KeyDecisionsSection
}

export function KeyDecisionsSectionComponent({ data }: KeyDecisionsSectionProps) {
  return (
    <section id="decisions" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Key Decisions & Trade-offs</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Major Design Decisions */}
      <div className="space-y-6 mb-12">
        {data.decisions.map((decision, index) => (
          <ExpandableMetricCard
            key={index}
            header="Decision"
            title={decision.decision}
            content={
              <div className="space-y-4">
                {/* Context */}
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Context</div>
                  <p className="text-sm text-muted-foreground">{decision.context}</p>
                </div>

                {/* Options Considered */}
                <div>
                  <div className="text-sm font-medium text-foreground mb-3">Options Considered</div>
                  <div className="space-y-4">
                    {decision.optionsConsidered.map((option, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-sm mb-3">{option.option}</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-green-700 mb-2">Pros:</p>
                            <ul className="space-y-1">
                              {option.pros.map((pro, i) => (
                                <li key={i} className="text-xs text-gray-700 flex items-start">
                                  <span className="text-green-600 mr-1">+</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-red-700 mb-2">Cons:</p>
                            <ul className="space-y-1">
                              {option.cons.map((con, i) => (
                                <li key={i} className="text-xs text-gray-700 flex items-start">
                                  <span className="text-red-600 mr-1">-</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chosen Approach */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-900 mb-2">Chosen Approach</div>
                  <p className="text-sm text-blue-800">{decision.chosenApproach}</p>
                </div>

                {/* Rationale */}
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Rationale</div>
                  <p className="text-sm text-muted-foreground">{decision.rationale}</p>
                </div>

                {/* Trade-offs */}
                {decision.tradeoffs && decision.tradeoffs.length > 0 && (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <div className="text-sm font-medium text-amber-900 mb-2">Trade-offs Accepted</div>
                    <ul className="space-y-1">
                      {decision.tradeoffs.map((tradeoff, idx) => (
                        <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                          <span className="mt-0.5">⚖️</span>
                          <span>{tradeoff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Outcome */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-900 mb-2">Outcome</div>
                  <p className="text-sm text-green-800">{decision.outcome}</p>
                </div>
              </div>
            }
          />
        ))}
      </div>

      {/* Obstacles (optional, legacy support) */}
      {data.obstacles && data.obstacles.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Challenges Overcome</h3>
          <div className="space-y-3">
            {data.obstacles.map((obstacle, index) => (
              <ExpandableMetricCard
                key={index}
                header="Challenge"
                title={obstacle.challenge}
                content={
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-foreground mb-2">Solution</div>
                      <p className="text-sm text-muted-foreground">{obstacle.solution}</p>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="text-sm font-medium text-foreground mb-2">Key Learnings</div>
                      <ul className="space-y-1">
                        {obstacle.learnings.map((learning, idx) => (
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
        </div>
      )}
    </section>
  )
}
