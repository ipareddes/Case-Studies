import { PersonaFeatures } from '@/lib/types'

interface PersonaFeaturesCardProps {
  data: PersonaFeatures
}

export function PersonaFeaturesCard({ data }: PersonaFeaturesCardProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-lg border bg-muted/50 p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {data.personaName} - {data.personaTitle}
        </h3>
        <p className="text-base text-muted-foreground italic">
          Job to Be Done: {data.jobToBeDone}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-6">
        {data.features.map((feature, index) => (
          <div key={index} className="rounded-lg border bg-card p-6">
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              {feature.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What it Solves */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">
                  Solves
                </div>
                <ul className="space-y-1">
                  {feature.solves.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-destructive mt-0.5">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <div className="text-sm font-medium text-foreground mb-2">
                  Benefits
                </div>
                <ul className="space-y-1">
                  {feature.benefits.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Impact Summary */}
      <div className="rounded-lg bg-accent/10 border border-accent/20 p-6">
        <div className="text-sm font-medium text-accent mb-2">Impact</div>
        <p className="text-sm text-foreground">{data.impact}</p>
      </div>
    </div>
  )
}
