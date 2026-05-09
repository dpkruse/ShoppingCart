# Why One Survey Is Better Than Three

**For:** Imogen
**Written by:** Dad
**Purpose:** To explain the design of the shopping cart survey, and why the approach we ended up with is better than the original plan — even though it involves more code.

---

## What You Originally Planned

Your original idea was to create **three separate Qualtrics surveys** — one for each basket condition (Healthy, Neutral, Unhealthy). Each survey would have its default choices manually ticked in Qualtrics. A participant would be randomly assigned to one of the three surveys.

This is a completely reasonable instinct. It is the most obvious way to solve the problem when you are working inside Qualtrics without any code. You can see the checkboxes, you can tick them, and you can trust what you see.

---

## What We Built Instead

We built **one survey** that handles all three conditions. When a participant is assigned a condition, a small piece of JavaScript reads a list of default choices from a lookup table and ticks the right boxes automatically. The list of default choices lives in a single Excel spreadsheet — the same one that holds all of the item metadata, health tags, and research justification.

The participant experience is identical to what you planned. From their perspective, they land on a page with some items already in their cart. They do not know — and do not need to know — how those defaults got there.

---

## Why Three Surveys Is a Fragile Design

The problem with three surveys is not that it is wrong in principle. The problem is what happens over time, and over the course of a research project.

### The source of truth becomes 720 checkboxes

Each survey has 240 items. Each item can be ticked or unticked. Across three surveys, that is 720 individual checkbox states. Your actual research decision — which 25–27 items belong in each basket — is encoded not in one place but spread invisibly across all three surveys. There is no document, no spreadsheet, no single file you can open and read to confirm that survey A, B, and C are all doing what you intended. The only way to check is to open all three surveys and compare them manually, condition by condition, category by category.

### Changes require triple the work, with triple the risk of error

If you decide that one item should move from the Healthy basket to the Neutral basket, you need to:

1. Open survey A, find the item, untick it in the Healthy version, save
2. Open survey B, find the item, tick it in the Neutral version, save
3. Confirm that you have not accidentally changed anything else in either survey

If your research goes through three rounds of basket revisions — which is entirely normal in survey development — you will make those edits twenty or thirty times. Each edit is an opportunity to introduce a mismatch: a box that should be ticked but is not, or one that is ticked in one survey but not in another. These mismatches are silent. Qualtrics will not warn you. Your data will look plausible but will be wrong.

### Mismatches are invisible until it is too late

A mismatch between the three surveys is not like a typo in a question — something you can read and catch. It is a logical error: box 147 in survey B is ticked when it should not be. You will not notice this during pilot testing unless you open all three surveys and go through every item systematically. If you only discover it after data collection, you cannot recover.

---

## Why One Survey With a Spreadsheet Is Safer

### The source of truth is one place

Your basket decisions live in one Excel tab: the `default conditions` tab. Each column is one condition. Each row is one item. A `Y` means it is pre-selected. You can read this tab, share it with a supervisor, print it, or email it. It is a complete and human-readable record of what the survey will do.

If you want to move an item from Healthy to Neutral, you change one cell. You run one script. The survey updates. There is no second survey to remember, no third survey to check.

### Your research record and your survey are the same document

In the three-survey approach, your research decision (which items belong in which basket) and your survey implementation (which boxes are ticked) are two separate things that must be kept in sync by hand. In the single-survey approach, they are the same thing. The spreadsheet is both your research record and the input to the survey. You cannot have one without the other.

### Verification is straightforward

At any point, you can open the `baskets` tab of the spreadsheet and see the complete state of the survey's defaults for all 240 items and all three conditions in one view. Checking whether this is correct takes a few minutes. Checking whether three Qualtrics surveys are in sync with each other takes most of a day.

---

## Addressing the Fear: "No One Else Does It This Way"

This is worth taking seriously as a feeling, and worth examining as an argument.

**As a feeling**, the concern makes sense. You are a researcher, not a software developer. You are being asked to trust a system you cannot fully read or modify yourself. That is uncomfortable, and it is fair to name it.

**As an argument**, it does not hold. The reason other researchers use the three-survey approach is not because it is better. It is because they do not have access to someone who can write the code, or because they did not think the alternative was possible. Qualtrics is designed so that non-programmers can use it without any code at all. The default assumption is that everything will be done by hand. That assumption is fine for simple surveys. It breaks down when you have 240 items and three conditions and a requirement that defaults be consistent across all of them.

The absence of others doing something is not evidence that it is wrong. It is often evidence that it is new, or that it requires a capability most people do not have. Your survey is more sophisticated than most. That sophistication is not a liability — it is a feature. It means you can change your basket assignments in five minutes instead of five hours, and you can be confident the change is correct.

---

## What the Code Actually Does

You do not need to be able to write this code. You do need to understand what it does.

When a participant reaches the shopping page:

1. They are assigned a condition (Healthy, Neutral, or Unhealthy)
2. The code reads your spreadsheet's basket decisions — a lookup table of 240 items, each marked `Y` or blank for each condition
3. For every item marked `Y` in the assigned condition, the code ticks the checkbox
4. The participant sees a cart with those items already selected

That is all. The rest of the survey — the questions, the layout, the scoring — would exist whether or not there was any code. The code's only job is to replace the manual box-ticking that you would otherwise have done 720 times by hand.

---

## What You Need to Be Able to Do

You do not need to write JavaScript. You do need to be able to:

1. **Edit the `default conditions` tab** when your basket choices change — this is just editing cells in Excel
2. **Run one command** (`python build_registry.py`) to regenerate the survey's lookup table — this is one line in a terminal window
3. **Paste one file** into the Qualtrics JavaScript panel after running the command — this is copy and paste

That is the full operational burden. Everything else — the label matching, the registry generation, the cart display — is handled by the code and does not require your input unless something changes.

---

## A Note on Complexity

The system does involve more moving parts than three surveys with manually ticked boxes. That is true and worth acknowledging. It also means:

- One source of truth instead of three
- Changes verified by reading a spreadsheet, not by comparing surveys
- A complete audit trail of every basket decision in version control
- The ability to change, extend, and correct the survey without risk of silent inconsistency

The complexity is front-loaded — it was harder to build than three surveys would have been. It is back-loaded in the other direction: it will be considerably easier to maintain, verify, and modify than three surveys would be, for the remainder of the project.

---

*If any part of this is unclear or raises questions, ask. The goal is for you to understand what has been built well enough to trust it — not to read the code, but to know what it is doing and why.*
