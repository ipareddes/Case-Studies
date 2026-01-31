# Component Quick Reference

Quick lookup for case study components and their usage.

## Import Paths

```typescript
// Section Components
import { OverviewSectionComponent } from '@/components/case-study/sections/overview-section'
import { ProblemSectionComponent } from '@/components/case-study/sections/problem-section'
import { DesignProcessSection } from '@/components/case-study/sections/design-process-section'
import { ResearchSectionComponent } from '@/components/case-study/sections/research-section'
import { SolutionSectionComponent } from '@/components/case-study/sections/solution-section'
import { FeaturesSectionComponent } from '@/components/case-study/sections/features-section'
import { KeyDecisionsSectionComponent } from '@/components/case-study/sections/key-decisions-section'
import { ScaleSectionComponent } from '@/components/case-study/sections/scale-section'
import { CollaborationSection } from '@/components/case-study/sections/collaboration-section'
import { BusinessImpactSectionComponent } from '@/components/case-study/sections/business-impact-section'
import { LearningsSectionComponent } from '@/components/case-study/sections/learnings-section'
import { NextStepsSection } from '@/components/case-study/sections/next-steps-section'

// UI Components
import { CompetitiveAnalysisAccordion } from '@/components/case-study/competitive-analysis-accordion'
import { ExpandableMetricCard } from '@/components/case-study/expandable-metric-card'
import { TabsSection } from '@/components/case-study/tabs-section'
import { PersonaCard } from '@/components/case-study/persona-card'
import { BeforeAfterComparison } from '@/components/case-study/before-after-comparison'
import { QuoteCallout } from '@/components/case-study/quote-callout'
import { StatCard } from '@/components/case-study/stat-card'
```

---

## Usage Cheat Sheet

### Competitive Analysis Accordion

```tsx
<CompetitiveAnalysisAccordion
  items={[
    {
      company: "Competitor Name",
      strengths: ["Strength 1", "Strength 2"],
      weaknesses: ["Weakness 1", "Weakness 2"],
      opportunity: "What we can do better"
    }
  ]}
/>
```

**Key Feature**: Only one item open at a time (accordion behavior)

---

### Expandable Metric Card

```tsx
<ExpandableMetricCard
  header="Category"
  title="Item Title"
  content={<div>Any React content</div>}
/>
```

**Key Feature**: Multiple items can be open simultaneously

---

### Tabs Section

```tsx
<TabsSection
  tabs={[
    {
      id: "tab1",
      label: "Tab Label",
      content: <div>Tab content</div>
    }
  ]}
/>
```

**Best For**: Personas, feature categories

---

### Persona Card

```tsx
<PersonaCard
  persona={{
    id: "persona-1",
    name: "John Doe",
    title: "Job Title",
    pain: "Main pain statement",
    painPoints: ["Pain 1", "Pain 2"],
    quote: "User quote",
    automationRule: {
      trigger: "When X happens",
      conditions: ["Condition 1"],
      actions: ["Action 1"],
      result: "Outcome achieved"
    },
    metrics: [
      { value: "72%", label: "Improvement", change: "-72%" }
    ]
  }}
/>
```

---

### Before/After Comparison

```tsx
<BeforeAfterComparison
  beforeAfter={{
    before: {
      title: "Old State",
      description: "How it was",
      painPoints: ["Pain 1", "Pain 2"]
    },
    after: {
      title: "New State",
      description: "How it is now",
      benefits: ["Benefit 1", "Benefit 2"]
    }
  }}
/>
```

---

### Quote Callout

```tsx
<QuoteCallout
  quote="This is what the user said"
  author="John Doe"
  role="CEO"
  company="Company Inc"
/>
```

---

### Stat Card

```tsx
<StatCard
  value="72%"
  label="Metric Name"
  change="-72%"
  trend="positive"
/>
```

---

## Common Patterns

### Section Header

```tsx
<section id="section-id" className="mb-12 md:mb-16 lg:mb-24">
  <h2 className="section-title">Section Title</h2>
  {/* content */}
</section>
```

### Introduction Paragraphs

```tsx
<div className="space-y-6 mb-8">
  {data.introduction.map((paragraph, index) => (
    <p key={index} className="body-text">{paragraph}</p>
  ))}
</div>
```

