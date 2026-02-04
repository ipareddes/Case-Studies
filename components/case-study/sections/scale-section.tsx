'use client'

import { Accordion } from "@ipareddes/ui-components";

import { DesignSystemScaleSection } from '@/lib/types'

interface ScaleSectionProps {
  data: DesignSystemScaleSection
}

export function ScaleSectionComponent({ data }: ScaleSectionProps) {
  // Create accordion items for Design System components
  const designSystemAccordion = data.designSystem?.components.map((component, index) => ({
    id: `design-system-${index}`,
    trigger: (
      <div>
        <h4 className="font-semibold text-foreground">{component.name}</h4>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{component.description}</p>
        <div className="pt-3 border-t bg-blue-50 p-3 rounded">
          <p className="text-sm text-blue-800"><span className="font-semibold">Reusability:</span> {component.reusability}</p>
        </div>
      </div>
    ),
    defaultOpen: index === 0
  })) || []

  // Create accordion items for Technical Implementation
  const technicalImplementationAccordion = data.technicalImplementation.components.map((component, index) => ({
    id: `tech-impl-${index}`,
    trigger: (
      <div>
        <h4 className="font-semibold text-foreground">{component.name}</h4>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">{component.description}</p>
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
    ),
    defaultOpen: index === 0
  }))

  // Create accordion items for Scaling Journey
  const scalingJourneyAccordion = data.scalingJourney?.map((phase, index) => ({
    id: `scaling-${index}`,
    trigger: (
      <div>
        <h4 className="font-semibold text-foreground">{phase.phase}</h4>
        <p className="text-sm text-muted-foreground">{phase.userCount}</p>
      </div>
    ),
    content: (
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Challenges:</p>
          <ul className="space-y-1">
            {phase.challenges.map((challenge, idx) => (
              <li key={idx} className="text-xs text-muted-foreground">• {challenge}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Solutions:</p>
          <ul className="space-y-1">
            {phase.solutions.map((solution, idx) => (
              <li key={idx} className="text-xs text-green-700">✓ {solution}</li>
            ))}
          </ul>
        </div>
      </div>
    ),
    defaultOpen: index === 0
  })) || []

  return (
    <section id="scale" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Design System & Scale</h2>

      <div className="space-y-6 mb-12">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Design System (optional) */}
      {data.designSystem && designSystemAccordion.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">{data.designSystem.title}</h3>
          <p className="text-muted-foreground mb-6">
            {data.designSystem.description}
          </p>
          <Accordion items={designSystemAccordion} />
        </div>
      )}

      {/* Technical Implementation */}
      {technicalImplementationAccordion.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">{data.technicalImplementation.title}</h3>
          <p className="text-muted-foreground mb-6">
            {data.technicalImplementation.description}
          </p>
          <Accordion items={technicalImplementationAccordion} />
        </div>
      )}

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

      {/* Scaling Journey (optional) */}
      {scalingJourneyAccordion.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">Scaling Journey</h3>
          <Accordion items={scalingJourneyAccordion} />
        </div>
      )}

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
