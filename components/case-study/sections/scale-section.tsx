import { ScaleSection } from '@/lib/types'

interface ScaleSectionProps {
  data: ScaleSection
}

export function ScaleSectionComponent({ data }: ScaleSectionProps) {
  return (
    <section id="scale" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Scale</h2>

      <div className="space-y-6 mb-12">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Technical Implementation */}
      <div className="rounded-lg border bg-card p-8 mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {data.technicalImplementation.title}
        </h3>
        <p className="text-muted-foreground mb-6">
          {data.technicalImplementation.description}
        </p>

        <div className="space-y-6">
          {data.technicalImplementation.components.map((component, index) => (
            <div key={index}>
              <h4 className="font-semibold text-foreground mb-1">{component.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
              <div className="flex flex-wrap gap-2">
                {component.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Details */}
      <h3 className="subsection-title">Architecture Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {data.architecture.map((arch, index) => (
          <div key={index} className="rounded-lg border bg-card p-6">
            <h4 className="font-semibold text-foreground mb-2">{arch.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{arch.description}</p>
            <ul className="space-y-1">
              {arch.details.map((detail, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      <h3 className="subsection-title">Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {data.performanceMetrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="text-sm text-muted-foreground mb-1">{metric.metric}</div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className="text-xs text-muted-foreground">{metric.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