### Subsection

```tsx
<h3 className="subsection-title">Subsection Title</h3>
<div className="mb-8">
  {/* content */}
</div>
```

### 3-Column Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {items.map((item, index) => (
    <div key={index} className="rounded-lg border bg-card p-6">
      {/* card content */}
    </div>
  ))}
</div>
```

### 2-Column Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {items.map((item, index) => (
    <div key={index}>
      {/* content */}
    </div>
  ))}
</div>
```

---

## Typography Classes

| Class | Usage | Element |
|-------|-------|---------|
| `section-title` | Main section headings | `<h2>` |
| `subsection-title` | Subsection headings | `<h3>` |
| `body-text` | Body paragraphs | `<p>` |
| `card-title` | Card main headings | `<h4>` |
| `card-title-small` | Smaller card headings | `<h4>` |

---

## Spacing Classes

| Context | Class | Usage |
|---------|-------|-------|
| Section bottom | `mb-12 md:mb-16 lg:mb-24` | After `</section>` |
| Subsection bottom | `mb-8` or `mb-12` | After subsection content |
| Card/Grid bottom | `mb-8` | After card grids |
| Paragraph spacing | `space-y-6` | Between paragraphs |
| Card padding | `p-6` | Inside cards |

---

## Decision Tree

```
What are you displaying?

├─ Competitive Analysis
│  └─ Use: CompetitiveAnalysisAccordion
│
├─ Personas
│  └─ Use: TabsSection + PersonaCard
│
├─ Before/After States
│  └─ Use: BeforeAfterComparison
│
├─ Expandable Content (one at a time)
│  └─ Use: Custom accordion or CompetitiveAnalysisAccordion pattern
│
├─ Expandable Content (multiple open)
│  └─ Use: ExpandableMetricCard
│
├─ Single Metric
│  └─ Use: StatCard
│
├─ User Quote
│  └─ Use: QuoteCallout
│
└─ Static Content
   └─ Use: Standard card markup
```

---

## File Template

```typescript
import { CaseStudy } from '../types'

export const projectCaseStudy: CaseStudy = {
  slug: 'project-slug',
  title: 'Project Title',
  subtitle: 'Brief description',

  author: {
    name: 'Isaac Paredes',
    role: 'Lead Product Designer',
    initials: 'IP'
  },

  heroStats: [
    { value: 'X months', label: 'Duration' },
    { value: 'X%', label: 'Key Metric' }
  ],

  heroImage: '/images/project-hero.png',

  projectMetadata: {
    company: 'Company',
    overview: 'Overview text',
    sector: 'Industry',
    teamSize: 'X people',
    location: 'Location',
    duration: 'Duration',
    tools: ['Tool1', 'Tool2']
  },

  overview: { /* ... */ },
  problem: { /* ... */ },
  process: { /* ... */ },
  research: { /* ... */ },
  solution: { /* ... */ },
  features: { /* ... */ },
  decisions: { /* ... */ },
  scale: { /* ... */ },
  collaboration: { /* ... */ },
  impact: { /* ... */ },
  learnings: { /* ... */ },

  relatedStudies: []
}
```

---

## Common Gotchas

1. **Accordion vs Expandable Card**
   - Accordion = only one open (use for competitive analysis)
   - Expandable Card = multiple open (use for decisions/learnings)

2. **Optional Fields**
   - Use `?` in TypeScript for optional fields
   - Check with `data.field && <Component />`

3. **Image Paths**
   - Store images in `public/images/`
   - Reference as `/images/filename.png`

4. **Section IDs**
   - Must match navigation IDs
   - Standard IDs: overview, problem, process, research, solution, features, decisions, scale, collaboration, impact, learnings, next

5. **Mobile Responsiveness**
   - Always use responsive grid classes
   - Test on mobile viewport
   - Common breakpoints: `md:` (768px), `lg:` (1024px)

---

## Testing Checklist

- [ ] All sections render without errors
- [ ] Navigation links work correctly
- [ ] Mobile layout looks good
- [ ] Images load properly
- [ ] Accordions/tabs function correctly
- [ ] Metrics display properly
- [ ] Typography is consistent
- [ ] Spacing is uniform

---

**For detailed explanations, see `CASE_STUDY_GUIDE.md`**
