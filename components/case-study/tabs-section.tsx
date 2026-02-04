'use client'

import { useState, useRef, useCallback, KeyboardEvent, useId } from 'react'
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
  ariaLabel?: string
}

export function TabsSection({ tabs, defaultTab, className, ariaLabel = "Content tabs" }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const uniqueId = useId()

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab)

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabCount = tabs.length
    let newIndex: number | null = null

    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault()
        newIndex = (index + 1) % tabCount
        break
      case 'ArrowLeft':
        e.preventDefault()
        newIndex = (index - 1 + tabCount) % tabCount
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = tabCount - 1
        break
    }

    if (newIndex !== null) {
      const newTab = tabs[newIndex]
      setActiveTab(newTab.id)
      tabRefs.current[newIndex]?.focus()
    }
  }, [tabs])

  return (
    <div className={cn("w-full mb-16", className)}>
      {/* Tab List */}
      <div
        className="tabs"
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id
          const tabId = `${uniqueId}-tab-${tab.id}`
          const panelId = `${uniqueId}-panel-${tab.id}`

          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[index] = el }}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "tab-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive && "active"
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div
        id={`${uniqueId}-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`${uniqueId}-tab-${activeTab}`}
        tabIndex={0}
        className="mt-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
      >
        {activeContent}
      </div>
    </div>
  )
}
