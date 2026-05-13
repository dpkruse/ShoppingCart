# Archive

Files moved here are no longer part of the active workflow. They are kept for reference only.

| File | What it was | Why archived |
|---|---|---|
| `bakery_dairy_overrides.xlsx` | Optional label overrides file for `build_registry.py --overrides` | Empty — all label corrections now live in col D of the category tabs in the master Excel file |
| `Combined Justification 8.05.2026.BACKUP.xlsx` | Backup copy of the master Excel file taken during label consolidation (May 2026) | Superseded by the current master file at the repo root |
| `Combined Justification 8.05.2026.csv.txt` | CSV export used during early data cleaning | Data cleaning complete; source of truth is the Excel master file |
| `consolidate_labels.py` | One-off Python script that migrated "Final label" columns into col D across 8 category tabs | Task complete; no longer needed |
| `default choices for baskets 9.05.2026.png` | Screenshot of Imogen's basket design in the `default conditions` tab | Reference only; the live basket assignments are in the `baskets` tab of the Excel file |
| `label-review.csv` | Intermediate artefact from label reconciliation work | Superseded; all corrections applied to the Excel file directly |
| `qualtrics_export.json` | Point-in-time export of Qualtrics-rendered label text (exported 8 May 2026) | Stale — re-export using `export qualtrics labels via console.js` if labels change |
| `registry-converter.html` | Legacy browser-based tool for generating registry entries from CSV | Superseded by `build_registry.py` |
| `baskets.csv` | Supplementary label source for `--populate-baskets` label matching on Bakery/Dairy | Redundant — all 10 category tabs now have `Label` col D; `--populate-baskets` matches directly from Excel |
| `Qualtrics.SurveyEngine.js` | Reference copy of the Qualtrics JavaScript API | Reference only |
| `Justification (original Imo).xlsx` | Original pre-development spreadsheet from Imogen | Superseded by `Combined Justification 8.05.2026.xlsx` |
| `Default Condition Cart Items.xlsx` | Early draft of basket condition item lists | Superseded by the `baskets` tab in the master Excel file |
