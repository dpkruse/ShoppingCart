"""
build_registry.py — Builds window.ITEM_REGISTRY for all 10 categories and patches the JS file.

PRIMARY SOURCE — Main Excel spreadsheet (EXCEL_PATH):
  - One tab per product category (see CATEGORY_SHEETS below): columns ItemID, Product Name,
    Final Label, Tag.  Used to resolve Qualtrics-rendered labels via exact then fuzzy match.
  - 'qualtrics' tab: export of Qualtrics-rendered label text, grouped by category header rows.
    Re-export this tab after any Qualtrics survey edit using
    'export qualtrics labels via console.js'.
  - 'baskets' tab: basket assignments for ALL 10 categories.
    Required columns (exact, case-insensitive):
      ItemID | Category | Label | Tag | HealthyA | HealthyB | UnhealthyA | UnhealthyB
    Y = pre-selected in that basket condition; blank = not selected.
    Edit this tab directly to change basket configurations, then re-run this script.

SECONDARY SOURCE — Overrides Excel file (optional, --overrides flag):
  - Sheet named exactly 'label_overrides' with columns: ItemID | QualtricsLabel
  - Any ItemID listed here bypasses exact/fuzzy label matching and uses the given label directly.
  - Use this to correct cases where fuzzy matching picks the wrong Qualtrics label, or where
    the Excel product name differs significantly from how it appears in the survey.

EXAMPLE USAGE:
  python build_registry.py                          # baseline: main Excel only
  python build_registry.py --overrides fixes.xlsx  # apply label overrides on top

CREATING AN OVERRIDES FILE:
  Create an Excel file (.xlsx) with one sheet named 'label_overrides'.
  Add a header row, then one data row per item to override:
    ItemID | QualtricsLabel
    DRK1   | Natural spring water
    DRK2   | Lightly sparkling water
    MEA2   | Steak
    FRZ12  | Chocolate icecream
  Any ItemID not listed will use the normal exact/fuzzy matching pipeline.
"""

import argparse
import sys
import openpyxl
from difflib import SequenceMatcher

# ── Configuration ──────────────────────────────────────────────────────────────
# Main Excel spreadsheet — primary source for item metadata, Qualtrics labels, and basket assignments.
EXCEL_PATH = r'c:\MyApps\ShoppingCart\Combined Justification 8.05.2026.xlsx'

# Output JS file — patched in-place between the [AUTO-GENERATED-START] sentinel and closing };
JS_PATH = r'c:\MyApps\ShoppingCart\condition question and item metada registry.js'

# Category sheets to process (the 8 non-Bakery/Dairy categories).
# Bakery and Dairy Eggs Fridge are handled by the baskets tab directly (they sit above the sentinel).
# Each tuple: (Excel tab name, Qualtrics group name in 'qualtrics' tab, registry category key)
#   - Excel tab name: must match the sheet name in EXCEL_PATH exactly (note trailing spaces on some)
#   - Qualtrics group name: must match the header text in the qualtrics tab (lowercase, before '(')
#   - Registry category key: becomes the 'category' field in window.ITEM_REGISTRY entries
CATEGORY_SHEETS = [
    ('Drinks',        'drinks',       'drinks'),
    ('Snacks',        'snacks',       'snacks'),
    ('Fruit ',        'fruit',        'fruit'),       # note trailing space in tab name
    ('Meat Seafood',  'meat seafood', 'meat_seafood'),
    ('Freezer',       'frozen',       'frozen'),      # Qualtrics question title is "Frozen", not "Freezer"
    ('Pantry',        'pantry',       'pantry'),
    ('Ready to eat ', 'ready to eat', 'ready_to_eat'),  # note trailing space in tab name
    ('Vegetables',    'vegetables',   'vegetables'),
]

# Fuzzy match threshold — minimum SequenceMatcher ratio to accept a label match.
# Lower = more matches accepted but higher risk of wrong label. 0.85 is the tested working value.
FUZZY_THRESHOLD = 0.85
# ──────────────────────────────────────────────────────────────────────────────


