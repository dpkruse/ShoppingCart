# Data Readiness: How Raw Research Data Was Engineered for the Shopping Cart Survey

**Document version:** May 2026 (updated 9 May 2026 — label column consolidation)
**Audience:** Imogen (researcher), future developers, survey maintainers

---

## 1. Purpose

This document explains how the raw research data underpinning the Shopping Cart Qualtrics survey was transformed into a form the survey could actually use. It exists because the transformation was not straightforward: the journey from a researcher's Excel spreadsheet to a functioning JavaScript registry involved label reconciliation, fuzzy matching, manual override decisions, and programmatic basket assignment logic — none of which is obvious from reading the final code. Without this record, anyone who inherits or revisits the survey would encounter the ITEM_REGISTRY and have no context for why it looks the way it does, why certain labels appear in unexpected forms, and where the basket assignments came from.

The document is intended for Imogen as a record of decisions made on her behalf during development, and for any future developer who needs to modify the survey, add new items, or understand why a specific item behaves unexpectedly.

---

## 2. The Starting Point — Manual Approach and Survey Design

When the project was brought into active development, the researcher (Imogen) had already built a functioning Qualtrics survey containing all 10 product categories and approximately 240 items rendered as multiple-choice checkbox questions. This represented a substantial amount of prior survey construction work.

Two of the ten categories — Bakery and Dairy — had default (pre-selected) choices manually configured within Qualtrics for some items, reflecting early basket assignment work. The remaining eight categories had no basket assignments at all. The anticipated solution at that point was to produce three complete copies of the entire survey, one per basket condition, with different default selections hard-coded into each copy. This approach would have been functional but created a significant ongoing maintenance burden: any change to item wording, addition of a new product, or revision to basket logic would require the same edit to be made three times across three separate survey instruments.

Alongside the Qualtrics survey, an Excel spreadsheet served as the master reference for item metadata. The spreadsheet was organised into tabs by category and contained columns for product information including a "Final Label" column intended to capture the display text used in the survey. However, this label column had only been populated for Bakery and Dairy; the remaining eight category tabs had empty Final Label columns, meaning there was no machine-readable record of what text Qualtrics was actually rendering for the majority of items. Even for Bakery and Dairy, where labels had been entered, the text had not been cross-checked against what Qualtrics rendered in the DOM, and silent discrepancies were present.

The spreadsheet had no per-item unique identifier field. Items were identified solely by their row position within a category tab, which made programmatic cross-referencing fragile. Health classification — whether an item was healthy or unhealthy — was encoded as cell background colour rather than as a text column, making it entirely unreadable by any automated process. No per-item category column existed; category membership was inferred only from which tab a row appeared in. The concept of basket assignment did not exist anywhere in the spreadsheet as structured data; it was carried only as a future intention to be realised through the three-copy survey approach.

Imogen had independently discovered Qualtrics' JavaScript panel and, using AI assistance (Perplexity, powered by Claude Sonnet 4.6 thinking mode), had written JavaScript to provide a live-updating shopping basket sidebar showing item selection counts per category. Work was already under way to carry those selections forward into a checkout summary table. This JavaScript foundation was a key enabler: it established that the survey could be driven by code rather than by hard-coded defaults, opening the door to a single-copy architecture with condition-based preselection handled at runtime.

---

## 3. Data Wrangling in Claude Code

The three artefacts brought into Claude Code were: the Qualtrics survey export (providing DOM-rendered label text), the Excel spreadsheet (providing item metadata, health classifications, and the two existing basket assignments), and the partial JavaScript implementation already in place. The engineering problem was to unite these into a single ITEM_REGISTRY object — a JavaScript dictionary keyed by exact item label text, where each entry carries the item's tag (e.g., "DRK1"), its health classification, its category key, and its basket assignments for all conditions.

The fundamental difficulty was that the two data sources could not be directly joined. The Excel spreadsheet held all the metadata but used inconsistent or absent label text. The Qualtrics DOM held the authoritative rendered labels (the strings that preselection logic must match exactly) but carried no metadata whatsoever. There was no shared key — no item ID, no normalised product name, no field present in both sources — that would allow a straightforward database-style join. Bridging these two sources required a multi-stage reconciliation pipeline rather than any simple lookup.

---

## 4. The Label Problem

