# Changelog

## 2026-05-14 — Survey Intro Redesign, Back-Navigation State Restore, Summary Custom Buttons

### Added
- `survey intro question.html` — redesigned welcome/eligibility page for the survey intro question. Replaces plain paragraph text with a green hero banner, gold eligibility checklist (female / likes most foods / no allergies / not vegetarian), blue requirements panel (laptop, quiet room, phone silent), and a green "Ready?" call-to-action strip. All original content preserved. Paste into the HTML body of the intro question.
- `cart summary question.js` — JavaScript panel for the cart summary question. Hides native Previous/Next buttons and wires the custom Go Back and Submit buttons. Paste into the summary question JS panel.

### Changed
- `cart summary question.html` — replaced native navigation buttons with custom Go Back (grey, hover tooltip: "Your selections will be restored exactly as you left them") and Submit Survey (green) buttons
- `Q14 Bakery Question and loader.js` — native Previous button on shopping page now has a hover warning: "Going back will reset your cart and erase all your selections"

### Fixed
- **BUG: Going back from summary page wiped participant selections** — on back-navigation, Qualtrics reloaded the shopping page and re-fired `applyAllPreselections`, erasing all choices. Fix: `addOnPageSubmit` writes a `_selections_saved` flag; Q1 global scope reads this on load and sets `window._restoreFromEmbedded`; each category's `addOnReady` reads its saved `{sec}_labels` from embedded data and restores the exact checkboxes instead of applying preselections.
- **BUG: Custom Go Back button unclickable** — `<script>` tags inside Qualtrics question HTML bodies do not execute reliably; click handlers were never attached. Fix: moved all button JS to a dedicated `cart summary question.js` file for the question's JavaScript panel.

### Also added (14 May 2026 — styling and documentation)
- `qualtrics custom css.css` — saved working Look & Feel CSS with inline documentation. Sets survey content width to 900px (was 770px), forces question wrappers to fill that width, and gives each question a white card background to stand out against the `#DDF5CB` green page background. Paste into Look & Feel → Style → Custom CSS.
- `survey intro question.html` width constraint removed — now fills Qualtrics container width
- Early version history (V1–V4) appended to CHANGELOG
- Helper Scripts section added to README documenting `export qualtrics labels via console.js` and `consolidate_labels.py`

---

## 2026-05-13 — Cart Summary Fix, Custom Continue Button, Folder Cleanup

### Summary
Fixed the cart summary question showing pre-selected basket defaults instead of the participant's actual final choices. Replaced the native Qualtrics Next button with a custom sidebar Continue button that enforces the 30-item minimum. Cleaned up the repo root by moving 8 retired files to `archive/`. Created new documentation files.

### Added
- `cart summary question.html` — summary table HTML (paste into Qualtrics summary question body); was previously regenerated from scratch each session
- `docs/basket-build-process.md` — plain-English step-by-step guide for Imogen: edit baskets tab, run build, paste to Qualtrics, test
- `docs/session-handover-2026-05-13.md` — full session handover covering what's working, what's pending, all bug root causes and fixes
- `archive/README.md` — explains all retired files moved to archive and why

### Changed
- `condition question and item metada registry.js` — `applyAllPreselections` now explicitly syncs DOM (`$cb.prop("checked")`) after every `setChoiceValue()` call; radio change handler now checks `window._pageSubmitting` flag before firing to prevent rogue preselection during page submission
- `Q14 Bakery Question and loader.js` — native Next button hidden; custom `#cart-next-btn` sidebar button added (grey/inactive until 30 items, green/active at 30); `isChoiceSelected()` now reads DOM only (`$cb.prop("checked")`); `setEmbeddedData` removed from `updateDisplay()` (embedded data written only in `addOnPageSubmit`); `addOnPageSubmit` restored and sets `window._pageSubmitting = true`
- `Other categories 9 to 10 question.js` — same `isChoiceSelected` DOM fix; same `setEmbeddedData` removal; same `addOnPageSubmit` with `_pageSubmitting` flag
- `cart summary question.html` — grand total cell changed from hardcoded `—` to `${e://Field/total_items}`
- `README.md` — file structure updated; archive files removed; new docs files listed; deployment and workflow sections revised
- 8 retired files moved to `archive/` (see `archive/README.md`)

### Fixed
- **BUG: Cart summary showing preselection defaults instead of actual participant choices** — three root causes: (1) `Qualtrics.SurveyEngine.addOnNextButtonClick` not available in this Qualtrics version — TypeError halted Q14 script before `addOnPageSubmit` could register; (2) `getChoiceValue()` vs DOM split-brain — user clicks updated DOM but `getChoiceValue()` returned preselection state; (3) rogue `applyAllPreselections` during page submission — Qualtrics fires an internal radio `change` event during submit, triggering `applyAllPreselections` → `updateDisplay` → `setEmbeddedData(0)` milliseconds after `addOnPageSubmit` wrote correct values
- **BUG: 30-item minimum not enforced** — native Next button could not be intercepted reliably in this Qualtrics version; replaced with custom sidebar button
- **BUG: Summary grand total showing `—`** — piped text reference missing from HTML