def parse_args():
    parser = argparse.ArgumentParser(
        description='Build window.ITEM_REGISTRY from Excel and patch the Qualtrics JS file.'
    )
    parser.add_argument(
        '--overrides',
        metavar='FILE',
        help=(
            'Path to an Excel file with a sheet named "label_overrides" containing columns '
            'ItemID and QualtricsLabel. Overrides bypass exact/fuzzy label matching for the '
            'listed items. See module docstring for file format details.'
        )
    )
    return parser.parse_args()


def load_label_overrides(path):
    """
    Reads label overrides from the 'label_overrides' sheet of the given Excel file.
    Returns dict mapping ItemID -> QualtricsLabel string.
    Exits with a clear message if the sheet or required columns are missing.
    """
    wb = openpyxl.load_workbook(path, read_only=True, data_only=True)
    if 'label_overrides' not in wb.sheetnames:
        print(f'ERROR: overrides file "{path}" has no sheet named "label_overrides". Aborting.')
        print('Create a sheet named exactly "label_overrides" with columns: ItemID | QualtricsLabel')
        sys.exit(1)
    ws = wb['label_overrides']
    rows = list(ws.iter_rows(values_only=True))
    if not rows:
        return {}
    header = [str(c).strip() if c else '' for c in rows[0]]
    try:
        id_col    = header.index('ItemID')
        label_col = header.index('QualtricsLabel')
    except ValueError:
        print(f'ERROR: "label_overrides" sheet must have columns ItemID and QualtricsLabel.')
        print(f'       Found: {header}')
        sys.exit(1)
    result = {}
    for row in rows[1:]:
        iid   = str(row[id_col]).strip()    if row[id_col]    else None
        label = str(row[label_col]).strip() if row[label_col] else None
        if iid and label:
            result[iid] = label
    return result


def load_baskets(wb):
    """
    Reads the 'baskets' tab from the workbook.
    Returns dict mapping ItemID -> { healthy_a, healthy_b, unhealthy_a, unhealthy_b } (bools).
    Exits with a clear message if the tab or required columns are missing.
    """
    if 'baskets' not in wb.sheetnames:
        print('ERROR: main Excel file has no "baskets" tab. Aborting.')
        print('The baskets tab must cover all 10 categories with columns:')
        print('  ItemID | Category | Label | Tag | HealthyA | HealthyB | UnhealthyA | UnhealthyB')
        sys.exit(1)
    ws = wb['baskets']
    rows = list(ws.iter_rows(values_only=True))
    header = [str(c).strip().lower().replace(' ', '') if c else '' for c in rows[0]]
    col = {}
    for name in ('itemid', 'healthya', 'healthyb', 'unhealthya', 'unhealthyb'):
        try:
            col[name] = header.index(name)
        except ValueError:
            print(f'ERROR: "baskets" tab is missing required column "{name}".')
            print(f'       Found columns: {header}')
            sys.exit(1)
    baskets = {}
    for row in rows[1:]:
        iid = str(row[col['itemid']]).strip() if row[col['itemid']] else None
        if not iid:
            continue
        baskets[iid] = {
            'healthy_a':   str(row[col['healthya']]   or '').strip().upper() == 'Y',
            'healthy_b':   str(row[col['healthyb']]   or '').strip().upper() == 'Y',
            'unhealthy_a': str(row[col['unhealthya']] or '').strip().upper() == 'Y',
            'unhealthy_b': str(row[col['unhealthyb']] or '').strip().upper() == 'Y',
        }
    return baskets


def norm(s):
    return (s or '').lower().strip()


def parse_qualtrics_tab(wb):
    """Parses the 'qualtrics' tab into a dict: category_name -> [label, ...]."""
    q_by_cat = {}
    current_cat = None
    for row in wb['qualtrics'].iter_rows(values_only=True):
        val = row[1]
        if not val:
            continue
        val = val.strip()
        if '(' in val and 'items)' in val:
            current_cat = val.split('(')[0].strip().lower()
            q_by_cat[current_cat] = []
        elif current_cat and val:
            q_by_cat[current_cat].append(val)
    return q_by_cat


