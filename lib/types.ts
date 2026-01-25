// ========== CORE TYPES ==========

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  author: Author
  heroStats: HeroStat[]
  heroImage: string
  projectMetadata: ProjectMetadata

  // Updated 12-section structure
  overview: OverviewSection  // Enhanced with strategic context
  problem: ProblemSection
  process: DesignProcessSection  // NEW: Design methodology & approach
  research: ResearchInsightsSection  // Enhanced with research methods
  solution: SolutionSection
  features: FeaturesSection
  decisions: KeyDecisionsSection  // Renamed from challenges
  scale: DesignSystemScaleSection  // Enhanced with design system focus
  collaboration: CollaborationSection  // NEW: Cross-functional collaboration
  impact: BusinessImpactSection  // Merged from impact + results
  learnings: LearningsEvolutionSection  // Enhanced with growth narrative
  next?: NextStepsSection  // NEW: Optional future roadmap

  relatedStudies: RelatedStudy[]
}

export interface Author {
  name: string
  role: string
  initials: string
}

export interface HeroStat {
  value: string
  label: string
}

// ========== PROJECT METADATA (SIDEBAR) ==========

export interface ProjectMetadata {
  company: string
  companyLogo?: string
  overview: string
  sector: string
  teamSize: string
  location: string
  duration: string
  tools: string[]
}

// ========== OVERVIEW SECTION (Enhanced with strategic context) ==========

export interface OverviewSection {
  introduction: string[]
  myRole: string[]
  keyResponsibilities: string[]

  // NEW: Strategic business objectives
  strategicObjectives?: {
    objective: string
    businessGoal: string
    yourApproach: string
  }[]

  // NEW: Cross-functional collaborators
  collaborators?: {
    function: string  // "Product Management", "Engineering", "Sales"
    stakeholders: string[]
    collaborationType: string
  }[]

  // NEW: Project timeline
  timeline?: {
    phase: string
    duration: string
    keyMilestone: string
  }[]
}

// ========== PROBLEM SECTION ==========

export interface ProblemSection {
  introduction: string[]
  painPoints: PainPoint[]
  competitiveAnalysis: CompetitiveAnalysisCard[]
}

export interface PainPoint {
  title: string
  description: string
}

export interface CompetitiveAnalysisCard {
  company: string
  strengths: string[]
  weaknesses: string[]
  opportunity: string
}

// ========== DESIGN PROCESS SECTION (NEW) ==========

export interface DesignProcessSection {
  introduction: string[]

  // Design methodology (phases, activities, deliverables)
  methodology: {
    phase: string
    description: string
    activities: string[]
    deliverables: string[]
    duration?: string
  }[]

  // Frameworks used (JTBD, Design Sprints, etc.)
  frameworks?: {
    name: string
    description: string
    howUsed: string
  }[]

  // Collaboration model with each function
  collaborationModel?: {
    team: string
    role: string
    cadence: string
    keyActivities: string[]
  }[]
}

// ========== RESEARCH & INSIGHTS SECTION (Enhanced with methodology) ==========

export interface ResearchInsightsSection {
  introduction: string[]

  // NEW: Research methods used
  researchMethods?: {
    method: string  // "User interviews", "Analytics analysis"
    participants: string
    keyQuestions: string[]
    findings: string[]
  }[]

  // Existing personas structure
  personas: Persona[]

  // NEW: Key insights that drove design decisions
  keyInsights?: {
    insight: string
    evidence: string
    implication: string
  }[]

  // NEW: Validation of assumptions
  validation?: {
    hypothesis: string
    method: string
    result: string
  }[]
}

export interface Persona {
  id: string
  name: string
  title: string
  pain: string
  painPoints: string[]
  quote: string
  automationRule: AutomationRule
  metrics: PersonaMetric[]
}

export interface AutomationRule {
  trigger: string
  conditions: string[]
  actions: string[]
  result: string
}

export interface PersonaMetric {
  value: string
  label: string
  change?: string
}

// ========== SOLUTION SECTION ==========

export interface SolutionSection {
  introduction: string[]
  approach: string[]
  beforeAfter: BeforeAfter[]
  keyFeatures: string[]
}

export interface BeforeAfter {
  before: {
    title: string
    description: string
    painPoints: string[]
  }
  after: {
    title: string
    description: string
    benefits: string[]
  }
  imagePlaceholder?: string
}

// ========== FEATURES SECTION ==========

export interface FeaturesSection {
  introduction: string[]
  automationWorkflow: AutomationWorkflow
  personaFeatures: PersonaFeatures[]
  detailedFeatures?: DetailedFeature[]
}

export interface AutomationWorkflow {
  title: string
  description: string
  steps: WorkflowStep[]
  benefits: string[]
}

export interface WorkflowStep {
  number: number
  title: string
  description: string
  icon?: string
}