The ITEM_REGISTRY operates on a strict constraint: every key in the registry must match character-for-character what Qualtrics renders in the survey DOM when a participant views the page. A single character difference — a trailing space, a difference in capitalisation, a curly apostrophe versus a straight one — causes the preselection logic to silently fail for that item. The participant sees the checkbox but it is not pre-checked, the basket summary is wrong, and the condition manipulation is broken. There is no error; it simply does not work.

This constraint made the Excel "Final Label" column unusable as a direct source of registry keys for two reasons. First, the column was empty for eight of the ten categories. Second, even for Bakery and Dairy where it had been populated, the text had been entered manually and had not been verified against the live survey; several entries diverged from what Qualtrics actually rendered.

The alternative — using only the Qualtrics-rendered labels — solved the accuracy problem but created a new one: those labels existed purely as display strings with no connection to any item's tag, health classification, or basket assignment. They could not be used as the sole data source.

The solution was a two-step process. First, a browser console script (`export qualtrics labels via console.js`) was written to be run in the developer console while a Qualtrics survey preview was open. This script walks the rendered DOM, finds every checkbox label within each question block, and exports the results as structured JSON. The output represents the ground truth of what Qualtrics is displaying — not what was intended, not what was entered in Excel, but what a participant's browser actually shows. Second, this extracted label data was fed into a matching pipeline (`build_registry.py`) alongside the Excel metadata, and the two were reconciled item by item.

---

## 5. The Matching Strategy (build_registry.py)

The `build_registry.py` script implements a three-tier matching strategy to reconcile Excel metadata rows against Qualtrics-rendered labels, handling the full spectrum from clean matches to cases where the two sources bear little obvious resemblance.

Tier 1 is an exact match: the script normalises both the Excel `Label` column (col D) value and the Qualtrics label by stripping leading and trailing whitespace and converting to lowercase, then tests for equality. Items that match at this tier are confirmed without any ambiguity.

Tier 2 is fuzzy matching using Python's built-in `SequenceMatcher` from the `difflib` module. For any Excel row that did not resolve in Tier 1, the script computes similarity scores against all unmatched Qualtrics labels and accepts a match if the highest score meets or exceeds an 85% similarity threshold. This tier captures cases where the two sources differ in minor but consistent ways — capitalisation differences, slight abbreviations, punctuation — without requiring a human to inspect every pair individually.

Tier 3 is a label overrides file. For cases where automated matching is not sufficiently confident, an external Excel file can be passed to the script via the `--overrides` flag. This file must contain a sheet named `label_overrides` with two columns — `ItemID` and `QualtricsLabel` — and any item listed there has its Qualtrics label set directly, bypassing Tiers 1 and 2 entirely. This approach deliberately keeps human judgment out of the script source code: override decisions are recorded in a versioned data file rather than embedded as a hard-coded dictionary. The overrides file can be updated, shared, and audited independently of the script.

The result of running the pipeline across all 240 items was 176 items resolved automatically through Tiers 1 and 2, 33 items requiring manual resolution via a label overrides file, and 1 item discovered in Qualtrics that had no Excel counterpart at all.

---

## 6. The 33 Manual Overrides

The 33 items that required manual resolution fell into several recognisable patterns. Some involved brand versus generic naming conventions, where the Excel spreadsheet used a generic descriptor and Qualtrics rendered a more specific product name, or vice versa. Others involved abbreviations that were too short for fuzzy matching to resolve reliably. A small number involved entirely different names for what could be confirmed as the same product through context and category position.

Each override is recorded in an external Excel overrides file (passed to `build_registry.py` via the `--overrides` flag) as a mapping from the ItemID to the correct Qualtrics label. The 33 overrides by category are as follows.

In Drinks (5 items): DRK1 maps "Natural spring water" from the Excel entry "Spring Water"; DRK2 maps "Lightly sparkling water" from "Sparkling Water"; DRK4 maps "Orange juice" from "Orange Juice No added Sugar"; DRK7 maps "Electrolyte sport drink" from "Sports Drink Flavoured"; DRK11 maps "Protein water berry" from "Protein Water Berry Whey Protein Isolate".

In Snacks (1 item): SNA17 maps "Chicken flavoured potato chips" from "chicken potato chips".

