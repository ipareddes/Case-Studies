import { ResultsSection } from '@/lib/types'
import { TabsSection } from '../tabs-section'
import { QuoteCallout } from '../quote-callout'

interface ResultsSectionProps {
  data: ResultsSection
}

export function ResultsSectionComponent({ data }: ResultsSectionProps) {
  const tabs = data.categories.map(category => ({
    id: category.id,
    label: category.title,
    content: (
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {category.metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-title">{metric.label}</div>
              {metric.change && (
                <div className="metric-change positive">{metric.change}</div>
              )}
              {metric.description && (
                <div className="text-xs text-muted-foreground mt-2">
                  {metric.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div>
          <h4 className="text-lg font-semibold text-foreground mb-3">Highlights</h4>
          <ul className="space-y-2">
            {category.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }))

  return (
    <section id="results" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Results</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      <TabsSection tabs={tabs} />

      {/* Quote */}
      {data.quote && (
        <div className="mt-12 mb-8">
          <QuoteCallout
            text={data.quote.text}
            author={data.quote.author}
            role={data.quote.role}
          />
        </div>
      )}
    </section>
  )
}