def resolve_labels(wb, q_by_cat, label_overrides):
    """
    For each category in CATEGORY_SHEETS, resolves the Qualtrics-rendered label for each item.
    Resolution order: label_overrides (from --overrides file) -> exact match -> fuzzy match.
    Returns list of (cat_key, display_name, [(ItemID, qualtrics_label, tag), ...]).
    """
    all_categories = []

    for sheet_name, q_cat, cat_key in CATEGORY_SHEETS:
        ws = wb[sheet_name]
        raw_rows = list(ws.iter_rows(values_only=True))
        header = [str(c).strip() if c else '' for c in raw_rows[0]]
        h_low  = [h.lower() for h in header]

        itemid_col   = next((i for i, v in enumerate(h_low) if 'item' in v and 'id' in v), None)
        prodname_col = next((i for i, v in enumerate(h_low) if 'product' in v and 'name' in v), None)
        final_col    = next((i for i, v in enumerate(h_low) if 'final' in v), None)
        tag_col      = next((i for i, v in enumerate(h_low) if v.strip() == 'tag'), None)

        q_labels   = list(q_by_cat.get(q_cat, []))
        q_norm_map = {norm(l): l for l in q_labels}
        used  = set()
        items = []

        for r in raw_rows[1:]:
            if not r[0]:
                continue
            iid  = str(r[itemid_col]).strip()
            prod = (r[prodname_col] or '').strip() if prodname_col is not None else ''
            fl   = (r[final_col]   or '').strip() if final_col   is not None else ''
            tag  = norm(r[tag_col] or '') if tag_col is not None else ''

            # 1. Label override from --overrides file
            if iid in label_overrides:
                qlabel = label_overrides[iid]
                used.add(qlabel)
                items.append((iid, qlabel, tag))
                continue

            # 2. Exact match on Final Label then Product Name
            matched = None
            for candidate in [fl, prod]:
                n = norm(candidate)
                if n and n in q_norm_map and q_norm_map[n] not in used:
                    matched = q_norm_map[n]
                    break

            # 3. Fuzzy match if no exact match found
            if matched is None:
                remaining = [l for l in q_labels if l not in used]
                for candidate in [fl, prod]:
                    n = norm(candidate)
                    if not n:
                        continue
                    best  = max(remaining, key=lambda x: SequenceMatcher(None, n, norm(x)).ratio()) if remaining else None
                    ratio = SequenceMatcher(None, n, norm(best)).ratio() if best else 0
                    if ratio >= FUZZY_THRESHOLD:
                        matched = best
                        break

            if matched:
                used.add(matched)
                items.append((iid, matched, tag))
            else:
                print(f'  WARNING: no confident match for {iid} ({fl!r} / {prod!r}) in {sheet_name}')
                items.append((iid, fl or prod, tag))

        # VEG17 — present in Qualtrics but absent from Excel; confirmed healthy
        if sheet_name == 'Vegetables':
            items.append(('VEG17', 'Sweet potatoe', 'healthy'))

        all_categories.append((cat_key, sheet_name.strip(), items))

    return all_categories


def bv(b):
    return 'true ' if b else 'false'


