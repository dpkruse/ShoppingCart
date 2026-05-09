// Exports items in the exact order Qualtrics renders them, grouped by category question

var categories = {};
var categoryOrder = [];

jQuery("input[type='checkbox']").each(function() {
    var id = jQuery(this).attr("id");
    var label = id ? jQuery("label[for='" + id + "']").filter("[id$='-label']").text().trim() : "";
    if (!label) label = jQuery(this).closest("li").find("span").last().text().trim();
    if (!label) label = jQuery(this).closest("li").text().trim();
    if (!label) return;

    var $question = jQuery(this).closest("[id^='QID']");
    var qid = $question.attr("id") || "unknown";

    // Get the question title text (same method the JS uses for sec derivation)
    var catName = $question.find(".QuestionText").first().text().trim();
    if (!catName) catName = qid; // fallback to QID if title not found

    if (!categories[catName]) {
        categories[catName] = [];
        categoryOrder.push(catName);
    }
    categories[catName].push(label);
});

// Print in DOM order, no sorting
categoryOrder.forEach(function(catName) {
    var items = categories[catName];
    console.group(catName + " (" + items.length + " items)");
    console.log(items.join("\n"));
    console.groupEnd();
});