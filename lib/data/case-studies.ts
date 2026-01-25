import { CaseStudy } from '../types'
import { numarisCaseStudy } from './numaris-case-study'
import { clipCaseStudy } from './clip-case-study'

// Registry of all case studies
export const caseStudies: CaseStudy[] = [
  clipCaseStudy,
  numarisCaseStudy,
]

// Get a single case study by slug
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find(cs => cs.slug === slug)
}

// Get all case study slugs (for static generation)
export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map(cs => cs.slug)
}

// Get case studies by tag (future feature)
export function getCaseStudiesByTag(tag: string): CaseStudy[] {
  return caseStudies.filter(cs =>
    cs.relatedStudies.some(rs => rs.tags.includes(tag))
  )
}

// Get related case studies (excluding current)
export function getRelatedCaseStudies(currentSlug: string, limit: number = 3): CaseStudy[] {
  return caseStudies
    .filter(cs => cs.slug !== currentSlug)
    .slice(0, limit)
}
