import { OverviewSection } from '@/lib/types'

interface OverviewSectionProps {
  data: OverviewSection
}

export function OverviewSectionComponent({ data }: OverviewSectionProps) {
  return (
    <section id="overview" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Overview</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* My Role */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">My Role</h3>
          <ul className="space-y-2">
            {data.myRole.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Responsibilities */}
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Key Responsibilities
          </h3>
          <ul className="space-y-2">
            {data.keyResponsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