def build_insertion_block(all_categories, baskets):
    """Builds the JS lines to insert between the sentinel and closing };"""
    new_lines = []
    for cat_key, display, items in all_categories:
        max_len = max(len(label) for _, label, _ in items) if items else 20
        new_lines.append(f'    // --- {display} ({len(items)} items) ---')
        for iid, label, tag in items:
            if iid not in baskets:
                print(f'  WARNING: {iid} ({label!r}) not found in baskets tab — no preselections assigned')
            p   = baskets.get(iid, {'healthy_a': False, 'healthy_b': False,
                                     'unhealthy_a': False, 'unhealthy_b': False})
            pad = ' ' * (max_len - len(label) + 1)
            line = (
                f'    "{label}":{pad}'
                f'{{ category: "{cat_key}", tag: "{tag}", '
                f'preselect: {{ healthy_a: {bv(p["healthy_a"])}, healthy_b: {bv(p["healthy_b"])}, '
                f'unhealthy_a: {bv(p["unhealthy_a"])}, unhealthy_b: {bv(p["unhealthy_b"])} }} }}'
            )
            new_lines.append(line)

    result = []
    for i, line in enumerate(new_lines):
        if line.startswith('    //'):
            result.append(line)
        else:
            is_last = all(l.startswith('    //') for l in new_lines[i + 1:])
            result.append(line + (',' if not is_last else ''))
    return '\n'.join(result)


def patch_js(insertion_block, total_items, cat_names):
    """Replaces the auto-generated section of the JS file in-place."""
    with open(JS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    SENTINEL      = '    // [AUTO-GENERATED-START]'
    REGISTRY_CLOSE = '\n};'

    sentinel_pos = content.find(SENTINEL)
    if sentinel_pos == -1:
        print('ERROR: [AUTO-GENERATED-START] sentinel not found in JS file. Aborting.')
        print(f'Add the line    // [AUTO-GENERATED-START]    to {JS_PATH}')
        print('Place it immediately before the first auto-generated category comment.')
        sys.exit(1)

    close_pos = content.find(REGISTRY_CLOSE, sentinel_pos)
    if close_pos == -1:
        print('ERROR: closing }; not found after sentinel. Aborting.')
        sys.exit(1)

    new_content = (
        content[:sentinel_pos]
        + SENTINEL + '\n'
        + insertion_block
        + REGISTRY_CLOSE
        + content[close_pos + len(REGISTRY_CLOSE):]
    )

    new_content = new_content.replace(
        '// ITEM_REGISTRY — 47 items across 2 categories (Bakery, Dairy Eggs Fridge)',
        f'// ITEM_REGISTRY — {total_items} items across 10 categories'
    )
    new_content = new_content.replace(
        '// Source: baskets.csv — labels corrected to match Qualtrics choice text exactly',
        f'// Additional categories (baskets from Excel baskets tab): {cat_names}'
    )

    with open(JS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)


def main():
    args = parse_args()

    label_overrides = {}
    if args.overrides:
        label_overrides = load_label_overrides(args.overrides)
        print(f'Loaded {len(label_overrides)} label override(s) from {args.overrides}')

    wb      = openpyxl.load_workbook(EXCEL_PATH, read_only=True, data_only=True)
    baskets = load_baskets(wb)

    q_by_cat       = parse_qualtrics_tab(wb)
    all_categories = resolve_labels(wb, q_by_cat, label_overrides)

    insertion_block = build_insertion_block(all_categories, baskets)

    total_items = 47 + sum(len(items) for _, _, items in all_categories)
    cat_names   = ', '.join(d for _, d, _ in all_categories)

    patch_js(insertion_block, total_items, cat_names)

    print(f'Done. ITEM_REGISTRY now has {total_items} items across 10 categories.')
    print(f'Categories added: {cat_names}')
    print()
    print('NEXT STEP — deploy to Qualtrics:')
    print(f'  1. Open: {JS_PATH}')
    print('  2. Copy the entire file contents.')
    print('  3. In Qualtrics, open Q1 (the Condition Picker question).')
    print('  4. Click "JavaScript" on Q1.')
    print('  5. Paste the contents into the area ABOVE (outside) addOnReady({ ... }).')
    print('  6. Save and preview the survey.')
    print('  7. In preview, open the browser console and check for:')
    print('       "applied N pre-selections for condition <name>"')
    print('     (should appear once per category when a condition is selected)')
    print()
    print('To create a different basket configuration:')
    print(f'  - Edit the "baskets" tab in {EXCEL_PATH}, then re-run this script.')
    print('  - To fix label matching issues: python build_registry.py --overrides your_fixes.xlsx')


if __name__ == '__main__':
    main()
