import { FeaturesSection } from '@/lib/types'
import { TabsSection } from '../tabs-section'
import { PersonaFeaturesCard } from '../persona-features-card'

interface FeaturesSectionProps {
  data: FeaturesSection
}

export function FeaturesSectionComponent({ data }: FeaturesSectionProps) {
  // Create tabs for each persona's features
  const personaTabs = data.personaFeatures.map(personaFeature => ({
    id: personaFeature.personaId,
    label: personaFeature.personaTitle,
    content: <PersonaFeaturesCard data={personaFeature} />
  }))

  return (
    <section id="features" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Features</h2>

      <div className="space-y-6 mb-12">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Automation Workflow Overview */}
      <div className="rounded-lg border bg-card p-8 mb-12">
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          {data.automationWorkflow.title}
        </h3>
        <p className="text-muted-foreground mb-8">
          {data.automationWorkflow.description}
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.automationWorkflow.steps.map((step) => (
            <div key={step.number} className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">
                {step.number}
              </div>
              <h4 className="font-semibold text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="pt-6 border-t">
          <h4 className="font-semibold text-foreground mb-3">Key Results</h4>
          <ul className="space-y-2">
            {data.automationWorkflow.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features by Persona - Connecting back to Jobs to Be Done */}
      <h3 className="subsection-title">Solutions for Each User</h3>
      <p className="body-text mb-8">
        Here's how we designed specific features to solve each persona's jobs from our research, creating a direct connection between user needs and product capabilities.
      </p>

      <TabsSection tabs={personaTabs} />
    </section>
  )
}
