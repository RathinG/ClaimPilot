# Design Guidelines: AI-Powered Claims Processing System

## Design Approach

**System-Based Approach**: Drawing from Linear's clean efficiency, Stripe's professional data density, and modern enterprise SaaS patterns. This utility-focused application prioritizes workflow efficiency, data clarity, and trust signals for insurance professionals.

**Key Principles**:
- Information hierarchy over decoration
- Scannable data presentation
- Progressive disclosure for complex agent outputs
- Trust through transparency (showing AI reasoning)

---

## Typography

**Font Family**: Inter (via Google Fonts CDN)

**Hierarchy**:
- Page Titles: text-3xl font-semibold (Agent outputs, claim details)
- Section Headers: text-xl font-semibold (Agent names, status sections)
- Subsection Headers: text-base font-semibold (Coverage decision, fraud signals)
- Body Text: text-sm (Agent analysis, claim descriptions)
- Labels/Metadata: text-xs font-medium uppercase tracking-wide (Status badges, timestamps)
- Data Values: text-sm font-mono (Policy numbers, claim IDs, confidence scores)

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, and 8
- Tight spacing: p-2, gap-2 (within cards, between labels)
- Standard spacing: p-4, gap-4 (card padding, form fields)
- Section spacing: p-6, gap-6 (between major sections)
- Page-level spacing: p-8, gap-8 (main content areas)

**Grid System**:
- Main Dashboard: Two-column layout (sidebar 280px + main content)
- Claims List: Full-width table with fixed header
- Agent Output Cards: Single column stack, full-width expandable sections

**Container Widths**:
- Sidebar: w-70 (280px)
- Main content: max-w-7xl mx-auto
- Form inputs: max-w-2xl
- Agent cards: w-full within container

---

## Component Library

### Navigation & Structure

**Sidebar Navigation**:
- Fixed left sidebar with logo at top
- Navigation items with icons (Heroicons) and labels
- Active state: background fill + icon color change
- Section grouping: "Claims", "Analytics", "Settings"

**Top Bar**:
- Right-aligned: Search input, notifications bell icon, user avatar with dropdown
- Height: h-16
- Bottom border separator

### Claims Dashboard

**Claim Intake Form**:
- Vertical form layout with clear section breaks
- Input fields: Policy Number, VIN, Date/Time picker, Incident Description (textarea)
- Photo Upload Zone: Drag-and-drop area with preview thumbnails (4-6 image grid)
- Submit button: Full-width primary action

**Agent Output Cards** (5 cards, stacked vertically):
- Card structure: Collapsible header with agent icon + name + status badge
- Expanded state shows: Key findings list, confidence scores (progress bars), supporting evidence
- Visual indicators: Green checkmark (pass), yellow warning (flag), red alert (fraud signal)

**Coverage Verification Agent Card**:
- Decision badge (Covered/Not Covered/Partial)
- Policy clauses cited with expand/collapse for full text
- Coverage percentage bar if partial

**Evidence Summarization Agent Card**:
- Timeline visualization (vertical line with event markers)
- Entity extraction table (Person, Location, Time)
- Contradiction flags highlighted in amber

**Damage Understanding Agent Card**:
- Photo grid with damage annotations overlay
- Damaged parts list with severity indicators (Minor/Moderate/Severe)
- Impact angle diagram (simple directional indicator)

**Fraud Signal Agent Card**:
- Risk score (0-100 scale with color-coded meter)
- Signal list with confidence percentages
- Photo reuse detection with "match found" indicators

**Triage Brief Synthesis Card**:
- Routing recommendation badge (Fast-Track/Adjuster/SIU)
- Executive summary paragraph
- Action items checklist
- Combined confidence score

### Claims List View

**Table Structure**:
- Fixed header with sortable columns
- Columns: Claim ID, Policy Number, Date, Claimant, Status, Priority, Actions
- Row actions: View icon, expand inline preview
- Pagination footer

**Status Badges**:
- Compact pills with text: "New", "In Review", "Approved", "Flagged"
- Consistent badge styling across application

### Data Visualization Elements

**Progress Bars**: Horizontal bars for confidence scores (h-2 rounded)
**Meters/Gauges**: Circular or arc-style for risk scores
**Tags**: Small pills for entity types, damage categories
**Tooltips**: Hover explanations for technical terms (AI reasoning)

---

## Animations

**Minimal, Purpose-Driven**:
- Card expand/collapse: Smooth height transition (300ms)
- Loading states: Subtle pulse on skeleton screens
- Status changes: Brief highlight animation (500ms)
- NO scroll-triggered animations
- NO decorative hover effects beyond standard button states

---

## Icons

**Heroicons** (via CDN, outline style)
- Agent icons: shield-check, document-text, camera, exclamation-triangle, clipboard-document-check
- Navigation: home, chart-bar, cog-6-tooth
- Actions: eye, pencil-square, trash, download
- Status: check-circle, x-circle, clock

---

## Forms & Inputs

**Input Fields**:
- Border style with focus ring
- Labels above inputs (text-sm font-medium)
- Helper text below (text-xs)
- Error states with inline error messages

**File Upload**:
- Dashed border dropzone
- Preview thumbnails in grid (4 columns)
- Remove button overlay on hover

**Buttons**:
- Primary: Solid fill for main actions (Submit claim, Approve)
- Secondary: Outline for secondary actions (Cancel, Reset)
- Sizes: Standard (px-4 py-2), Large for primary CTAs (px-6 py-3)

---

## Accessibility

- Consistent focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation throughout (Tab order, Enter to expand cards)
- Form validation with screen-reader announcements
- High contrast ratios for all text (will be defined in color implementation)

---

## Images

**No Hero Section**: This is a B2B application dashboard - no marketing hero needed

**Contextual Images**:
- Vehicle damage photos: User-uploaded, displayed in 4-column grid within Damage Understanding Agent card
- Placeholder for claim evidence: Document icons for uploaded PDFs/reports
- Empty states: Simple illustrations for "No claims yet" states

---

## Page-Specific Layouts

**Dashboard (Main View)**:
1. Top bar (h-16)
2. Sidebar + Main content area split
3. Main content: Claim header (claim ID, date) → Agent cards stacked → Action buttons footer

**Claims List**:
1. Top bar
2. Sidebar + Main content
3. Main content: Filter bar → Table → Pagination

**New Claim Form**:
1. Top bar
2. Sidebar + Main content
3. Main content (max-w-2xl centered): Form title → Form sections → Submit area

This system prioritizes clarity, efficiency, and trust—essential for enterprise insurance workflows where accuracy and transparency drive user confidence.