In Meat and Seafood (2 items): MEA2 maps "Steak" from "Beef sizzle steak" — a case where the Qualtrics label was substantially shorter and more generic than the Excel entry; MEA9 maps "Basa fillet" from "Basa".

In Frozen (3 items): FRZ12 maps "Chocolate icecream" from "Frozen Dessert Cones - Brownie" — this is the most uncertain override in the entire registry and is discussed further in Section 10; FRZ21 maps "Strawberry icecream (Connoisseur)" where the Excel row was empty; FRZ22 maps "Vanilla icecream (Connoisseur Classic Vanilla)" where the Excel row was also empty.

In Pantry (2 items): PAN18 maps "Red lentils dried" from "Red split lentils"; PAN26 maps "Beetroot canned" from "Beetroot".

In Ready to Eat (2 items): RTE2 maps "Green salad" from "Green salad bowl"; RTE18 maps "Meat pie" from "Beef cheese & bacon pie".

In Vegetables (1 item): VEG13 maps "Bok Choy" from "Asian choy pak".

---

## 7. The Missing Item: VEG17

During label reconciliation for the Vegetables category, the Qualtrics DOM export yielded 17 distinct vegetable labels while the corresponding Excel tab contained only 16 rows. The item "Sweet potatoe" — rendered with that spelling in Qualtrics — was present in the live survey but had no corresponding row in the spreadsheet. It was not a duplicate of any other vegetable entry and represented a genuinely untracked item.

The decision was made to include it in the registry rather than exclude it. Excluding it would mean the item exists in the survey for participants to select, could be selected as a basket assignment in theory, but would be invisible to the health scoring and basket logic — a worse outcome than including it with a reasonable classification. It was assigned the ItemID VEG17, classified as healthy (consistent with sweet potato as a whole food), and added to the registry. The "Sweet potatoe" spelling is preserved exactly as Qualtrics renders it, because that is what the DOM matching requires.

---

## 8. The 3-Condition Basket Model (May 2026)

### 8.1 Why the model changed

The original basket design used four conditions — healthy_a, healthy_b, unhealthy_a, unhealthy_b — each pre-selecting 2 items per category (20 items total, spread across 10 categories). This model required separate per-category assignment logic and left the eight non-Bakery/Dairy categories entirely without assignments.

In May 2026, Imogen defined a new cross-category basket design with three conditions reflecting the health composition of the default cart as a whole:

| Condition | Health composition | Items pre-selected |
|-----------|-------------------|-------------------|
| Healthy   | ~80% green items  | ~25 items across all 10 categories |
| Neutral   | ~50% green items  | ~26 items across all 10 categories |
| Unhealthy | ~20% green items  | ~27 items across all 10 categories |

This replaced the per-category 2-item model entirely. Items can now appear in multiple conditions (e.g., a neutral staple like "Cinnamon scroll" pre-checked in all three), and the basket is defined at the whole-survey level rather than category-by-category. The four old condition keys (healthy_a, healthy_b, unhealthy_a, unhealthy_b) are gone; the new keys are `healthy`, `neutral`, `unhealthy`.

### 8.2 The "default conditions" tab as source of truth

Imogen captured her basket decisions in a new tab in the master Excel file: `default conditions`. This tab has four columns. Column A contains researcher context notes (not used by any script). Columns B, C, and D each represent one condition (Healthy / Neutral / Unhealthy) and list the informal item names assigned to that condition — approximately 25–27 items per column.

The labels in this tab are written in natural language ("eggs", "lean mince meat", "banannas") rather than exact Qualtrics-rendered strings. They cannot be matched directly against the ITEM_REGISTRY keys; they must be resolved through the same fuzzy-matching pipeline used for label reconciliation.

![Default conditions tab — screenshot added 9 May 2026](../default%20choices%20for%20baskets%209.05.2026.png)

### 8.3 The `--populate-baskets` pipeline

A new mode was added to `build_registry.py` to translate the "default conditions" tab into structured basket assignments:

```
python build_registry.py --populate-baskets
```

What this does:

