// Exports Qualtrics-rendered checkbox labels in the format expected by the
// 'qualtrics' tab of the master Excel file (column B).
//
// HOW TO USE:
//   1. Open the survey in Qualtrics Preview mode
//   2. Open the browser developer console (F12 → Console)
//   3. Paste this entire script and press Enter
//   4. The output is copied to your clipboard automatically (Chrome/Edge)
//      If copy() is blocked, the text is also logged — select it and copy manually
//   5. In Excel, click cell B1 of the 'qualtrics' tab, then Paste
//      Each line becomes one row in column B

(function() {
    var categories = {};
    var categoryOrder = [];

    jQuery("input[type='checkbox']").each(function() {
        var $cb = jQuery(this);
        var id = $cb.attr("id");

        // Same label-extraction logic as getItemLabel() in the survey JS
        var label = id ? jQuery("label[for='" + id + "']").filter("[id$='-label']").text().trim() : "";
        if (!label) label = $cb.closest("li").find("span").last().text().trim();
        if (!label) label = $cb.closest("li").text().trim();
        if (!label) return;

        // Group by question — find the nearest ancestor with an id starting QID
        var $question = $cb.closest("[id^='QID']");
        var qid = $question.attr("id") || "unknown";

        // Category name from question title (same derivation as sec in category JS)
        var catName = $question.find(".QuestionText").first().text().trim();
        if (!catName) catName = qid;

        if (!categories[catName]) {
            categories[catName] = [];
            categoryOrder.push(catName);
        }
        categories[catName].push(label);
    });

    if (categoryOrder.length === 0) {
        console.warn("No checkboxes found. Make sure you are running this on the survey preview page (not the editor).");
        return;
    }

    // Build output in the format parse_qualtrics_tab() expects:
    //   CategoryName (N items)
    //   label 1
    //   label 2
    //   ...
    //   [blank line between categories]
    var lines = [];
    categoryOrder.forEach(function(catName, i) {
        var items = categories[catName];
        lines.push(catName + " (" + items.length + " items)");
        items.forEach(function(label) { lines.push(label); });
        if (i < categoryOrder.length - 1) lines.push(""); // blank separator
    });

    var text = lines.join("\n");
    var totalItems = categoryOrder.reduce(function(n, c) { return n + categories[c].length; }, 0);

    // Summary to console
    console.log("=== Qualtrics label export ===");
    console.log(categoryOrder.length + " categories, " + totalItems + " items total");
    categoryOrder.forEach(function(c) {
        console.log("  " + c + ": " + categories[c].length + " items");
    });

    // Attempt clipboard copy
    try {
        copy(text);
        console.log("%cOutput copied to clipboard. Paste into cell B1 of the qualtrics tab in Excel.", "color:green;font-weight:bold");
    } catch(e) {
        console.log("%ccopy() not available — select and copy the text block below manually:", "color:orange;font-weight:bold");
        console.log(text);
    }

    // Always log as JSON too (useful for debugging mismatches)
    console.log("JSON (for reference):", JSON.stringify(categories, null, 2));
})();
