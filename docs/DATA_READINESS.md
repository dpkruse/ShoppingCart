# Data Readiness: How Raw Research Data Was Engineered for the Shopping Cart Survey

**Document version:** May 2026 (updated 9 May 2026 — 3-condition basket model)
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

Tier 1 is an exact match: the script normalises both the Excel "Final Label" or "Product Name" column value and the Qualtrics label by stripping leading and trailing whitespace and converting to lowercase, then tests for equality. Items that match at this tier are confirmed without any ambiguity.

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

### 8.4 The `bakery_dairy_overrides.xlsx` file

Because Bakery and Dairy items have no useful Final Labels in Excel (the column is empty), and their product names are long brand-heavy strings that fail fuzzy matching, a separate mechanism was needed. During the `--populate-baskets` run, the script auto-generates `bakery_dairy_overrides.xlsx` — an overrides file mapping all 47 Bakery and Dairy ItemIDs to their correct Qualtrics-rendered labels, derived by fuzzy-matching `baskets.csv` entries (which carry short, clean labels) against the qualtrics tab. This file must be passed to the standard build run:

```
python build_registry.py --overrides bakery_dairy_overrides.xlsx
```

Without this overrides file, all Bakery and Dairy items will appear in the registry with `no_match` fallback labels and fail to preselect.

### 8.5 Known false positives from the first populate run

The initial `--populate-baskets` run on 9 May 2026 produced two false positive basket assignments that require manual correction in the baskets tab before the registry is considered production-ready:

- **DRK1 "Spring Water"** received Y marks it should not have. The condition label "tuna in spring water" fuzzy-matched to DRK1 (Spring Water) at score 0.75 instead of the correct target, PAN item "Springwater tuna". Correct action: clear Y marks from DRK1 in the baskets tab; add Y marks to PAN "Springwater tuna".

- **FRZ18 "Chocolate cake"** received Y marks it should not have. The condition label "Chocolate cereal" matched FRZ18 at score 0.80 instead of the correct PAN item "Chocolate flavoured cereal" (score 0.76). Correct action: clear Y marks from FRZ18 in the baskets tab; add Y marks to PAN "Chocolate flavoured cereal".

After making these corrections in the Excel baskets tab, re-run `python build_registry.py --overrides bakery_dairy_overrides.xlsx` to regenerate the JS.

---

## 9. Pre-Existing Label Fixes (Bakery)

When the Bakery basket assignments from `baskets.csv` were loaded into the registry, four items were found to have label text in the CSV that did not match what Qualtrics rendered in the DOM. These were not newly introduced errors but pre-existing mismatches that had gone undetected because the basket assignments in Qualtrics had been set manually and the label text in the spreadsheet had never been checked against the DOM.

The four corrections are: "Bagel plain" corrected to "Bagel Plain" (capitalisation of the second word); "Wholemeal roll" corrected to "Wholemeal Roll" (same pattern); "Wholemeal English Muffin" corrected to "Wholemeal english muffin" (the second and third words are lowercase in Qualtrics despite being capitalised in the spreadsheet); and "Wholegrain Wrap" corrected to "Wholemeal Wrap" (a different word entirely — the CSV used "Wholegrain" while Qualtrics renders "Wholemeal"; these were confirmed to refer to the same product through context and category position).

These corrections are captured in `bakery_dairy_overrides.xlsx` (see Section 8.4). When `build_registry.py` is run with `--overrides bakery_dairy_overrides.xlsx`, the corrected Qualtrics labels are applied for all Bakery and Dairy items. Without this overrides file, the pre-selections for these four Bakery items would silently fail for every participant in every basket condition that includes them.

---

## 10. Known Risks and Open Items

**FRZ12 — Chocolate icecream (high uncertainty).** The mapping of FRZ12 to the Qualtrics label "Chocolate icecream" was assigned by process of elimination rather than by positive identification. The Excel entry for FRZ12 was "Frozen Dessert Cones - Brownie", which does not clearly correspond to any single Qualtrics frozen item. After all other frozen items were matched, "Chocolate icecream" was the only unmatched Qualtrics label remaining, and FRZ12 was assigned to it on that basis. This is not a confirmed match. Before the survey is used in production, the actual Qualtrics survey should be opened and the frozen category inspected to confirm that "Chocolate icecream" is the correct label for the item intended to be FRZ12. If it is not, the `label_overrides` entry for FRZ12 in `bakery_dairy_overrides.xlsx` (or a separate overrides file) must be corrected and the registry regenerated.

