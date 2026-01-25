import type { NextStepsSection as NextStepsSectionType } from '@/lib/types'

export function NextStepsSection({ section }: { section: NextStepsSectionType }) {
  return (
    <section id="next" className="mb-16">
      <h2 className="text-3xl font-bold mb-6">Next Steps</h2>

      {/* Introduction */}
      <div className="mb-8">
        {section.introduction.map((paragraph, index) => (
          <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
        ))}
      </div>

      {/* Future Roadmap */}
      {section.futureRoadmap && section.futureRoadmap.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Future Roadmap</h3>
          <div className="space-y-6">
            {section.futureRoadmap.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-2">
                    Priority #{index + 1}
                  </span>
                  <h4 className="text-xl font-semibold text-gray-900">{item.priority}</h4>
                </div>
                <p className="text-gray-700 mb-4">{item.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Rationale:</p>
                    <p className="text-sm text-gray-700">{item.rationale}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded border border-green-200">
                    <p className="text-xs font-semibold text-green-900 mb-1">Expected Impact:</p>
                    <p className="text-sm text-green-800">{item.expectedImpact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Priorities */}
      {section.nextPriorities && section.nextPriorities.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Additional Priorities</h3>
          <ul className="space-y-3">
            {section.nextPriorities.map((priority, index) => (
              <li key={index} className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="mr-3 text-blue-500 font-semibold">{index + 1}.</span>
                <span className="text-gray-700">{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reflections */}
      {section.reflections && section.reflections.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4 text-purple-900">Forward-Thinking Reflections</h3>
          <div className="space-y-3">
            {section.reflections.map((reflection, index) => (
              <p key={index} className="text-gray-700 italic">"{reflection}"</p>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