1. Calls `resolve_labels()` to build a lookup of resolved Qualtrics labels → ItemIDs for all 10 categories
2. Supplements this lookup with entries from `baskets.csv` for Bakery and Dairy, whose product names in Excel are too long and brand-heavy for fuzzy matching to work reliably
3. Reads columns B, C, D from the "default conditions" tab (column headers identified by first word: Healthy / Neutral / Unhealthy, case-insensitive)
4. For each item label in each condition column, fuzzy-matches against the lookup using a lower threshold (POPULATE_THRESHOLD = 0.65) appropriate for informal natural-language names
5. Prints all matches to the console for researcher review — including the matched ItemID, the score, and the Qualtrics label — so any questionable matches are visible
6. Clears the `baskets` sheet and writes 240+ rows with the header `ItemID | Category | Label | Tag | Healthy | Neutral | Unhealthy`, with `Y` in the condition columns for matched items
7. Saves the workbook

After `--populate-baskets` completes, the standard run (`python build_registry.py --overrides bakery_dairy_overrides.xlsx`) reads the updated baskets tab and regenerates the JS registry.

### 8.4 The `bakery_dairy_overrides.xlsx` file (now empty — historical note)

This file was originally auto-generated by `--populate-baskets` to supply Qualtrics-rendered labels for all 47 Bakery and Dairy items whose Excel product names were too long and brand-heavy for fuzzy matching to resolve. It was required as an `--overrides` argument for every standard build.

In May 2026 (label consolidation session), all label corrections previously held in this file were written directly into col D ("Label") of the relevant category tabs in the master Excel file. The `build_registry.py` script was updated to read col D for all 10 tabs as the primary label source (exact match on the `Label` column, not the old `Final label` column). After this change, the file was cleared to a header-only state.

The file is retained as an empty shell in case future items cannot be auto-matched. To use it, add `ItemID | QualtricsLabel` rows to the `label_overrides` sheet and run:

```
python build_registry.py --overrides bakery_dairy_overrides.xlsx
```

For standard builds, **no `--overrides` flag is needed**.

### 8.5 False positives from the first populate run (resolved)

The initial `--populate-baskets` run on 9 May 2026 produced two false positive basket assignments. Both were corrected by editing the `baskets` tab directly in the master Excel file:

- **DRK1 "Spring Water"** — Y marks cleared; "Tuna in springwater" (PAN21) correctly marked instead.
- **FRZ18 "Chocolate cake"** — Y marks cleared; "Chocolate flavoured cereal" (PAN item) correctly marked instead.

These corrections are now baked into the `baskets` tab. No further action required.

---

## 9. Label Consolidation (May 2026)

### 9.1 Pre-existing Bakery label fixes

When the Bakery basket assignments were first loaded, four items had label text that did not match what Qualtrics rendered in the DOM. These were pre-existing mismatches that had gone undetected because basket assignments had been set manually in Qualtrics and the spreadsheet label text had never been verified against the DOM.

The four corrections: "Bagel plain" → "Bagel Plain"; "Wholemeal roll" → "Wholemeal Roll"; "Wholemeal English Muffin" → "Wholemeal english muffin"; "Wholegrain Wrap" → "Wholemeal Wrap" (different word — confirmed same product by context and category position).

These corrections were originally held in `bakery_dairy_overrides.xlsx`. They are now written directly into col D of the Bakery tab in the master Excel file.

### 9.2 Full label consolidation

In May 2026, all 10 category tabs were consolidated to use a single `Label` column (col D) as the authoritative source of Qualtrics-rendered label text:

- **Bakery and Dairy** already had col D ("Label") populated, but with Title Case values that did not match Qualtrics sentence-case rendering. All 19 Bakery and 28 Dairy labels were corrected to sentence case.
- **The remaining 8 tabs** (Drinks, Snacks, Fruit, Meat Seafood, Freezer, Pantry, Ready to Eat, Vegetables) previously had an empty col D and a separate "Final label" column at col 13–16. All Final label values were moved to col D, stale values were corrected against the `qualtrics` tab, and the Final label columns were deleted.
- **Fruit**: all 20 items now have col D populated (previously only 7 of 20 had values).
- **Freezer**: FRZ12, FRZ21, and FRZ22 ice cream labels were populated from the `qualtrics` tab.

In total: 90 manual corrections applied, 149 Final label values moved to col D, 8 columns deleted.

`build_registry.py` was updated from detecting `'final' in header` to `header.strip() == 'label'` so all 10 tabs are now read identically. The standard build command is:

```
python build_registry.py
```

No `--overrides` flag is needed for standard builds.

---

## 10. Known Risks and Open Items

