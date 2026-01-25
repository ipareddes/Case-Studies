// ========== CORE TYPES ==========

export interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  author: Author
  heroStats: HeroStat[]
  heroImage: string
  projectMetadata: ProjectMetadata
  overview: OverviewSection
  problem: ProblemSection
  research: ResearchSection
  solution: SolutionSection
  features: FeaturesSection
  scale: ScaleSection
  impact: ImpactSection
  challenges: ChallengesSection
  learnings: LearningsSection
  results: ResultsSection
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

// ========== OVERVIEW SECTION ==========

export interface OverviewSection {
  myRole: string[]
  keyResponsibilities: string[]
  introduction: string[]
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

// ========== RESEARCH SECTION (JTBD) ==========

export interface ResearchSection {
  introduction: string[]
  personas: Persona[]
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

// ========== SCALE SECTION ==========

export interface ScaleSection {
  introduction: string[]
  technicalImplementation: TechnicalImplementation
  architecture: ArchitectureDetail[]
  performanceMetrics: PerformanceMetric[]
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

// ========== IMPACT SECTION ==========

export interface ImpactSection {
  introduction: string[]
  categories: ImpactCategory[]
}

export interface ImpactCategory {
  id: string
  title: string
  description: string
  metrics: ImpactMetric[]
  details: string[]
}

export interface ImpactMetric {
  value: string
  label: string
  change?: string
  trend?: 'positive' | 'negative' | 'neutral'
}

// ========== CHALLENGES SECTION ==========

export interface ChallengesSection {
  introduction: string[]
  challenges: Challenge[]
}

export interface Challenge {
  title: string
  description: string
  solution: string
  learnings: string[]
}

// ========== LEARNINGS SECTION ==========

export interface LearningsSection {
  introduction: string[]
  keyTakeaways: KeyTakeaway[]
  recommendations: string[]
}

export interface KeyTakeaway {
  title: string
  description: string
  impact: string
}

// ========== RESULTS SECTION ==========

export interface ResultsSection {
  introduction: string[]
  categories: ResultCategory[]
  quote?: Quote
}

export interface ResultCategory {
  id: string
  title: string
  metrics: ResultMetric[]
  highlights: string[]
}

export interface ResultMetric {
  value: string
  label: string
  change?: string
  description?: string
}

export interface Quote {
  text: string
  author: string
  role: string
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
