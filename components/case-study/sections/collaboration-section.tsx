'use client'

import { Accordion } from "@ipareddes/ui-components";

import type { CollaborationSection as CollaborationSectionType } from '@/lib/types'

export function CollaborationSection({ section }: { section: CollaborationSectionType }) {
  // Create accordion items for teams/functions
  const teamAccordionItems = section.functions?.map((func, index) => ({
    id: `team-${index}`,
    trigger: (
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{func.team}</h3>
        <p className="text-sm text-gray-600">{func.collaborationModel}</p>
      </div>
    ),
    content: (
      <div className="space-y-4">
        {/* Key Partners */}
        {func.keyPartners && func.keyPartners.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Key partners:</h4>
            <div className="flex flex-wrap gap-2">
              {func.keyPartners.map((partner, idx) => (
                <span key={idx} className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                  {partner.name} • {partner.role}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Activities */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key activities:</h4>
          <ul className="space-y-1">
            {func.keyActivities.map((activity, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenge & Influence Strategy */}
        {func.challenges && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="text-sm font-semibold text-amber-900 mb-2">Challenge:</h4>
            <p className="text-sm text-amber-800 mb-3">{func.challenges}</p>
            <h4 className="text-sm font-semibold text-green-900 mb-2">How I influenced:</h4>
            <p className="text-sm text-green-800">{func.howYouInfluenced}</p>
          </div>
        )}

        {/* Outcomes */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="text-sm font-semibold text-green-900 mb-2">Outcomes:</h4>
          <ul className="space-y-1">
            {func.outcomes.map((outcome, idx) => (
              <li key={idx} className="text-sm text-green-800 flex items-start">
                <span className="mr-2">✓</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    defaultOpen: index === 0
  })) || []

  // Create accordion items for stakeholder management
  const stakeholderAccordionItems = section.stakeholderManagement?.map((stakeholder, index) => ({
    id: `stakeholder-${index}`,
    trigger: (
      <div className="flex items-center gap-3">
        <h4 className="font-semibold text-lg">{stakeholder.stakeholder}</h4>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          stakeholder.initialAlignment === 'High' ? 'bg-green-100 text-green-800' :
          stakeholder.initialAlignment === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          Initial: {stakeholder.initialAlignment}
        </span>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600"><span className="font-semibold">Strategy:</span> {stakeholder.strategy}</p>
        </div>
        <div className="p-3 bg-green-50 rounded border border-green-200">
          <p className="text-sm text-green-800"><span className="font-semibold">Result:</span> {stakeholder.result}</p>
        </div>
      </div>
    ),
    defaultOpen: index === 0
  })) || []

  return (
    <section id="collaboration" className="mb-12 md:mb-16 lg:mb-24">
      <h2 className="section-title">Cross-functional collaboration</h2>

      {/* Introduction */}
      <div className="space-y-6 mb-12">
        {section.introduction.map((paragraph, index) => (
          <p key={index} className="body-text">{paragraph}</p>
        ))}
      </div>

      {/* Teams/Functions Accordion */}
      {teamAccordionItems.length > 0 && (
        <div className="mb-12">
          <Accordion items={teamAccordionItems} />
        </div>
      )}

      {/* Stakeholder Management Accordion */}
      {stakeholderAccordionItems.length > 0 && (
        <div className="mb-12">
          <h3 className="subsection-title">Stakeholder management journey</h3>
          <Accordion items={stakeholderAccordionItems} />
        </div>
      )}

      {/* Design Advocacy */}
      {section.designAdvocacy && section.designAdvocacy.length > 0 && (
        <div>
          <h3 className="subsection-title">Design advocacy initiatives</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {section.designAdvocacy.map((initiative, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-2">{initiative.initiative}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Challenge:</p>
                    <p className="text-sm text-gray-700">{initiative.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-1">Approach:</p>
                    <p className="text-sm text-gray-700">{initiative.approach}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-xs font-semibold text-blue-900 mb-1">Impact:</p>
                    <p className="text-sm text-blue-800">{initiative.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
