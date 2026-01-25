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
import { ScrollToHash } from '@/components/case-study/scroll-to-hash'

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

  // Define sections for navigation (12-section structure)
  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'problem', title: 'Problem' },
    { id: 'process', title: 'Design Process' },
    { id: 'research', title: 'Research & Insights' },
    { id: 'solution', title: 'Solution' },
    { id: 'features', title: 'Features' },
    { id: 'decisions', title: 'Key Decisions' },
    { id: 'scale', title: 'Design System & Scale' },
    { id: 'collaboration', title: 'Collaboration' },
    { id: 'impact', title: 'Business Impact' },
    { id: 'learnings', title: 'Learnings' },
    ...(caseStudy.next ? [{ id: 'next', title: 'Next Steps' }] : []),
  ]

  return (
    <>
      <ScrollToHash />
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

          {/* Main Content - 12-section structure */}
          <div className="space-y-0">
            <OverviewSectionComponent data={caseStudy.overview} />
            <ProblemSectionComponent data={caseStudy.problem} />
            <DesignProcessSection section={caseStudy.process} />
            <ResearchSectionComponent data={caseStudy.research} />
            <SolutionSectionComponent data={caseStudy.solution} />
            <FeaturesSectionComponent data={caseStudy.features} />
            <KeyDecisionsSectionComponent data={caseStudy.decisions} />
            <ScaleSectionComponent data={caseStudy.scale} />
            <CollaborationSection section={caseStudy.collaboration} />
            <BusinessImpactSectionComponent data={caseStudy.impact} />
            <LearningsSectionComponent data={caseStudy.learnings} />
            {caseStudy.next && <NextStepsSection section={caseStudy.next} />}
          </div>

          {/* Right Sidebar - On This Page Navigation */}
          <OnThisPageNav sections={sections} />
        </div>
      </main>
    </>
  )
}
