# Plan: Data Readiness README + Project Artefacts

## Context

The ShoppingCart project reached a significant milestone on 8 May 2026: the full 240-item ITEM_REGISTRY was built, label reconciliation was completed across all 10 categories, and basket assignments were auto-generated for 8 previously incomplete categories. This work involved non-trivial data engineering (fuzzy matching, 33 manual overrides, one new item added, 4 label fixes) that is currently only documented in memory files — not in the project repo itself. This plan captures the artefacts to persist and the README to tell that story.

---

## Deliverables

### 1. Plan file saved in project folder

**File:** `C:\MyApps\ShoppingCart\docs\plans\2026-05-08-registry-build.md`

Copy of this plan persisted in the project `docs/plans/` folder alongside the code.

### 2. Change log entry

**File:** `C:\MyApps\ShoppingCart\CHANGELOG.md`

Record of what changed in the 8 May 2026 session:
- Registry rebuilt from scratch via `build_registry.py`
- All 10 categories included (was 2)
- 33 manual label overrides applied
- VEG17 added as new item
- 4 Bakery label mismatches fixed
- Bug fixes: preselect schema, counter div ID string interpolation

### 3. Data Readiness README (outline)

**File:** `C:\MyApps\ShoppingCart\docs\DATA_READINESS.md`

---

## Data Readiness README Outline

### Title: Data Readiness: How Raw Research Data Became a Working Survey Registry

**1. Purpose**
- Why this document exists: the registry is the product of non-obvious data decisions; future maintainers need to understand those decisions
- Who it's for: researcher (Imogen), future developers, anyone picking this up later

**2. The Starting Point — Manual Approach and Survey Design**
- The researcher had a Qualtrics survey with all 10 product categories and approximately 240 items, each rendered as a checkbox
- Default (pre-selected) choices had been manually set for a small number of items in Bakery and Dairy only; the remaining 8 categories had no basket assignments
- The anticipated solution at that stage was to create three complete copies of the survey, one per basket condition, with the default selections hard-coded differently in each copy — a significant maintenance burden
- An accompanying Excel spreadsheet contained a "Final Label" column, but label text had not been systematically verified to match what Qualtrics actually rendered in the DOM; silent mismatches were present
- The spreadsheet had no per-item unique identifier; items were distinguished only by their row position within a category tab
- Healthy/unhealthy classification was indicated by cell background colour rather than a text value in any column, making it machine-unreadable
- There was no per-item category column; category membership was inferred from the tab name alone
- There was no basket assignment concept in the spreadsheet — basket membership existed only as a future intent to hard-code into separate survey copies
- The researcher had, however, discovered Qualtrics' JavaScript panel and, using AI assistance (Perplexity — Claude Sonnet 4.6 thinking), had written JS to provide a live-updating shopping basket displaying the count of selected items per category
- Work was under way to carry those selections forward into a checkout summary table showing final item choices

**3. Data Wrangling in Claude Code**
- What was brought into Claude Code: the above survey, Excel spreadsheet, and partial JS implementation
- What had to be solved: labels for 8 categories, basket assignments for all categories, a single-copy survey architecture
- The two data sources that didn't speak to each other: Excel spreadsheet (metadata, inconsistent labels, no IDs) vs Qualtrics DOM (rendered labels, no metadata linkage)

**4. The Label Problem**
- The core challenge: ITEM_REGISTRY keys must exactly match what Qualtrics renders in the DOM; any mismatch = silently broken preselection
- Why labels couldn't just be copied from Excel: the Label column was empty for 8 of 10 categories, and even populated columns had text inconsistencies against what Qualtrics rendered
- Why Qualtrics labels couldn't be used directly: no ItemID linkage to metadata (tag, health classification)
- The extraction tool: `export qualtrics labels via console.js` — how it works, when to rerun

**5. The Matching Strategy (build_registry.py)**
- Tier 1: Exact match on Final Label or Product Name (case-insensitive, trimmed)
- Tier 2: Fuzzy match using SequenceMatcher ≥85% threshold
- Tier 3: Manual OVERRIDES dict — human judgment for ambiguous cases
- Result: 176 auto-confirmed, 33 manual, 1 new item discovered

**6. The 33 Manual Overrides**
- Why each was needed (name divergence, brand vs generic, abbreviation)
- Breakdown by category (Drinks: 5, Snacks: 1, Meat Seafood: 2, Frozen: 3, Pantry: 2, Ready to eat: 2, Vegetables: 1)
- The one uncertain case: FRZ12 ("Chocolate icecream") — assigned by elimination, flagged for verification

**7. The Missing Item: VEG17**
- Qualtrics had 17 vegetables; Excel had 16 rows
- "Sweet potatoe" existed in Qualtrics with no Excel counterpart
- Decision: add as new item, tag healthy, assign to registry

**8. Basket Assignment for 8 New Categories**
- Approach: `assign_baskets()` in build_registry.py
- Deterministic randomisation (random.seed=42): 2 items per condition per category
- Special case: Snacks only had 3 healthy items → healthy_b gets 1
- All-healthy categories: Vegetables has no unhealthy items
- What this means for the study: researcher should review before production

**9. Pre-Existing Label Fixes (Bakery)**
- 4 label mismatches between baskets.csv and actual Qualtrics text
- Specific fixes listed: Bagel plain→Plain, Wholemeal roll→Roll, etc.
- Why this matters: one character difference = zero preselections for that item

**10. Known Risks & Open Items**
- FRZ12 label uncertainty (assigned by elimination)
- Basket assignments for 8 new categories not researcher-reviewed
- baskets tab in Excel not back-filled for 8 new categories
- `sec` variable key derivation not verified against actual Qualtrics question titles
- No end-to-end test done in Qualtrics preview

**11. Maintenance Workflow**
- When Qualtrics labels change → re-export → re-run build_registry.py
- When new items added → Excel first → re-export → re-run → add override if needed
- When basket assignments need changing → edit assign_baskets() or add post-call overrides

---

## Files Created

| File | Action |
|------|--------|
| `C:\MyApps\ShoppingCart\docs\plans\2026-05-08-registry-build.md` | This file |
| `C:\MyApps\ShoppingCart\CHANGELOG.md` | Created |
| `C:\MyApps\ShoppingCart\docs\DATA_READINESS.md` | Written by sub-agent from outline above |