**Two false positive basket assignments require manual correction.** The initial `--populate-baskets` run on 9 May 2026 misassigned Y markers for DRK1 ("Spring Water") and FRZ18 ("Chocolate cake"). See Section 8.5 for the specific corrections required. These must be fixed in the baskets tab before the survey is used in data collection.

**Qualtrics condition picker question needs updating.** The Q1 condition-picker question must be updated in the Qualtrics survey editor to offer three radio options (Healthy / Neutral / Unhealthy) rather than the original four. The JavaScript dynamically derives the condition key from the selected radio label text, so no JS changes are needed — only the Qualtrics question content needs updating.

**The `sec` variable depends on question title text.** The JavaScript code that drives category-level basket preselection and scoring derives its internal category key (the `sec` variable, e.g., "frozen", "ready_to_eat") at runtime by parsing the Qualtrics question title text. If any question title is renamed in the Qualtrics survey builder — for example, "Frozen Foods" changed to "Frozen Meals" — the derived key will no longer match the expected embedded data variable name, and preselection for that entire category will break silently. Any renaming of question titles must be followed by a corresponding update to the key derivation logic in the JavaScript.

**No end-to-end test has been completed.** The registry and preselection logic have been constructed and reviewed at the code level, but no full end-to-end test in Qualtrics preview mode has been run through all three basket conditions verifying that each item pre-selects correctly. All three conditions (healthy, neutral, unhealthy) should be tested before the survey goes live, with particular attention to FRZ12, the two false positives identified in Section 8.5, and the four corrected Bakery labels noted in Section 9.

---

## 11. Maintenance Workflow

### Standard registry rebuild

The normal build command after any data change:

```
python build_registry.py --overrides bakery_dairy_overrides.xlsx
```

This reads the `qualtrics` tab (label text), all 10 category tabs (item metadata), and the `baskets` tab (Y markers), then patches `condition question and item metada registry.js` with a fresh ITEM_REGISTRY. The resulting JS file is pasted into the Q1 Qualtrics JavaScript panel.

### When basket assignments change

Edit the `Y` markers directly in the `baskets` tab of the Excel file (columns: `ItemID | Category | Label | Tag | Healthy | Neutral | Unhealthy`) and re-run the standard build. No code changes are required. This applies equally to all 10 categories — the baskets tab is the single place where all basket decisions live.

If the basket design changes at the whole-condition level (Imogen revises which items belong in Healthy / Neutral / Unhealthy), update the `default conditions` tab and re-run `--populate-baskets` to regenerate the baskets tab, then run the standard build:

```
python build_registry.py --populate-baskets
python build_registry.py --overrides bakery_dairy_overrides.xlsx
```

Review the `--populate-baskets` console output carefully for any fuzzy match warnings before accepting the updated baskets tab.

### When item labels change in Qualtrics

1. Open the survey in Qualtrics **Preview** mode
2. Open the browser developer console (F12 → Console)
3. Paste and run `export qualtrics labels via console.js` — downloads `qualtrics_export.json` automatically
4. Move `qualtrics_export.json` to the project folder
5. Run `python build_registry.py --update-qualtrics qualtrics_export.json` — rewrites the `qualtrics` tab in the Excel file
6. Run `python build_registry.py --overrides bakery_dairy_overrides.xlsx`
7. Paste the updated JS into Q1

The `--update-qualtrics` step replaces all manual editing of the `qualtrics` tab. The tab is now fully written by the script; do not edit it by hand.

### When new items are added

1. Add a row to the relevant category tab in the Excel file (ItemID, Product Name, Tag, Final Label)
2. Add a Y-marker row for the new item to the `baskets` tab
3. Re-export Qualtrics labels (steps 1–5 in the section above)
4. Run `python build_registry.py --overrides bakery_dairy_overrides.xlsx`
5. If the script warns `no confident match for <ItemID>`, add the item to `bakery_dairy_overrides.xlsx` (or a new overrides file) and re-run with `--overrides`

### When label overrides need to change

Update the `label_overrides` sheet in `bakery_dairy_overrides.xlsx` and re-run with `--overrides bakery_dairy_overrides.xlsx`. The overrides file is committed to version control alongside the script.
