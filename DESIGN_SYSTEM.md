# Design System Documentation

## Text Transform Styling

All text casing is controlled through CSS classes, not hardcoded in content. This allows for easy global updates to the design system.

### Available Classes

#### `.sentence-case`
Transforms text to sentence case: "This is a sentence"
```tsx
<h3 className="sentence-case">NO DIGITAL BUSINESS TOOLS</h3>
// Renders as: "No digital business tools"
```

#### `.title-case`
Transforms text to title case: "This Is A Title"
```tsx
<h3 className="title-case">core challenges for merchants</h3>
// Renders as: "Core Challenges For Merchants"
```

#### `.preserve-case`
Preserves original case from content (useful for acronyms, brands)
```tsx
<h3 className="preserve-case">POS System Integration</h3>
// Renders as: "POS System Integration" (exactly as written)
```

### Default Styling

The following elements have text-transform applied by default:

**Headings (Global):**
- **All `h1, h2, h3, h4, h5, h6`** → sentence case
- **`.section-title`** → sentence case ("Design process")
- **`.subsection-title`** → sentence case ("Core challenges")
- **`.card-title`** → sentence case ("Coffee shop owner")
- **`.card-title-small`** → sentence case ("Visual product grid")

**UI Components:**
- **`.tab-button`** → **title case** ("Transaction Efficiency", "Business Intelligence") - *Exception: tabs use title case for better scannability*
- **`.stat-label`** → sentence case ("Project duration", "Merchants")
- **`.metric-title`** → sentence case ("Average transaction time")
- **`.nav-link`** → sentence case ("Home", "Blog", "Case studies")
- **`.btn`** → sentence case (all buttons)
- **`.badge`** → sentence case (all badges/pills)
- **`.on-page-link`** → sentence case (table of contents links)

### Usage Examples

#### Standard Section Title
```tsx
// Data can be in any case
const section = {
  title: "DESIGN PROCESS"  // or "design process" or "Design Process"
}

// Component renders with .section-title class
<h2 className="section-title">{section.title}</h2>
// Always renders as: "Design Process"
```

#### Preserving Acronyms
```tsx
// When you need to preserve specific casing (acronyms, brands)
<h3 className="subsection-title preserve-case">
  Clip POS: iOS App Design
</h3>
// Renders as: "Clip POS: iOS App Design" (preserves POS and iOS)
```

#### Mixing Styles
```tsx
// Apply title-case, then override specific words
<h3 className="subsection-title">
  building the{' '}
  <span className="preserve-case">API</span>
  {' '}integration layer
</h3>
// Renders as: "Building The API Integration Layer"
```

### Updating the Design System

To change text styling globally:

1. **Edit `/app/globals.css`**
2. **Find the relevant class** (e.g., `.section-title`)
3. **Update `text-transform` property:**
   - `capitalize` = Title Case
   - `lowercase` = all lowercase
   - `uppercase` = ALL UPPERCASE
   - `none` = preserve original

Example: To make all section titles TITLE CASE instead:
```css
.section-title {
  @apply text-3xl font-bold tracking-tight text-foreground mb-8 pt-8;
  text-transform: capitalize; /* Change from lowercase */
}

/* Remove the ::first-letter rule if switching to capitalize */
```

Example: To make all section titles ALL CAPS:
```css
.section-title {
  @apply text-3xl font-bold tracking-tight text-foreground mb-8 pt-8;
  text-transform: uppercase;
}

/* Remove the ::first-letter rule */
```

### Best Practices

1. **Store data in natural case** - Don't worry about casing in data files
2. **Use CSS classes for styling** - Apply `.title-case`, `.sentence-case`, etc.
3. **Override for special cases** - Use `.preserve-case` for acronyms (POS, API, iOS, etc.)
4. **Test after changes** - Text transform can affect line breaks and layout

### Current Style Guide

As of this implementation:
- **Section titles** (h2): Sentence case ("Design process")
- **Subsection titles** (h3): Sentence case ("Core challenges")
- **Card titles** (h4): Sentence case ("Coffee shop owner")
- **Body text**: Original case (no transform)

**Why sentence case?**
- More readable and conversational
- Follows modern UI design patterns (Apple, Google, etc.)
- Less visual noise than title case
- Still maintains hierarchy through font size/weight

To change these globally, update the classes in `/app/globals.css`.