### Open Items
- FRZ12 label ("Chocolate icecream") assigned by elimination — verify in Qualtrics preview
- `[DEBUG Submit]` console.log lines still in production JS (both Q14 and Other categories) — remove before live data collection
- Q1 JS not yet deployed to Imogen's live Qualtrics account (account timed out 9 May)
- No full end-to-end test (all 3 conditions, 30 items → summary) completed in live survey
- `sec` variable derived from question title text — verify all Q15–Q23 titles match expected values

---

## 2026-05-08 — Registry Build: All 10 Categories

### Summary
Full ITEM_REGISTRY rebuilt from scratch via `build_registry.py` to cover all 10 product categories (240 items). Previously only Bakery and Dairy (47 items) had basket assignments.

### Added
- `build_registry.py` — reads Excel master spreadsheet + Qualtrics label export; performs 3-tier label matching (exact, fuzzy, manual overrides); auto-assigns basket conditions for 8 new categories; outputs updated JS registry
- `docs/plans/2026-05-08-registry-build.md` — plan and outline for this session's deliverables
- `docs/DATA_READINESS.md` — narrative document explaining all data decisions from raw research inputs to working registry
- VEG17 "Sweet potatoe" — new item identified during reconciliation (present in Qualtrics, absent from Excel); tagged healthy

### Changed
- `condition question and item metada registry.js` — ITEM_REGISTRY rebuilt with correct preselect schema (`{healthy_a, healthy_b, unhealthy_a, unhealthy_b}` per item); all 10 categories included; 240 total items
- 4 Bakery label mismatches corrected to match Qualtrics DOM text:
  - "Bagel plain" → "Bagel Plain"
  - "Wholemeal roll" → "Wholemeal Roll"
  - "Wholemeal English Muffin" → "Wholemeal english muffin"
  - "Wholegrain Wrap" → "Wholemeal Wrap"

### Fixed
- **BUG: Pre-selections not firing** — ITEM_REGISTRY had nutritional fields in preselect schema instead of basket condition keys; replaced with correct schema
- **BUG: Only 2 of 10 categories in registry** — 8 categories had no basket assignments; resolved by building `build_registry.py` and processing all categories from Excel master
- **BUG: Counter div ID string interpolation** — both category JS files had `'<div id="counter-" + qid'` (literal text, not interpolated); fixed to `'<div id="counter-' + qid + '"'` in both files

### Label Reconciliation Summary
- 176 items auto-confirmed (exact or fuzzy match ≥85%)
- 33 items required manual override (see OVERRIDES dict in `build_registry.py`)
- 1 item added as new (VEG17)
- 4 items corrected in Bakery/Dairy (pre-existing mismatches from baskets.csv)

### Open Items
- FRZ12 label ("Chocolate icecream") assigned by elimination — verify against Qualtrics survey before production
- Basket assignments for 8 new categories (auto-assigned, seed=42) not yet reviewed by researcher
- baskets tab in Excel not back-filled with 8 new categories' assignments
- No end-to-end test in Qualtrics preview completed

---

## Early Version History (pre-changelog, reconstructed)

> The following versions were built before formal change tracking began. Recorded retrospectively for context.

---

## V4 — 7 May 2026 _(in testing at time of writing)_

Built on top of the working V3 codebase.

### Added
- Item metadata registry object (`ITEM_REGISTRY`) derived from spreadsheet — see `Combined Justification` tab in the master Excel file
- Three-condition basket model: Healthy / Neutral / Unhealthy pre-selections
- Registry build pipeline (`build_registry.py`) — spreadsheet → JS registry

### Notes
- Item label in the spreadsheet must match the Qualtrics-rendered label exactly for the registry lookup to work
- This was the version actively being debugged and refined in the May 2026 sessions

---

## V3 — 7 May 2026

### Added
- 30-item selection limit enforced across all categories
- Running cart total displayed to participant

---

## V2

### Fixed
- JavaScript errors present in V1
- Default (pre-selected) choices now appear correctly in full survey preview

### Added
- Cart summary page showing all selections at end of survey

---

## V2.1 — abandoned development branch

Attempted to reduce code duplication by moving shared JS logic into a single common location rather than repeating it across all 10 category questions. Hit Qualtrics JavaScript scoping issues that could not be resolved cleanly. Branch abandoned and reverted to V2.

> Note: the duplication would not have been necessary if the shopping basket had been built as one large question rather than 10 separate category questions.

---

## V1 — initial build

Initial working implementation of the online grocery shopping cart survey in Qualtrics.
