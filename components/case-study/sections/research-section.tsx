import { ResearchSection } from '@/lib/types'
import { TabsSection } from '../tabs-section'
import { PersonaCard } from '../persona-card'

interface ResearchSectionProps {
  data: ResearchSection
}

export function ResearchSectionComponent({ data }: ResearchSectionProps) {
  const tabs = data.personas.map(persona => ({
    id: persona.id,
    label: persona.title,
    content: <PersonaCard persona={persona} />
  }))

  return (
    <section id="research" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Research</h2>

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