**FRZ12 — Chocolate icecream (high uncertainty).** The mapping of FRZ12 to the Qualtrics label "Chocolate icecream" was assigned by process of elimination rather than by positive identification. The Excel entry for FRZ12 was "Frozen Dessert Cones - Brownie", which does not clearly correspond to any single Qualtrics frozen item. After all other frozen items were matched, "Chocolate icecream" was the only unmatched Qualtrics label remaining, and FRZ12 was assigned to it on that basis. This is not a confirmed match. Before the survey is used in production, open the Qualtrics survey and inspect the Frozen category to confirm that "Chocolate icecream" is the correct rendered label for FRZ12. If it is not, correct col D for FRZ12 in the Freezer tab and rebuild: `python build_registry.py`.

**Updated JS not yet pasted into Q1.** As of 9 May 2026, the regenerated `condition question and item metada registry.js` has not been pasted into the Qualtrics Q1 JavaScript panel. Imogen's Qualtrics account timed out before this could be done. This must be completed before the survey is usable. See README → Deploying to Qualtrics.

**The `sec` variable depends on question title text.** The JavaScript code derives its internal category key (the `sec` variable, e.g., "frozen", "ready_to_eat") at runtime by parsing the Qualtrics question title text. If any question title is renamed in the Qualtrics survey builder, the derived key will no longer match the expected embedded data variable name and preselection for that category will break silently. Verify all 10 question titles match expected values after any Qualtrics edits.

**No end-to-end test has been completed.** The registry and preselection logic have been constructed and reviewed at the code level, but no full end-to-end test in Qualtrics preview mode has been run through all three basket conditions. All three conditions (healthy, neutral, unhealthy) should be tested before the survey goes live, with particular attention to FRZ12 and the sec variable risk above.

---

## 11. Maintenance Workflow

### Standard registry rebuild

The normal build command after any data change:

```
python build_registry.py
```

This reads the `qualtrics` tab (label text), all 10 category tabs (item metadata and col D labels), and the `baskets` tab (Y markers), then patches `condition question and item metada registry.js` with a fresh ITEM_REGISTRY. The resulting JS file is pasted into the Q1 Qualtrics JavaScript panel.

No `--overrides` flag is needed for standard builds — all label corrections live in col D of the category tabs.

### When basket assignments change

Edit the `Y` markers directly in the `baskets` tab of the Excel file (columns: `ItemID | Category | Label | Tag | Healthy | Neutral | Unhealthy`) and re-run the standard build. No code changes are required. This applies equally to all 10 categories — the baskets tab is the single place where all basket decisions live.

If the basket design changes at the whole-condition level (Imogen revises which items belong in Healthy / Neutral / Unhealthy), update the `default conditions` tab and re-run `--populate-baskets` to regenerate the baskets tab, then run the standard build:

```
python build_registry.py --populate-baskets
python build_registry.py
```

Review the `--populate-baskets` console output carefully for any fuzzy match warnings before accepting the updated baskets tab.

### When item labels change in Qualtrics

1. Open the survey in Qualtrics **Preview** mode
2. Open the browser developer console (F12 → Console)
3. Paste and run `export qualtrics labels via console.js` — downloads `qualtrics_export.json` automatically
4. Move `qualtrics_export.json` to the project folder
5. Run `python build_registry.py --update-qualtrics qualtrics_export.json` — rewrites the `qualtrics` tab in the Excel file
6. For each item whose label changed: update col D in the relevant category tab to match the new Qualtrics text
7. Run `python build_registry.py`
8. Paste the updated JS into Q1

The `--update-qualtrics` step replaces all manual editing of the `qualtrics` tab. The tab is now fully written by the script; do not edit it by hand.

### When new items are added

1. Add a row to the relevant category tab in the Excel file (ItemID, Product Name, **Label** (col D = exact Qualtrics text), Tag)
2. Add a Y-marker row for the new item to the `baskets` tab
3. Re-export Qualtrics labels (steps 1–5 in the section above)
4. Run `python build_registry.py`
5. If the script warns `no confident match for <ItemID>`, verify the Label value in col D exactly matches the Qualtrics-rendered text. If fuzzy matching still fails, add the item to `bakery_dairy_overrides.xlsx` and re-run with `--overrides bakery_dairy_overrides.xlsx`
