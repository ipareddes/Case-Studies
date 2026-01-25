import { LearningsEvolutionSection } from '@/lib/types'
import { Accordion } from '@/components/ui/accordion'

interface LearningsSectionProps {
  data: LearningsEvolutionSection
}

export function LearningsSectionComponent({ data }: LearningsSectionProps) {
  // Create accordion items for "What Worked Well"
  const whatWorkedWellAccordion = data.whatWorkedWell?.map((item, index) => ({
    id: `worked-well-${index}`,
    trigger: (
      <div>
        <h4 className="text-lg font-semibold text-foreground">{item.area}</h4>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground"><span className="font-semibold">Approach:</span> {item.approach}</p>
        <p className="text-sm text-muted-foreground"><span className="font-semibold">Why:</span> {item.why}</p>
        <div className="pt-3 border-t border-green-200 bg-green-50 p-3 rounded">
          <p className="text-sm text-green-800"><span className="font-semibold">Replicability:</span> {item.replicability}</p>
        </div>
      </div>
    ),
    defaultOpen: index === 0
  })) || []

  // Create accordion items for "What I'd Do Differently"
  const whatToDoDifferentlyAccordion = data.whatYoudDoDifferently?.map((item, index) => ({
    id: `differently-${index}`,
    trigger: (
      <div>
        <h4 className="text-lg font-semibold text-foreground">{item.area}</h4>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground"><span className="font-semibold">What happened:</span> {item.whatHappened}</p>
        <p className="text-sm text-muted-foreground"><span className="font-semibold">Better approach:</span> {item.betterApproach}</p>
        <div className="pt-3 border-t border-amber-200 bg-amber-50 p-3 rounded">
          <p className="text-sm text-amber-800"><span className="font-semibold">Lesson:</span> {item.lesson}</p>
        </div>
      </div>
    ),
    defaultOpen: index === 0
  })) || []

  return (
    <section id="learnings" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Learnings & evolution</h2>

      <div className="space-y-6 mb-12">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* What Worked Well - Accordion */}
      {whatWorkedWellAccordion.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">What worked well</h3>
          <Accordion items={whatWorkedWellAccordion} />
        </div>
      )}

      {/* What I'd Do Differently - Accordion */}
      {whatToDoDifferentlyAccordion.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">What I'd do differently</h3>
          <Accordion items={whatToDoDifferentlyAccordion} />
        </div>
      )}

      {/* Design Philosophy */}
      {data.designPhilosophy && data.designPhilosophy.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">How This Shaped My Design Philosophy</h3>
          <div className="space-y-4">
            {data.designPhilosophy.map((item, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold text-foreground mb-2">{item.principle}</h4>
                <p className="text-sm text-muted-foreground">{item.howThisProjectShapedIt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">Recommendations</h3>
          <div className="space-y-4">
            {data.recommendations.map((rec, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <div className="flex items-start gap-3 mb-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground mb-1">{rec.recommendation}</p>
                    <p className="text-xs text-muted-foreground mb-2"><span className="font-semibold">Context:</span> {rec.context}</p>
                  </div>
                </div>
                <div className="pl-9 pt-2 border-t">
                  <p className="text-xs text-muted-foreground"><span className="font-semibold">Rationale:</span> {rec.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legacy Key Takeaways (for backward compatibility) */}
      {data.keyTakeaways && data.keyTakeaways.length > 0 && (
        <div className="space-y-6">
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
      )}
    </section>
  )
}
