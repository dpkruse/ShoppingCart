# How to Update Baskets and Redeploy the Survey

This guide covers the full process for changing which items are pre-selected in each basket condition (Healthy / Neutral / Unhealthy) and getting those changes live in Qualtrics.

---

## The 3-step process

1. **Edit the spreadsheet** — mark which items belong in each basket
2. **Run the build script** — regenerates the JavaScript file
3. **Paste into Qualtrics** — deploy the updated JS to the Q1 question

---

## Step 1 — Edit the spreadsheet

Open **`Combined Justification 8.05.2026.xlsx`** (in the ShoppingCart folder).

There are two ways to edit basket assignments, depending on what you're changing:

### Option A — Targeted tweaks (most common)

Go to the **`baskets`** tab. This is the master list of all 240 items with their basket assignments.

Each row is one item. The columns that matter are:

| Column | Meaning |
|--------|---------|
| `Healthy` | Put `Y` if this item is pre-selected in the Healthy basket |
| `Neutral` | Put `Y` if this item is pre-selected in the Neutral basket |
| `Unhealthy` | Put `Y` if this item is pre-selected in the Unhealthy basket |

Leave a cell blank if the item should **not** be pre-selected for that condition.

An item can appear in more than one condition — a staple like bread might be pre-checked in all three.

### Option B — Full redesign (starting from scratch)

If you want to redesign the baskets completely using new item lists:

1. Go to the **`default conditions`** tab
2. Edit columns B, C, D (Healthy / Neutral / Unhealthy item lists) with the new item names
3. Skip to Step 2 and use the `--populate-baskets` flag instead of the standard command

---

## Step 2 — Run the build script

Open a terminal (Command Prompt or PowerShell) in the ShoppingCart folder and run:

**Standard rebuild** (after editing the `baskets` tab directly):
```
python build_registry.py
```

**Full redesign** (after editing the `default conditions` tab):
```
python build_registry.py --populate-baskets
```
Then review the console output — it prints every fuzzy match with a score. Any match below ~0.75 should be checked by eye. Once you're happy, run the standard command above to finish.

**Output:** The script updates `condition question and item metada registry.js` in place. That file is what you paste into Qualtrics in Step 3.

---

## Step 3 — Paste into Qualtrics

1. Open the survey in Qualtrics
2. Click into **Q1** (the Condition Picker question)
3. Click **JavaScript** (in the question editing panel)
4. Select all the existing content and delete it, OR find the area **above** the `addOnReady({ ... })` block
5. Paste the entire contents of **`condition question and item metada registry.js`** above `addOnReady`
6. Click **Save**

---

## Step 4 — Test

1. Click **Preview Survey**
2. On Q1, select a basket condition (Healthy, Neutral, or Unhealthy)
3. Open the browser developer console (press **F12**, then click the **Console** tab)
4. You should see a line like `applied 3 pre-selections for condition healthy` for each category (10 lines total)
5. Check that the expected items are pre-ticked in the cart
6. Repeat for all three conditions

**Expected pre-selection counts:**

| Condition | Items pre-selected |
|-----------|--------------------|
| Healthy   | 28 items |
| Neutral   | 26 items |
| Unhealthy | 26 items |

---

## Quick reference

| Scenario | What to edit | Command |
|----------|-------------|---------|
| Tweak a few items | `baskets` tab — add/remove Y markers | `python build_registry.py` |
| Full redesign | `default conditions` tab | `python build_registry.py --populate-baskets` then `python build_registry.py` |
| Item label changed in Qualtrics | Re-export labels (see README), update `Label` col D | `python build_registry.py` |
