import { BusinessImpactSection } from '@/lib/types'
import { TabsSection } from '../tabs-section'
import { QuoteCallout } from '../quote-callout'

interface BusinessImpactSectionProps {
  data: BusinessImpactSection
}

export function BusinessImpactSectionComponent({ data }: BusinessImpactSectionProps) {
  const tabs = data.impactCategories.map((category, index) => ({
    id: `impact-${index}`,
    label: category.category,
    content: (
      <div className="space-y-6">
        <p className="text-muted-foreground">{category.description}</p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {category.metrics.map((metric, index) => (
            <div key={index} className="rounded-lg border bg-card p-6">
              <div className="mb-4">
                <div className="text-sm font-medium text-muted-foreground mb-1">{metric.metric}</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl font-bold text-foreground">{metric.after}</div>
                  {metric.change && (
                    <div className={`text-sm font-semibold ${
                      metric.trend === 'positive' ? 'text-green-600' :
                      metric.trend === 'negative' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {metric.change}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  From: {metric.before}
                </div>
              </div>
              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Business Value:</span> {metric.businessValue}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        {category.highlights && category.highlights.length > 0 && (
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
        )}

        {/* User Testimonial */}
        {category.userTestimonial && (
          <div className="mt-6">
            <QuoteCallout
              text={category.userTestimonial.quote}
              author={category.userTestimonial.author}
              role={`${category.userTestimonial.role}, ${category.userTestimonial.company}`}
            />
          </div>
        )}
      </div>
    )
  }))

  return (
    <section id="impact" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Business Impact</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      <TabsSection tabs={tabs} />

      {/* Long-term Impact */}
      {data.longTermImpact && data.longTermImpact.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Long-term Impact & Sustainability</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.longTermImpact.map((item, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h4 className="font-semibold text-foreground mb-3">{item.area}</h4>
                <p className="text-sm text-muted-foreground mb-3">{item.impact}</p>
                <div className="pt-3 border-t">
                  <p className="text-xs font-semibold text-foreground mb-1">Sustainability:</p>
                  <p className="text-xs text-muted-foreground">{item.sustainability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
