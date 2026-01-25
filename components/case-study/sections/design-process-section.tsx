import type { DesignProcessSection as DesignProcessSectionType } from '@/lib/types'

export function DesignProcessSection({ section }: { section: DesignProcessSectionType }) {
  return (
    <section id="process" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Design process</h2>

      {/* Introduction */}
      <div className="space-y-6 mb-12">
        {section.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">{paragraph}</p>
        ))}
      </div>

      {/* Methodology Timeline */}
      {section.methodology && section.methodology.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">Methodology</h3>
          <div className="space-y-8">
            {section.methodology.map((phase, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-blue-200">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                <div className="mb-2">
                  <h4 className="text-xl font-semibold text-gray-900">{phase.phase}</h4>
                  {phase.duration && (
                    <span className="text-sm text-gray-500">{phase.duration}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{phase.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Activities */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-sm text-gray-700 mb-2">Activities</h5>
                    <ul className="space-y-1">
                      {phase.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="mr-2">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-sm text-blue-900 mb-2">Deliverables</h5>
                    <ul className="space-y-1">
                      {phase.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="text-sm text-blue-800 flex items-start">
                          <span className="mr-2">✓</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frameworks Used */}
      {section.frameworks && section.frameworks.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">Frameworks & methods</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.frameworks.map((framework, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-2">{framework.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{framework.description}</p>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-medium mb-1">How I used it:</p>
                  <p className="text-sm text-gray-700">{framework.howUsed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collaboration Model */}
      {section.collaborationModel && section.collaborationModel.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">Collaboration Model</h3>
          <div className="space-y-6">
            {section.collaborationModel.map((collab, index) => (
              <div key={index} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{collab.team}</h4>
                    <p className="text-sm text-gray-600">{collab.role} • {collab.cadence}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {collab.keyActivities.map((activity, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                      <span className="mr-2 text-blue-500">→</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
