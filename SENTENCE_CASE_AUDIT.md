# Sentence Case Implementation Audit

## Summary
All text elements throughout the application now use sentence case by default. This is controlled through CSS in `/app/globals.css`.

### Exception: Tab Buttons
**Tab buttons use title case** (`text-transform: capitalize`) instead of sentence case for better scannability when switching between options. The tabs are displayed in a single horizontal row with scroll overflow.

**Design rationale:**
- Title case helps differentiate tab labels from body text
- Improves visual hierarchy and scannability
- Common pattern in modern UI (matches iOS/macOS system tabs)
- Horizontal scroll allows many tabs without wrapping

## Coverage

### ✅ Global Headings (Applied in @layer base)
```css
h1, h2, h3, h4, h5, h6 {
  text-transform: lowercase;
}
h1::first-letter, h2::first-letter, h3::first-letter, h4::first-letter, h5::first-letter, h6::first-letter {
  text-transform: uppercase;
}
```
**Affects:** All heading elements across all components

**Exceptions:**
- `.preserve-case` class can override (e.g., main hero title with "POS")

---

### ✅ Section Titles
- `.section-title` (h2 elements)
- `.subsection-title` (h3 elements)
- `.card-title` (large card titles)
- `.card-title-small` (small card titles)

**Examples:**
- "Design Process" → "Design process"
- "Core Challenges" → "Core challenges"
- "Coffee Shop Owner" → "Coffee shop owner"

---

### ✅ Navigation Components
- `.nav-link` - Main navigation links
- `.on-page-link` - Table of contents/sidebar navigation

**Examples:**
- "Case Studies" → "Case studies"
- "Research & Insights" → "Research & insights"
- "Design System & Scale" → "Design system & scale"

---

### ✅ Interactive Elements
- `.tab-button` - Tab switcher buttons (**EXCEPTION: Uses title case**)
- `.btn` - All button elements
- `.badge` - All badge/pill components

**Examples:**
- Tabs: "transaction efficiency" → "Transaction Efficiency" (title case for scannability)
- Buttons: "VIEW DETAILS" → "View details"
- Badges: "READ MORE" → "Read more"

---

### ✅ Labels & Metrics
- `.stat-label` - Stat card labels (e.g., hero stats)
- `.metric-title` - Metric card titles
- `.metric-value` - Preserved (numbers/values)

**Examples:**
- "Project Duration" → "Project duration"
- "Annual Processing" → "Annual processing"
- "Average Transaction Time" → "Average transaction time"

---

### ✅ Card Components
All card headings covered by global h1-h6 rule, plus:
- `.card-title` - Large card titles
- `.card-title-small` - Small card titles

---

## Implementation Details

### CSS Pattern Used
```css
.element {
  text-transform: lowercase;
}

.element::first-letter {
  text-transform: uppercase;
}
```

### Override Pattern (Preserve Case)
```css
.preserve-case {
  text-transform: none !important;
}

.preserve-case::first-letter {
  text-transform: none !important;
}
```

---

## Verification Checklist

Check these areas in the browser after refresh:

- [ ] Hero section title (should preserve case with `.preserve-case`)
- [ ] Hero stat labels ("Project duration", "Merchants", etc.)
- [ ] Section headings throughout case study
- [ ] Tab labels in tabbed sections
- [ ] Card titles in pain points, features, etc.
- [ ] Navigation links (top nav + sidebar "On this page")
- [ ] Button text
- [ ] Metric labels in cards
- [ ] Subsection headings

---

## Files Modified

1. `/app/globals.css` - All CSS rules for sentence case
2. `/components/case-study/hero-section.tsx` - Added `.preserve-case` to h1
3. `/DESIGN_SYSTEM.md` - Updated documentation

---

## Future Considerations

### When to Use `.preserve-case`
- Acronyms: POS, API, iOS, SDK, UI, UX
- Brand names: Clip, Numaris
- Proper nouns that require specific casing
- Main page titles where brand identity matters

### Example Usage
```tsx
<h1 className="preserve-case">Clip POS: From Payment to Platform</h1>
<h3 className="subsection-title">
  Building the <span className="preserve-case">API</span> integration layer
</h3>
```

---

## Testing

After deploying changes:
1. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Check all case study pages
3. Verify navigation elements
4. Check interactive components (tabs, buttons)
5. Verify stat/metric labels

---

## Maintenance

To change text casing globally in the future:

1. Edit `/app/globals.css`
2. Find the target class (e.g., `.section-title`)
3. Modify `text-transform` property
4. Rebuild and deploy

No need to change data files - styling is controlled by CSS.
