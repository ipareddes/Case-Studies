'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsSectionProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function TabsSection({ tabs, defaultTab, className }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={cn("w-full mb-16", className)}>
      {/* Tab List */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "tab-button",
              activeTab === tab.id && "active"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeContent}
      </div>
    </div>
  )
}
