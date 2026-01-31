# Case Study Component Library

Complete reference for all reusable components in the case study system.

## Table of Contents

- [New Components](#new-components)
- [Layout Components](#layout-components)
- [Content Display Components](#content-display-components)
- [Interactive Components](#interactive-components)
- [Metric & Data Components](#metric--data-components)
- [Import Guide](#import-guide)

---

## New Components

These components were recently added to standardize common patterns:

### 1. Competitive Analysis Accordion

**File**: `competitive-analysis-accordion.tsx`

Displays competitive analysis with **accordion behavior** (only one competitor open at a time) to save vertical space.

**Props**:
```typescript
interface CompetitiveAnalysisAccordionProps {
  items: {
    company: string
    strengths: string[]
    weaknesses: string[]
    opportunity: string
  }[]
  className?: string
}
```

**Usage**:
```tsx
import { CompetitiveAnalysisAccordion } from '@/components/case-study'

<CompetitiveAnalysisAccordion
  items={[
    {
      company: "Square",
      strengths: ["Strong brand", "Feature-rich"],
      weaknesses: ["Expensive", "US-focused"],
      opportunity: "Build for emerging markets"
    }
  ]}
/>
```

**When to Use**:
- In Problem section for competitive analysis
- When you have 2+ competitors
- When vertical space is limited
- When you want only one item open at a time

**Visual**:
- Header shows "Competitor Analysis" and company name
- Green + icons for strengths
- Red - icons for weaknesses
- Blue highlight for opportunity

---

### 2. Decision Card

**File**: `decision-card.tsx`

Displays a design decision with context, options, pros/cons, rationale, and outcome.

**Props**:
```typescript
interface DecisionCardProps {
  decision: string
  context: string
  optionsConsidered: {
    option: string
    pros: string[]
    cons: string[]
  }[]
  chosenApproach: string
  rationale: string
  tradeoffs?: string[]
  outcome: string
  className?: string
}
```

**Usage**:
```tsx
import { DecisionCard } from '@/components/case-study'

<DecisionCard
  decision="Build horizontal platform before vertical specialization"
  context="Initial instinct was to specialize for restaurants first..."
  optionsConsidered={[
    {
      option: "Deep restaurant specialization",
      pros: ["Focused effort", "Clear differentiation"],
      cons: ["Smaller market", "Harder to expand"]
    }
  ]}
  chosenApproach="General platform first..."
  rationale="Platform value compounds..."
  tradeoffs={["Restaurant owners wanted more features initially"]}
  outcome="Correct decision. Reached 100K+ merchants."
/>
```

**When to Use**:
- In Key Decisions section
- When showing design trade-offs
- When you need to document complex decisions

**Visual**:
- Expandable card with chevron
- Gray cards for options with green/red pros/cons
- Blue highlight for chosen approach
- Amber highlight for trade-offs
- Green highlight for outcome

---

### 3. Metric Card

**File**: `metric-card.tsx`

Displays a single metric with before/after values, change percentage, and business value explanation.

**Props**:
```typescript
interface MetricCardProps {
  metric: string
  before: string
  after: string
  change?: string
  trend?: 'positive' | 'negative' | 'neutral'
  businessValue: string
  className?: string
}
```

**Usage**:
```tsx
import { MetricCard } from '@/components/case-study'

<MetricCard
  metric="Average Transaction Time"
  before="3.2 minutes"
  after="0.9 minutes"
  change="-72%"
  trend="positive"
  businessValue="Merchants can serve 40% more customers during rush hours."
/>
```

**When to Use**:
- In Business Impact section
- When showing before/after metrics
- When explaining business value of changes

**Visual**:
- Large after value (3xl font)
- Color-coded change percentage (green/red/gray)
- Small before value
- Separated business value explanation

---

### 4. Timeline Card

**File**: `timeline-card.tsx`

Displays a vertical timeline with phases, durations, and key milestones.

**Props**:
```typescript
interface TimelineCardProps {
  items: {
    phase: string
    duration: string
    keyMilestone: string
  }[]
  className?: string
}
```

**Usage**:
```tsx
import { TimelineCard } from '@/components/case-study'

<TimelineCard
  items={[
    {
      phase: "Research & Discovery",
      duration: "2 months",
      keyMilestone: "Identified platform opportunity through merchant shadowing"
    },
    {
      phase: "MVP Development",
      duration: "6 months",
      keyMilestone: "Launched inventory-powered checkout"
    }
  ]}
/>
```

**When to Use**:
- In Overview section for project timeline
- In Scale section for scaling journey
- When showing chronological progression

**Visual**:
- Vertical line connecting phases
- Accent-colored dots for each phase
- Phase name, duration, and milestone

---

### 5. Framework Card

**File**: `framework-card.tsx`

Displays a design framework or methodology with description and how it was used.

**Props**:
```typescript
interface FrameworkCardProps {
  name: string
  description: string
  howUsed: string
  className?: string
}
```

**Usage**:
```tsx
import { FrameworkCard } from '@/components/case-study'

<FrameworkCard
  name="Jobs to Be Done (JTBD)"
  description="Understanding functional and emotional jobs users are hiring a product to accomplish"
  howUsed="Structured research around merchant goals rather than feature requests."
/>
```

**When to Use**:
- In Design Process section
- When documenting methodologies
- When showing design approach

**Visual**:
- Card with title, description, and "How We Used It" section
- Border-top separator before usage

---

## Layout Components

### Header

Main site header with navigation.

**Usage**:
```tsx
import { Header } from '@/components/case-study'

<Header />
```

---

### Breadcrumb

Navigation breadcrumbs.

**Usage**:
```tsx
import { Breadcrumb } from '@/components/case-study'

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Case Studies' }
  ]}
/>
```

---

### Mobile Navigation

Mobile-specific navigation drawer.

**Usage**:
```tsx
import { MobileNavigation } from '@/components/case-study'

<MobileNavigation sections={sections} />
```

---

## Content Display Components

### Hero Section

Case study hero with title, author, stats, and image.

**Usage**:
```tsx
import { HeroSection } from '@/components/case-study'

<HeroSection
  title={caseStudy.title}
  author={caseStudy.author}
  stats={caseStudy.heroStats}
  image={caseStudy.heroImage}
/>
```

---

### Project Sidebar

Left sidebar showing project metadata.

**Usage**:
```tsx
import { ProjectSidebar } from '@/components/case-study'

<ProjectSidebar metadata={caseStudy.projectMetadata} />
```

---

### On This Page Navigation

Right sidebar with section navigation and scroll spy.

**Usage**:
```tsx
import { OnThisPageNav } from '@/components/case-study'

<OnThisPageNav sections={sections} />
```

---

### Persona Card

Displays a user persona with pain points, quote, automation rule, and metrics.

**Usage**:
```tsx
import { PersonaCard } from '@/components/case-study'

<PersonaCard persona={personaData} />
```

---

### Before/After Comparison

Side-by-side comparison of before and after states.

**Usage**:
```tsx
import { BeforeAfterComparison } from '@/components/case-study'

<BeforeAfterComparison
  beforeAfter={{
    before: {
      title: "Manual Process",
      description: "How it worked before",
      painPoints: ["Pain 1", "Pain 2"]
    },
    after: {
      title: "Automated Platform",
      description: "How it works now",
      benefits: ["Benefit 1", "Benefit 2"]
    }
  }}
/>
```

---

### Quote Callout

Highlighted quote from user or stakeholder.

**Usage**:
```tsx
import { QuoteCallout } from '@/components/case-study'

<QuoteCallout
  text="This platform saved us millions"
  author="John Doe"
  role="CEO, Company Inc"
/>
```

---

## Interactive Components

### Tabs Section

Content organized in tabs (used for personas, feature categories).

**Usage**:
```tsx
import { TabsSection } from '@/components/case-study'

<TabsSection
  tabs={[
    {
      id: "tab1",
      label: "Tab One",
      content: <div>Content here</div>
    }
  ]}
/>
```

**When to Use**:
- For 2-5 related items
- When users need to compare between items
- For personas in Research section

---

### Expandable Metric Card

Generic expandable card that allows multiple cards to be open simultaneously.

**Usage**:
```tsx
import { ExpandableMetricCard } from '@/components/case-study'

<ExpandableMetricCard
  header="Category"
  title="Item Title"
  content={<div>Any content</div>}
/>
```

**When to Use**:
- When multiple items can be open at once
- For learnings, obstacles, challenges
- When you need custom content structure

**Note**: For accordion behavior (only one open), use `CompetitiveAnalysisAccordion` or `DecisionCard`.

---

## Metric & Data Components

### Stat Card

Simple statistic display.

**Usage**:
```tsx
import { StatCard } from '@/components/case-study'

<StatCard
  value="72%"
  label="Improvement"
  change="-72%"
  trend="positive"
/>
```

---

### Metric Card

**See "New Components" section above for detailed documentation.**

---

## Import Guide

### Option 1: Named Imports (Recommended)

```typescript
import {
  HeroSection,
  ProjectSidebar,
  CompetitiveAnalysisAccordion,
  DecisionCard,
  MetricCard,
  TimelineCard
} from '@/components/case-study'
```

### Option 2: Individual Imports

```typescript
import { HeroSection } from '@/components/case-study/hero-section'
import { CompetitiveAnalysisAccordion } from '@/components/case-study/competitive-analysis-accordion'
```

### Option 3: Section Components

```typescript
import { OverviewSectionComponent } from '@/components/case-study/sections/overview-section'
import { ProblemSectionComponent } from '@/components/case-study/sections/problem-section'
```

---

## Component Selection Guide

```
What are you displaying?

├─ Competitive Analysis
│  └─ CompetitiveAnalysisAccordion
│
├─ Design Decision with Options
│  └─ DecisionCard
│
├─ Metric with Before/After
│  └─ MetricCard
│
├─ Project Timeline
│  └─ TimelineCard
│
├─ Design Framework/Methodology
│  └─ FrameworkCard
│
├─ User Personas
│  └─ TabsSection + PersonaCard
│
├─ Before/After Comparison
│  └─ BeforeAfterComparison
│
├─ User Quote
│  └─ QuoteCallout
│
├─ Simple Statistic
│  └─ StatCard
│
└─ Custom Expandable Content
   ├─ Single at a time → Custom accordion
   └─ Multiple open → ExpandableMetricCard
```

---

## Styling Guidelines

### Consistent Classes

All components use these standardized classes:

**Typography**:
- `section-title` - h2 section headings
- `subsection-title` - h3 subsection headings
- `body-text` - body paragraphs
- `card-title` - card headings

**Colors**:
- `text-foreground` - primary text
- `text-muted-foreground` - secondary text
- `text-accent` - accent highlights
- Green for positive/pros
- Red for negative/cons
- Blue for choices/selections
- Amber for warnings/trade-offs

**Spacing**:
- Sections: `mb-12 md:mb-16 lg:mb-24`
- Cards: `p-6`
- Grids: `gap-4` or `gap-6`

### Responsive Breakpoints

- `md:` - 768px (tablet)
- `lg:` - 1024px (desktop)

---

## Adding New Components

When creating a new reusable component:

1. **Create the component file** in `components/case-study/`
2. **Use TypeScript** with proper interfaces
3. **Add to index.ts** for easy importing
4. **Document here** with usage examples
5. **Test at all breakpoints**
6. **Use standardized classes** for consistency

---

## Component Checklist

When using components, ensure:

- [ ] Props match interface requirements
- [ ] Data structure is correct
- [ ] Optional props handled with `?`
- [ ] Component renders on mobile
- [ ] Styling is consistent
- [ ] Accessibility considered (keyboard nav, etc.)

---

**Related Documentation**:
- `CASE_STUDY_GUIDE.md` - Complete guide to building case studies
- `COMPONENT_QUICK_REFERENCE.md` - Quick lookup for component usage
- `MIGRATION_CHECKLIST.md` - Checklist for updating case studies

**Last Updated**: January 2026
