import { ImpactSection } from '@/lib/types'
import { TabsSection } from '../tabs-section'

interface ImpactSectionProps {
  data: ImpactSection
}

export function ImpactSectionComponent({ data }: ImpactSectionProps) {
  const tabs = data.categories.map(category => ({
    id: category.id,
    label: category.title,
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">{category.description}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {category.metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.label}</div>
              {metric.change && (
                <div className={`metric-change ${metric.trend === 'positive' ? 'positive' : metric.trend === 'negative' ? 'negative' : ''}`}>
                  {metric.change}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Details */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3">Highlights</h4>
          <ul className="space-y-2">
            {category.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5">✓</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }))

  return (
    <section id="impact" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Impact</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      <TabsSection tabs={tabs} />
    </section>
  )
}
