# Case Study Component Guide

This guide documents all reusable components, patterns, and best practices for building consistent case studies in the portfolio.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Data Structure](#data-structure)
- [Core Components](#core-components)
- [Section Components](#section-components)
- [Reusable UI Components](#reusable-ui-components)
- [Patterns & Best Practices](#patterns--best-practices)
- [Creating a New Case Study](#creating-a-new-case-study)

---

## Overview

All case studies follow a consistent 12-section structure:

1. **Overview** - Introduction, role, responsibilities, and strategic objectives
2. **Problem** - Pain points and competitive analysis
3. **Design Process** - Methodology, frameworks, and collaboration model
4. **Research & Insights** - Research methods, personas, and key insights
5. **Solution** - Approach, before/after comparisons, and key features
6. **Features** - Automation workflows and detailed feature breakdowns
7. **Key Decisions** - Major design decisions and trade-offs
8. **Design System & Scale** - Technical implementation and scaling journey
9. **Collaboration** - Cross-functional work and stakeholder management
10. **Business Impact** - Metrics organized by category with testimonials
11. **Learnings** - What worked well, what to improve, and philosophy
12. **Next Steps** (Optional) - Future roadmap and reflections

---

## File Structure

```
case-study-portfolio/
├── lib/
│   ├── types.ts                          # TypeScript interfaces
│   └── data/
│       ├── case-studies.ts               # Case study registry
│       ├── clip-case-study.ts            # Individual case study data
│       ├── numaris-case-study.ts
│       ├── mercadopago-case-study.ts
│       ├── gbm-case-study.ts
│       └── yalo-case-study.ts
│
├── components/
│   └── case-study/
│       ├── sections/                     # Section-level components
│       │   ├── overview-section.tsx
│       │   ├── problem-section.tsx
│       │   ├── design-process-section.tsx
│       │   ├── research-section.tsx
│       │   ├── solution-section.tsx
│       │   ├── features-section.tsx
│       │   ├── key-decisions-section.tsx
│       │   ├── scale-section.tsx
│       │   ├── collaboration-section.tsx
│       │   ├── business-impact-section.tsx
│       │   ├── learnings-section.tsx
│       │   └── next-steps-section.tsx
│       │
│       └── [reusable components]         # UI components
│           ├── competitive-analysis-accordion.tsx
│           ├── expandable-metric-card.tsx
│           ├── persona-card.tsx
│           ├── tabs-section.tsx
│           └── ...
│
└── app/
    └── case-study/
        └── [slug]/
            └── page.tsx                  # Case study page template
```

---

## Data Structure

### TypeScript Types

All case studies must conform to the `CaseStudy` interface defined in `lib/types.ts`. Key interfaces include:

```typescript
interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  author: Author
  heroStats: HeroStat[]
  heroImage: string
  projectMetadata: ProjectMetadata

  // 12 sections
  overview: OverviewSection
  problem: ProblemSection
  process: DesignProcessSection
  research: ResearchInsightsSection
  solution: SolutionSection
  features: FeaturesSection
  decisions: KeyDecisionsSection
  scale: DesignSystemScaleSection
  collaboration: CollaborationSection
  impact: BusinessImpactSection
  learnings: LearningsEvolutionSection
  next?: NextStepsSection  // Optional

  relatedStudies: RelatedStudy[]
}
```

**Full type definitions**: See `lib/types.ts` for complete interfaces.

---

## Core Components

### 1. Hero Section

**Component**: `components/case-study/hero-section.tsx`

Displays the case study title, author, hero image, and key stats.

**Props**:
```typescript
interface HeroSectionProps {
  title: string
  author: Author
  stats: HeroStat[]
  image: string
}
```

**Usage**:
```tsx
<HeroSection
  title={caseStudy.title}
  author={caseStudy.author}
  stats={caseStudy.heroStats}
  image={caseStudy.heroImage}
/>
```

---

### 2. Project Sidebar

**Component**: `components/case-study/project-sidebar.tsx`

Left sidebar showing project metadata (company, team size, tools, etc.).

**Props**:
```typescript
interface ProjectSidebarProps {
  metadata: ProjectMetadata
}
```

**Usage**:
```tsx
<ProjectSidebar metadata={caseStudy.projectMetadata} />
```

---

### 3. On This Page Navigation

**Component**: `components/case-study/on-this-page-nav.tsx`

Right sidebar with section navigation and scroll spy.

**Props**:
```typescript
interface OnThisPageNavProps {
  sections: Section[]
}
```

**Usage**:
```tsx
<OnThisPageNav sections={sections} />
```

---

## Section Components

Each section has a dedicated component that handles its layout and data display.

### 1. Overview Section

**Component**: `components/case-study/sections/overview-section.tsx`

**Data Structure**:
```typescript
interface OverviewSection {
  introduction: string[]
  myRole: string[]
  keyResponsibilities: string[]
  strategicObjectives?: {...}[]
  collaborators?: {...}[]
  timeline?: {...}[]
}
```

**Features**:
- Introduction paragraphs
- Role and responsibilities lists
- Strategic objectives cards (optional)
- Collaborators grid (optional)
- Project timeline (optional)

---

### 2. Problem Section

**Component**: `components/case-study/sections/problem-section.tsx`

**Data Structure**:
```typescript
interface ProblemSection {
  introduction: string[]
  painPoints: PainPoint[]
  competitiveAnalysis: CompetitiveAnalysisCard[]
}
```

**Features**:
- Introduction paragraphs
- Pain points grid (3-column layout)
- **Competitive analysis accordion** (NEW - only one open at a time)

**Competitive Analysis Component**:

Uses `CompetitiveAnalysisAccordion` which ensures only one competitor is expanded at a time.

```typescript
interface CompetitiveAnalysisItem {
  company: string
  strengths: string[]
  weaknesses: string[]
  opportunity: string
}
```

**Usage**:
```tsx
<CompetitiveAnalysisAccordion
  items={data.competitiveAnalysis}
  className="mb-8"
/>
```

---

### 3. Design Process Section

**Component**: `components/case-study/sections/design-process-section.tsx`

**Data Structure**:
```typescript
interface DesignProcessSection {
  introduction: string[]
  methodology: {...}[]
  frameworks?: {...}[]
  collaborationModel?: {...}[]
}
```

**Features**:
- Process methodology cards with phases, activities, deliverables
- Frameworks used (JTBD, Design Sprints, etc.)
- Collaboration model by team

---

### 4. Research & Insights Section

**Component**: `components/case-study/sections/research-section.tsx`

**Data Structure**:
```typescript
interface ResearchInsightsSection {
  introduction: string[]
  researchMethods?: {...}[]
  personas: Persona[]
  keyInsights?: {...}[]
  validation?: {...}[]
}
```

**Features**:
- Research methods grid (optional)
- **Persona tabs** using `TabsSection` component
- Key insights cards (optional)
- Validation results (optional)

**Personas**:

Each persona includes:
- Name, title, pain statement, pain points
- Quote
- Automation rule (trigger → conditions → actions → result)
- Metrics

Personas are displayed in tabs using the `TabsSection` component.

---

### 5. Solution Section

**Component**: `components/case-study/sections/solution-section.tsx`

**Data Structure**:
```typescript
interface SolutionSection {
  introduction: string[]
  approach: {...}[]
  beforeAfter: BeforeAfter[]
  keyFeatures: {...}[]
  images?: {...}[]
}
```

**Features**:
- Solution approach cards
- **Before/After comparisons** using `BeforeAfterComparison` component
- Key features list
- Solution images carousel (optional)

---

### 6. Features Section

**Component**: `components/case-study/sections/features-section.tsx`

**Data Structure**:
```typescript
interface FeaturesSection {
  introduction: string[]
  automationWorkflow: AutomationWorkflow
  personaFeatures: PersonaFeatures[]
  detailedFeatures?: DetailedFeature[]
}
```

**Features**:
- Automation workflow with numbered steps
- Persona-specific features (accordion or tabs)
- Detailed features grid (optional)

---

### 7. Key Decisions Section

**Component**: `components/case-study/sections/key-decisions-section.tsx`

**Data Structure**:
```typescript
interface KeyDecisionsSection {
  introduction: string[]
  decisions: {...}[]
  obstacles?: {...}[]
}
```

**Features**:
- Major design decisions with:
  - Context and options considered
  - Pros/cons for each option
  - Chosen approach and rationale
  - Trade-offs and outcomes
- Obstacles encountered (optional)

Each decision is displayed in an expandable card.

---

### 8. Design System & Scale Section

**Component**: `components/case-study/sections/scale-section.tsx`

**Data Structure**:
```typescript
interface DesignSystemScaleSection {
  introduction: string[]
  designSystem?: {...}
  technicalImplementation: TechnicalImplementation
  architecture: ArchitectureDetail[]
  performanceMetrics: PerformanceMetric[]
  scalingJourney?: {...}[]
}
```

**Features**:
- Design system components (optional)
- Technical implementation details
- Architecture patterns
- Performance metrics grid
- Scaling journey timeline (optional)

---

### 9. Collaboration Section

**Component**: `components/case-study/sections/collaboration-section.tsx`

**Data Structure**:
```typescript
interface CollaborationSection {
  introduction: string[]
  functions: {...}[]
  stakeholderManagement?: {...}[]
  designAdvocacy?: {...}[]
}
```

**Features**:
- Cross-functional collaboration cards
- Stakeholder management stories (optional)
- Design advocacy initiatives (optional)

---

### 10. Business Impact Section

**Component**: `components/case-study/sections/business-impact-section.tsx`

**Data Structure**:
```typescript
interface BusinessImpactSection {
  introduction: string[]
  impactCategories: {
    category: string
    description: string
    metrics: {...}[]
    highlights: string[]
    userTestimonial?: {...}
  }[]
  longTermImpact?: {...}[]
}
```

**Features**:
- Impact organized by category (Transaction Efficiency, Business Intelligence, etc.)
- Metrics with before/after/change/trend
- Business value explanation for each metric
- Highlights list
- User testimonial (optional)
- Long-term impact narrative (optional)

**Metric Card Structure**:
```typescript
{
  metric: string
  before: string
  after: string
  change: string  // e.g., "-72%", "+40%"
  trend: 'positive' | 'negative' | 'neutral'
  businessValue: string  // Explanation of impact
}
```

---

### 11. Learnings Section

**Component**: `components/case-study/sections/learnings-section.tsx`

**Data Structure**:
```typescript
interface LearningsEvolutionSection {
  introduction: string[]
  whatWorkedWell?: {...}[]
  whatYoudDoDifferently?: {...}[]
  designPhilosophy?: {...}[]
  recommendations?: {...}[]
  keyTakeaways?: {...}[]  // Legacy support
}
```

**Features**:
- What worked well (expandable cards)
- What to do differently (expandable cards)
- Design philosophy shaped by project
- Context-specific recommendations
- Key takeaways (legacy)

---

### 12. Next Steps Section (Optional)

**Component**: `components/case-study/sections/next-steps-section.tsx`

**Data Structure**:
```typescript
interface NextStepsSection {
  introduction: string[]
  futureRoadmap?: {...}[]
  nextPriorities?: string[]
  reflections?: string[]
}
```

**Features**:
- Future roadmap with priorities
- Next priorities list
- Forward-thinking reflections

---

## Reusable UI Components

### 1. Competitive Analysis Accordion

**Component**: `components/case-study/competitive-analysis-accordion.tsx`

**NEW**: Only allows one competitor to be open at a time to save vertical space.

**Props**:
```typescript
interface CompetitiveAnalysisAccordionProps {
  items: CompetitiveAnalysisItem[]
  className?: string
}

interface CompetitiveAnalysisItem {
  company: string
  strengths: string[]
  weaknesses: string[]
  opportunity: string
}
```

**Usage**:
```tsx
<CompetitiveAnalysisAccordion
  items={competitiveAnalysis}
  className="mb-8"
/>
```

**When to Use**:
- In the Problem section for competitive analysis
- When you have 2+ competitors to display
- When vertical space is a concern

---

### 2. Expandable Metric Card

**Component**: `components/case-study/expandable-metric-card.tsx`

Generic expandable card for any content.

**Props**:
```typescript
interface ExpandableMetricCardProps {
  header: string
  title: string
  content: React.ReactNode
  className?: string
}
```

**Usage**:
```tsx
<ExpandableMetricCard
  header="Design Decision"
  title="Platform vs Feature Thinking"
  content={
    <div>
      {/* Any React content */}
    </div>
  }
/>
```

**When to Use**:
- For single expandable items (not accordion behavior)
- In Key Decisions section
- In Learnings section
- When you need custom content structure

**Note**: This component allows multiple items to be open simultaneously. For accordion behavior (only one open), use `CompetitiveAnalysisAccordion` or create a custom accordion component.

---

### 3. Tabs Section

**Component**: `components/case-study/tabs-section.tsx`

Displays content in tabs (commonly used for personas).

**Props**:
```typescript
interface TabsSectionProps {
  tabs: {
    id: string
    label: string
    content: React.ReactNode
  }[]
}
```

**Usage**:
```tsx
<TabsSection
  tabs={personas.map(persona => ({
    id: persona.id,
    label: persona.title,
    content: <PersonaCard persona={persona} />
  }))}
/>
```

**When to Use**:
- For displaying personas in Research section
- When you have 2-5 items to switch between
- When all items are equally important

---

### 4. Persona Card

**Component**: `components/case-study/persona-card.tsx`

Displays a single persona with all details.

**Props**:
```typescript
interface PersonaCardProps {
  persona: Persona
}
```

**Usage**:
```tsx
<PersonaCard persona={personaData} />
```

**Displays**:
- Name, title, pain statement
- Pain points list
- Quote
- Automation rule (trigger → conditions → actions → result)
- Metrics grid

---

### 5. Before/After Comparison

**Component**: `components/case-study/before-after-comparison.tsx`

Side-by-side comparison of before and after states.

**Props**:
```typescript
interface BeforeAfterComparisonProps {
  beforeAfter: BeforeAfter
}
```

**Usage**:
```tsx
<BeforeAfterComparison beforeAfter={comparisonData} />
```

**When to Use**:
- In Solution section
- To show transformation clearly
- When you have clear before/after states

---

### 6. Quote Callout

**Component**: `components/case-study/quote-callout.tsx`

Highlighted quote from user or stakeholder.

**Props**:
```typescript
interface QuoteCalloutProps {
  quote: string
  author: string
  role: string
  company?: string
}
```

**Usage**:
```tsx
<QuoteCallout
  quote="This platform saved us $180M in operational costs."
  author="Maria Garcia"
  role="Fleet Director"
  company="TransLogistics Corp"
/>
```

**When to Use**:
- In Business Impact section
- After metrics to add human element
- To emphasize key insights

---

### 7. Stat Card

**Component**: `components/case-study/stat-card.tsx`

Display a single metric or statistic.

**Props**:
```typescript
interface StatCardProps {
  value: string
  label: string
  change?: string
  trend?: 'positive' | 'negative' | 'neutral'
}
```

**Usage**:
```tsx
<StatCard
  value="72%"
  label="Faster Transactions"
  change="-72%"
  trend="positive"
/>
```

---

## Patterns & Best Practices

### 1. Section Structure Pattern

All sections follow this consistent pattern:

```tsx
<section id="section-id" className="mb-12 md:mb-16 lg:mb-24">
  {/* Section Title */}
  <h2 className="section-title">Section Name</h2>

  {/* Introduction */}
  <div className="space-y-6 mb-8">
    {data.introduction.map((paragraph, index) => (
      <p key={index} className="body-text">
        {paragraph}
      </p>
    ))}
  </div>

  {/* Subsection */}
  <h3 className="subsection-title">Subsection Name</h3>

  {/* Content */}
  <div className="mb-8">
    {/* Section-specific content */}
  </div>
</section>
```

### 2. Typography Classes

Use these standardized classes for consistency:

- `section-title` - Main section headings (h2)
- `subsection-title` - Subsection headings (h3)
- `body-text` - Body paragraphs
- `card-title` - Card headings
- `card-title-small` - Smaller card headings

### 3. Spacing Pattern

Consistent spacing throughout:

- Sections: `mb-12 md:mb-16 lg:mb-24`
- Subsections: `mb-8` or `mb-12`
- Cards/Grids: `mb-8`
- Paragraphs: `space-y-6`

### 4. Grid Layouts

Common grid patterns:

```tsx
{/* 3-column grid for cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{/* 2-column grid for larger content */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

{/* Responsive grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### 5. Accordion vs Tabs vs Cards

**Use Accordion** when:
- You have 3+ items
- Vertical space is limited
- Only one should be viewed at a time
- Example: Competitive analysis, design decisions

**Use Tabs** when:
- You have 2-5 items
- All items are equally important
- Users will compare between items
- Example: Personas, feature categories

**Use Static Cards** when:
- You have 2-4 items
- All should be visible simultaneously
- Scanning is important
- Example: Pain points, key features

### 6. Optional Sections

Not all case studies need all subsections. Common optional elements:

- `strategicObjectives` in Overview
- `collaborators` in Overview
- `timeline` in Overview
- `researchMethods` in Research
- `keyInsights` in Research
- `validation` in Research
- `frameworks` in Design Process
- `designSystem` in Scale
- `scalingJourney` in Scale
- `stakeholderManagement` in Collaboration
- `designAdvocacy` in Collaboration
- `longTermImpact` in Business Impact
- `next` section (entire section)

**Best Practice**: Only include sections where you have meaningful content. Empty sections reduce impact.

---

## Creating a New Case Study

### Step 1: Create Data File

1. Create new file: `lib/data/your-project-case-study.ts`
2. Import types: `import { CaseStudy } from '../types'`
3. Export constant: `export const yourProjectCaseStudy: CaseStudy = { ... }`

### Step 2: Define Basic Info

```typescript
export const yourProjectCaseStudy: CaseStudy = {
  slug: 'your-project-slug',
  title: 'Project Title',
  subtitle: 'One-sentence description of the project',

  author: {
    name: 'Isaac Paredes',
    role: 'Lead Product Designer',
    initials: 'IP'
  },

  heroStats: [
    { value: '18 months', label: 'Project Duration' },
    { value: '100K+', label: 'Users' },
    { value: '72%', label: 'Key Metric' },
    { value: '$2B+', label: 'Business Impact' }
  ],

  heroImage: '/images/your-project-hero.png',

  projectMetadata: {
    company: 'Company Name',
    companyLogo: '/images/company/logo.png',
    productName: 'Product Name',
    overview: 'Brief project overview for sidebar',
    sector: 'Industry / Sector',
    teamSize: '12 (3 Designers, 6 Engineers, 2 PM, 1 QA)',
    location: 'Remote based in Mexico City',
    duration: '18 months (2022-2023)',
    tools: ['Figma', 'Miro', 'React', 'TypeScript']
  },

  // ... rest of sections
}
```

### Step 3: Fill in All 12 Sections

Work through each section following the patterns in `clip-case-study.ts`:

1. **Overview** - Start with introduction, role, responsibilities
2. **Problem** - Define pain points and competitive landscape
3. **Process** - Document your design methodology
4. **Research** - Create 2-3 personas with automation rules
5. **Solution** - Show before/after and key features
6. **Features** - Detail the features by persona
7. **Decisions** - Document 2-3 major design decisions
8. **Scale** - Technical implementation and metrics
9. **Collaboration** - How you worked across functions
10. **Impact** - Organize metrics by 3-4 categories
11. **Learnings** - What worked, what didn't, philosophy
12. **Next Steps** - Optional future roadmap

### Step 4: Register Case Study

Add to `lib/data/case-studies.ts`:

```typescript
import { yourProjectCaseStudy } from './your-project-case-study'

export const caseStudies: CaseStudy[] = [
  yourProjectCaseStudy,
  // ... other case studies
]
```

### Step 5: Test

1. Start dev server: `npm run dev`
2. Navigate to: `http://localhost:3004/case-study/your-project-slug`
3. Check all sections render correctly
4. Test mobile responsiveness
5. Verify all links and navigation work

---

## Component Decision Tree

When building a new section, use this decision tree:

```
Need to display competitive analysis?
├─ YES → Use CompetitiveAnalysisAccordion
└─ NO → Continue

Need to display personas?
├─ YES → Use TabsSection with PersonaCard
└─ NO → Continue

Need before/after comparison?
├─ YES → Use BeforeAfterComparison
└─ NO → Continue

Need expandable content?
├─ Multiple items, only one open? → Create custom accordion
├─ Multiple items, many open? → Use ExpandableMetricCard
└─ NO → Use static cards

Need to display metrics?
├─ Single metric → Use StatCard
├─ Multiple related metrics → Use impact metric grid
└─ Category-organized metrics → Follow Business Impact pattern

Still unsure?
└─ Check similar section in clip-case-study.ts for reference
```

---

## Maintenance Checklist

When updating components or patterns:

- [ ] Update this guide with new patterns
- [ ] Update TypeScript types in `lib/types.ts`
- [ ] Test changes in all case studies
- [ ] Ensure mobile responsiveness
- [ ] Update component examples
- [ ] Document any breaking changes

---

## Resources

- **Types Reference**: `lib/types.ts`
- **Example Case Study**: `lib/data/clip-case-study.ts`
- **Component Library**: `components/case-study/`
- **Design System**: `DESIGN_SYSTEM.md`

---

## Questions & Support

For questions about:
- **Data structure**: Check `lib/types.ts`
- **Component usage**: See examples in this guide
- **Styling**: See `DESIGN_SYSTEM.md`
- **Patterns**: Reference `clip-case-study.ts`

---

**Last Updated**: January 2026
**Maintainer**: Isaac Paredes
