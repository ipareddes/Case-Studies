import { notFound } from 'next/navigation'
import { getCaseStudy, getAllCaseStudySlugs } from '@/lib/data/case-studies'
import { Header } from '@/components/layout/header'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { HeroSection } from '@/components/case-study/hero-section'
import { ProjectSidebar } from '@/components/case-study/project-sidebar'
import { OnThisPageNav } from '@/components/case-study/on-this-page-nav'
import { MobileNavigation } from '@/components/layout/mobile-navigation'
import { OverviewSectionComponent } from '@/components/case-study/sections/overview-section'
import { ProblemSectionComponent } from '@/components/case-study/sections/problem-section'
import { ResearchSectionComponent } from '@/components/case-study/sections/research-section'
import { SolutionSectionComponent } from '@/components/case-study/sections/solution-section'
import { FeaturesSectionComponent } from '@/components/case-study/sections/features-section'
import { ScaleSectionComponent } from '@/components/case-study/sections/scale-section'
import { ImpactSectionComponent } from '@/components/case-study/sections/impact-section'
import { ChallengesSectionComponent } from '@/components/case-study/sections/challenges-section'
import { LearningsSectionComponent } from '@/components/case-study/sections/learnings-section'
import { ResultsSectionComponent } from '@/components/case-study/sections/results-section'

// Generate static params for all case studies
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs()
  return slugs.map(slug => ({ slug }))
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudy(params.slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found'
    }
  }

  return {
    title: `${caseStudy.title} - ${caseStudy.author.name}`,
    description: caseStudy.subtitle,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudy(params.slug)

  if (!caseStudy) {
    notFound()
  }

  // Define sections for navigation
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'problem', title: 'Problem' },
    { id: 'research', title: 'Research' },
    { id: 'solution', title: 'Solution' },
    { id: 'features', title: 'Features' },
    { id: 'scale', title: 'Scale' },
    { id: 'impact', title: 'Impact' },
    { id: 'challenges', title: 'Challenges' },
    { id: 'learnings', title: 'Learnings' },
    { id: 'results', title: 'Results' },
  ]

  return (
    <>
      <Header />

      {/* Mobile Navigation */}
      <MobileNavigation sections={sections} />

      <main className="pt-32 lg:pt-32">
        {/* Breadcrumb */}
        <div className="max-w-[1400px] mx-auto px-4 mb-8 mt-20 lg:mt-0">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Case Studies' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <HeroSection
          title={caseStudy.title}
          author={caseStudy.author}
          stats={caseStudy.heroStats}
          image={caseStudy.heroImage}
        />

        {/* 3-Column Layout */}
        <div className="three-column-layout max-w-[1400px] mx-auto px-4 pb-24">
          {/* Left Sidebar - Project Details */}
          <ProjectSidebar metadata={caseStudy.projectMetadata} />

          {/* Main Content */}
          <div className="space-y-0">
            <OverviewSectionComponent data={caseStudy.overview} />
            <ProblemSectionComponent data={caseStudy.problem} />
            <ResearchSectionComponent data={caseStudy.research} />
            <SolutionSectionComponent data={caseStudy.solution} />
            <FeaturesSectionComponent data={caseStudy.features} />
            <ScaleSectionComponent data={caseStudy.scale} />
            <ImpactSectionComponent data={caseStudy.impact} />
            <ChallengesSectionComponent data={caseStudy.challenges} />
            <LearningsSectionComponent data={caseStudy.learnings} />
            <ResultsSectionComponent data={caseStudy.results} />
          </div>

          {/* Right Sidebar - On This Page Navigation */}
          <OnThisPageNav sections={sections} />
        </div>
      </main>
    </>
  )
}
