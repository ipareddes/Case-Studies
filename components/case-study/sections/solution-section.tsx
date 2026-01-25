import { SolutionSection } from '@/lib/types'
import { BeforeAfterComparison } from '../before-after-comparison'

interface SolutionSectionProps {
  data: SolutionSection
}

export function SolutionSectionComponent({ data }: SolutionSectionProps) {
  return (
    <section id="solution" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Solution</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Approach */}
      <h3 className="subsection-title">Our Approach</h3>
      <div className="space-y-4 mb-12">
        {data.approach.map((item, index) => (
          <p key={index} className="body-text">
            {item}
          </p>
        ))}
      </div>

      {/* Before/After Comparisons */}
      <h3 className="subsection-title">Transformation</h3>
      <div className="space-y-8">
        {data.beforeAfter.map((comparison, index) => (
          <BeforeAfterComparison key={index} data={comparison} />
        ))}
      </div>

      {/* Key Features */}
      <h3 className="subsection-title">Key Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {data.keyFeatures.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card px-4 py-3 text-sm font-medium text-foreground"
          >
            {feature}
          </div>
        ))}
      </div>
    </section>
  )
}
