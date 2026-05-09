// Exports Qualtrics-rendered checkbox labels as a JSON file download.
//
// HOW TO USE:
//   1. Open the survey in Qualtrics Preview mode
//   2. Open the browser developer console (F12 → Console)
//   3. Paste this entire script and press Enter
//   4. A file named qualtrics_export.json is downloaded automatically
//   5. Move it to your ShoppingCart project folder, then run:
//        python build_registry.py --update-qualtrics qualtrics_export.json

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

        var $question = $cb.closest("[id^='QID']");
        var qid = $question.attr("id") || "unknown";
        var catName = $question.find(".QuestionText").first().text().trim();
        if (!catName) catName = qid;

        if (!categories[catName]) {
            categories[catName] = [];
            categoryOrder.push(catName);
        }
        categories[catName].push(label);
    });

    if (categoryOrder.length === 0) {
        console.warn("No checkboxes found. Run this on the survey preview page, not the editor.");
        return;
    }

    var totalItems = categoryOrder.reduce(function(n, c) { return n + categories[c].length; }, 0);

    var payload = JSON.stringify({ order: categoryOrder, categories: categories }, null, 2);

    // Trigger file download
    var blob = new Blob([payload], { type: "application/json" });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement("a");
    a.href     = url;
    a.download = "qualtrics_export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log("Downloaded qualtrics_export.json");
    console.log(categoryOrder.length + " categories, " + totalItems + " items total:");
    categoryOrder.forEach(function(c) {
        console.log("  " + c + ": " + categories[c].length + " items");
    });
    console.log("Next: move qualtrics_export.json to your ShoppingCart folder, then run:");
    console.log("  python build_registry.py --update-qualtrics qualtrics_export.json");
})();
