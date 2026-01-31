# Case Study Migration Checklist

Use this checklist when updating case studies to match the standardized pattern established in the Clip case study.

## Pre-Migration

- [ ] Read `CASE_STUDY_GUIDE.md` to understand all patterns
- [ ] Review `clip-case-study.ts` as the reference implementation
- [ ] Backup current case study data file
- [ ] Note any custom components or patterns used

---

## Data Structure Audit

### Basic Information
- [ ] `slug` follows kebab-case pattern
- [ ] `title` is clear and descriptive
- [ ] `subtitle` is a single sentence with key value proposition
- [ ] `author` information is complete
- [ ] `heroStats` has 4 meaningful metrics
- [ ] `heroImage` path is correct and image exists
- [ ] `projectMetadata` is complete with all fields

### Section Completeness
- [ ] **Overview**: Has introduction, role, responsibilities
  - [ ] Optional: `strategicObjectives`
  - [ ] Optional: `collaborators`
  - [ ] Optional: `timeline`

- [ ] **Problem**: Has introduction, pain points, competitive analysis
  - [ ] Pain points: 3-4 items recommended
  - [ ] Competitive analysis: 2-4 competitors

- [ ] **Design Process**: Has introduction and methodology
  - [ ] Optional: `frameworks`
  - [ ] Optional: `collaborationModel`

- [ ] **Research**: Has introduction and personas
  - [ ] Optional: `researchMethods`
  - [ ] Optional: `keyInsights`
  - [ ] Optional: `validation`
  - [ ] Personas: 2-4 personas with full data

- [ ] **Solution**: Has introduction, approach, beforeAfter, keyFeatures
  - [ ] Before/After comparisons: 1-3 recommended
  - [ ] Optional: `images`

- [ ] **Features**: Has introduction, automationWorkflow, personaFeatures
  - [ ] Optional: `detailedFeatures`

- [ ] **Key Decisions**: Has introduction and decisions
  - [ ] Major decisions: 2-4 with full pros/cons analysis
  - [ ] Optional: `obstacles`

- [ ] **Scale**: Has introduction, technicalImplementation, architecture, performanceMetrics
  - [ ] Optional: `designSystem`
  - [ ] Optional: `scalingJourney`

- [ ] **Collaboration**: Has introduction and functions
  - [ ] Functions: 3-5 teams
  - [ ] Optional: `stakeholderManagement`
  - [ ] Optional: `designAdvocacy`

- [ ] **Business Impact**: Has introduction and impactCategories
  - [ ] Impact categories: 3-5 with metrics, highlights, and business value
  - [ ] Optional: `longTermImpact`
  - [ ] Optional: User testimonials in categories

- [ ] **Learnings**: Has introduction
  - [ ] Optional but recommended: `whatWorkedWell`
  - [ ] Optional but recommended: `whatYoudDoDifferently`
  - [ ] Optional: `designPhilosophy`
  - [ ] Optional: `recommendations`

- [ ] **Next Steps**: (Optional entire section)
  - [ ] If included: Has introduction
  - [ ] Optional: `futureRoadmap`
  - [ ] Optional: `nextPriorities`
  - [ ] Optional: `reflections`

---

## Component Migration

### Problem Section
- [ ] Replace individual `ExpandableMetricCard` with `CompetitiveAnalysisAccordion`
- [ ] Verify competitive analysis data structure matches:
  ```typescript
  {
    company: string
    strengths: string[]
    weaknesses: string[]
    opportunity: string
  }
  ```
- [ ] Test that only one competitor opens at a time
- [ ] Check mobile responsiveness

### Research Section
- [ ] Personas use `TabsSection` component
- [ ] Each persona has complete `automationRule` structure:
  ```typescript
  {
    trigger: string
    conditions: string[]
    actions: string[]
    result: string
  }
  ```
- [ ] Persona metrics are meaningful and formatted correctly
- [ ] Optional sections render conditionally

### Business Impact Section
- [ ] Impact organized by 3-5 categories
- [ ] Each metric has:
  - [ ] `metric`, `before`, `after`, `change`, `trend`
  - [ ] `businessValue` explanation (NEW - must add if missing)
- [ ] Highlights list for each category
- [ ] Optional testimonials formatted correctly

### All Sections
- [ ] Consistent section structure (id, title, content)
- [ ] Proper spacing classes applied
- [ ] Typography classes used consistently
- [ ] Optional subsections render conditionally
- [ ] No hardcoded content in components

---

## Content Quality

### Writing Quality
- [ ] Introduction paragraphs set clear context
- [ ] Pain points are specific and quantified when possible
- [ ] Metrics include business value explanation
- [ ] Personas feel authentic with real-world details
- [ ] Decisions show clear reasoning and trade-offs
- [ ] Learnings are actionable and honest

### Data Quality
- [ ] All metrics have meaningful change percentages
- [ ] Before/after comparisons show clear transformation
- [ ] Automation rules make logical sense
- [ ] Technical details are accurate
- [ ] Timelines and durations are consistent