export interface PersonaFeatures {
  personaId: string
  personaName: string
  personaTitle: string
  jobToBeDone: string
  features: Feature[]
  impact: string
}

export interface Feature {
  title: string
  description: string
  solves: string[]
  benefits: string[]
}

export interface DetailedFeature {
  title: string
  description: string
  capabilities: string[]
  image?: string
}

// ========== DESIGN SYSTEM & SCALE SECTION (Enhanced) ==========

export interface DesignSystemScaleSection {
  introduction: string[]

  // Design system architecture
  designSystem?: {
    title: string
    description: string
    components: {
      name: string
      description: string
      reusability: string
    }[]
  }

  // Technical implementation
  technicalImplementation: TechnicalImplementation
  architecture: ArchitectureDetail[]
  performanceMetrics: PerformanceMetric[]

  // Scaling narrative (e.g., 10K to 250K users)
  scalingJourney?: {
    phase: string
    userCount: string
    challenges: string[]
    solutions: string[]
  }[]
}

export interface TechnicalImplementation {
  title: string
  description: string
  components: TechComponent[]
}

export interface TechComponent {
  name: string
  description: string
  technologies: string[]
}

export interface ArchitectureDetail {
  title: string
  description: string
  details: string[]
}

export interface PerformanceMetric {
  metric: string
  value: string
  description: string
}

// ========== BUSINESS IMPACT SECTION (Merged from Impact + Results) ==========

export interface BusinessImpactSection {
  introduction: string[]

  // Impact organized by category (Safety, Efficiency, Revenue, etc.)
  impactCategories: {
    category: string
    description: string
    metrics: {
      metric: string
      before: string
      after: string
      change: string
      trend: 'positive' | 'negative' | 'neutral'
      businessValue: string  // NEW: Explanation of business value
    }[]
    highlights: string[]

    // User testimonials within each category
    userTestimonial?: {
      quote: string
      author: string
      role: string
      company: string
    }
  }[]

  // Long-term sustainability and impact
  longTermImpact?: {
    area: string
    impact: string
    sustainability: string
  }[]
}

// ========== KEY DECISIONS & TRADE-OFFS SECTION (Restructured from Challenges) ==========

export interface KeyDecisionsSection {
  introduction: string[]

  // Major design decisions
  decisions: {
    decision: string
    context: string
    optionsConsidered: {
      option: string
      pros: string[]
      cons: string[]
    }[]
    chosenApproach: string
    rationale: string
    tradeoffs: string[]
    outcome: string
  }[]

  // Obstacles encountered (optional)
  obstacles?: {
    challenge: string
    solution: string
    learnings: string[]
  }[]
}

// ========== LEARNINGS & EVOLUTION SECTION (Enhanced with growth narrative) ==========

export interface LearningsEvolutionSection {
  introduction: string[]

  // What worked well
  whatWorkedWell?: {
    area: string
    approach: string
    why: string
    replicability: string
  }[]

  // What you'd do differently
  whatYoudDoDifferently?: {
    area: string
    whatHappened: string
    betterApproach: string
    lesson: string
  }[]

  // How this project shaped your design philosophy
  designPhilosophy?: {
    principle: string
    howThisProjectShapedIt: string
  }[]

  // Context-specific recommendations
  recommendations?: {
    context: string
    recommendation: string
    rationale: string
  }[]

  // Legacy key takeaways structure (for backward compatibility)
  keyTakeaways?: {
    title: string
    description: string
    impact: string
  }[]
}

// ========== CROSS-FUNCTIONAL COLLABORATION SECTION (NEW) ==========

export interface CollaborationSection {
  introduction: string[]

  // Collaboration by function
  functions: {
    team: string  // "Product Management", "Engineering", "Sales"
    keyPartners: {
      name: string
      role: string
    }[]
    collaborationModel: string
    keyActivities: string[]
    challenges?: string
    howYouInfluenced: string
    outcomes: string[]
  }[]

  // Stakeholder management journey
  stakeholderManagement?: {
    stakeholder: string
    initialAlignment: string  // "Low", "Medium", "High"
    strategy: string
    result: string
  }[]

  // Design advocacy initiatives
  designAdvocacy?: {
    initiative: string
    challenge: string
    approach: string
    impact: string
  }[]
}

// ========== NEXT STEPS SECTION (NEW - Optional) ==========

export interface NextStepsSection {
  introduction: string[]

  // Future roadmap
  futureRoadmap?: {
    priority: string
    description: string
    rationale: string
    expectedImpact: string
  }[]

  // What you'd tackle next
  nextPriorities?: string[]

  // Forward-thinking reflections
  reflections?: string[]
}

// ========== RELATED STUDIES ==========

export interface RelatedStudy {
  slug: string
  title: string
  description: string
  thumbnail?: string
  tags: string[]
}

// ========== NAVIGATION ==========

export interface Section {
  id: string
  title: string
}
