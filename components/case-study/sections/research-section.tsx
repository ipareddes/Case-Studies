import { ResearchInsightsSection } from '@/lib/types'
import { TabsSection } from '../tabs-section'
import { PersonaCard } from '../persona-card'

interface ResearchSectionProps {
  data: ResearchInsightsSection
}

export function ResearchSectionComponent({ data }: ResearchSectionProps) {
  const tabs = data.personas.map(persona => ({
    id: persona.id,
    label: persona.title,
    content: <PersonaCard persona={persona} />
  }))

  return (
    <section id="research" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Research & Insights</h2>

      <div className="space-y-6 mb-8">
        {data.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Research Methods (optional) */}
      {data.researchMethods && data.researchMethods.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Research Methods</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {data.researchMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-lg mb-2">{method.method}</h4>
                <p className="text-sm text-gray-600 mb-3">{method.participants}</p>
                {method.keyQuestions && method.keyQuestions.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Key Questions:</p>
                    <ul className="space-y-1">
                      {method.keyQuestions.map((question, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {question}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {method.findings && method.findings.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">Findings:</p>
                    <ul className="space-y-1">
                      {method.findings.map((finding, idx) => (
                        <li key={idx} className="text-sm text-gray-700">✓ {finding}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personas */}
      <TabsSection tabs={tabs} />

      {/* Key Insights (optional) */}
      {data.keyInsights && data.keyInsights.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Key Insights</h3>
          <div className="space-y-4">
            {data.keyInsights.map((insight, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">{insight.insight}</p>
                <p className="text-sm text-blue-800 mb-2"><span className="font-semibold">Evidence:</span> {insight.evidence}</p>
                <p className="text-sm text-blue-700"><span className="font-semibold">Implication:</span> {insight.implication}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Validation (optional) */}
      {data.validation && data.validation.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Validation</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.validation.map((val, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">{val.hypothesis}</p>
                <p className="text-xs text-gray-600 mb-1"><span className="font-semibold">Method:</span> {val.method}</p>
                <p className="text-xs text-green-700"><span className="font-semibold">Result:</span> {val.result}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