### Consistency
- [ ] Tone matches other case studies
- [ ] Terminology is consistent throughout
- [ ] Company/product names used consistently
- [ ] Numbers and metrics are accurate across sections

---

## Visual Elements

### Images
- [ ] Hero image is high quality and relevant
- [ ] All image paths are correct
- [ ] Images exist in `public/images/` directory
- [ ] Image alt text would be meaningful (if implemented)
- [ ] Images are optimized for web

### Layout
- [ ] Grid layouts render properly at all breakpoints
- [ ] Cards have consistent styling
- [ ] Spacing is uniform throughout
- [ ] No content overflow issues

---

## Testing

### Functionality
- [ ] Navigate to case study: `/case-study/[slug]`
- [ ] All sections render without errors
- [ ] Navigation links work (both mobile and desktop)
- [ ] Accordions expand/collapse correctly
- [ ] Tabs switch content properly
- [ ] Expandable cards function as expected
- [ ] "On This Page" navigation highlights current section

### Responsive Design
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop viewport (1024px+)
- [ ] Mobile navigation works
- [ ] Grids stack properly on mobile
- [ ] Text is readable at all sizes
- [ ] No horizontal scrolling

### Content Display
- [ ] All text renders properly (no [object Object])
- [ ] Lists display correctly
- [ ] Metrics show with proper formatting
- [ ] Icons appear if used
- [ ] Colors match design system

### Performance
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Images load progressively
- [ ] Smooth scrolling to sections

---

## Documentation

- [ ] Case study registered in `case-studies.ts`
- [ ] File follows naming convention: `[project]-case-study.ts`
- [ ] TypeScript types are satisfied (no type errors)
- [ ] Comments added for any complex logic
- [ ] Related studies linked (if applicable)

---

## Launch Checklist

### Pre-Launch
- [ ] All checklist items above completed
- [ ] Peer review completed
- [ ] Content proofread for typos/grammar
- [ ] Images optimized and compressed
- [ ] Mobile experience tested thoroughly

### Launch
- [ ] Case study accessible at correct URL
- [ ] Appears in case study list/homepage
- [ ] Navigation from other pages works
- [ ] SEO metadata correct (title, description)
- [ ] Social sharing preview looks good

### Post-Launch
- [ ] Monitor for any errors in production
- [ ] Collect feedback from viewers
- [ ] Update guide if new patterns discovered
- [ ] Cross-link with related case studies

---

## Common Migration Issues

### Issue: Competitive Analysis Not Accordion
**Problem**: Using old `ExpandableMetricCard` individually
**Solution**: Replace with `CompetitiveAnalysisAccordion` component
**Reference**: See Problem Section in `CASE_STUDY_GUIDE.md`

### Issue: Missing Business Value in Metrics
**Problem**: Metrics only show numbers without explanation
**Solution**: Add `businessValue` field to each metric explaining the impact
**Reference**: See Business Impact Section in `CASE_STUDY_GUIDE.md`

### Issue: Incomplete Persona Data
**Problem**: Personas missing automation rules or metrics
**Solution**: Add complete automation rule structure and meaningful metrics
**Reference**: See Research Section in `CASE_STUDY_GUIDE.md`

### Issue: Inconsistent Spacing
**Problem**: Sections have different spacing patterns
**Solution**: Use standardized spacing classes
**Reference**: See Patterns section in `CASE_STUDY_GUIDE.md`

### Issue: Optional Sections Not Conditional
**Problem**: Empty sections showing when no data
**Solution**: Add conditional rendering: `{data.field && <Component />}`
**Reference**: See Component patterns in guide

---

## Migration Order Recommendation

Recommended order for updating case studies:

1. **Start with data structure**
   - Ensure all required fields present
   - Add missing optional fields that have content
   - Remove empty optional fields

2. **Update Problem section**
   - Migrate to `CompetitiveAnalysisAccordion`
   - Verify data structure
   - Test accordion behavior

3. **Enhance Business Impact**
   - Add `businessValue` to all metrics
   - Organize into clear categories
   - Add testimonials if available

4. **Update Research section**
   - Ensure personas have complete automation rules
   - Verify metrics are meaningful
   - Test tabs functionality

5. **Review all other sections**
   - Ensure consistency
   - Add missing optional content
   - Remove empty optionals

6. **Test thoroughly**
   - All functionality
   - All breakpoints
   - All content displays

7. **Polish**
   - Proofread content
   - Optimize images
   - Final QA pass

---

## Case Study Status Tracker

Track which case studies have been updated:

### ✅ Completed
- [x] Clip POS Platform

### 🚧 In Progress
- [ ] Numaris Fleet Management
- [ ] MercadoPago
- [ ] GBM
- [ ] Yalo

### 📝 Notes
Document any case-study-specific issues or customizations here:

---

**Quick Links:**
- Main Guide: `CASE_STUDY_GUIDE.md`
- Quick Reference: `COMPONENT_QUICK_REFERENCE.md`
- Example: `lib/data/clip-case-study.ts`
