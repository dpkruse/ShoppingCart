# Changelog

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
