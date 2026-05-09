Qualtrics.SurveyEngine.addOnload(function() {});

Qualtrics.SurveyEngine.addOnReady(function() {
    var self = this;
    var qid = this.questionId;
    var maxItems = 30;
    var $q = jQuery("#" + qid);

    // --- Register this engine globally so Q1 can reach it ---
    window._questionEngines = window._questionEngines || {};
    window._questionEngines[qid] = self;

    // --- Derive section key from question text ---
    var qLabel = "";
    try { qLabel = this.getQuestionInfo().QuestionText; } catch(e) {}
    if (!qLabel) qLabel = "unknown";
    var sec = jQuery("<div>").html(qLabel).text()
                  .trim().toLowerCase().replace(/\W+/g, "_");
    console.log("Category question loaded — sec:", sec, "| qid:", qid);

    // --- Build shared layout once ---
    if (!jQuery("#shopping-layout").length) {
        $q.before(
            '<div id="shopping-layout" style="display:flex;gap:16px;align-items:flex-start;">' +
                '<div id="shopping-main" style="flex:1;"></div>' +
                '<div id="shopping-sidebar" style="width:280px;border:1px solid #ccc;padding:12px;' +
                     'border-radius:8px;background:#fafafa;position:sticky;top:20px;">' +
                    '<div style="font-weight:700;margin-bottom:8px;">🛒 Your cart</div>' +
                    '<div id="cart-total" style="margin-bottom:8px;font-weight:600;">0 items</div>' +
                    '<div id="cart-health" style="margin-bottom:10px;font-size:13px;"></div>' +
                    '<ul id="selected-items" style="padding-left:18px;margin:0;font-size:13px;"></ul>' +
                '</div>' +
            '</div>'
        );
    }

    // Move this question into the main panel
    $q.appendTo("#shopping-main");

    // Add item counter above this question
    if (!jQuery("#counter-" + qid).length) {
        $q.before('<div id="counter-' + qid + '" style="margin:8px 0 4px;font-weight:600;color:#555;">' +
                  sec.charAt(0).toUpperCase() + sec.slice(1) + ': <span id="count-' + qid + '">0</span> selected</div>');
    }

    // --- Collect all checked items across ALL category questions ---
    function getAllSelections() {
        var all = [];
        jQuery(".shopping-category-question").each(function() {
            var $catQ = jQuery(this);
            $catQ.find("input[type='checkbox']:checked").each(function() {
                var label = window.getItemLabel(jQuery(this));
                var item = window.ITEM_REGISTRY ? window.ITEM_REGISTRY[label] : null;
                all.push({ label: label, item: item });
            });
        });
        return all;
    }

    // --- Update sidebar with cross-question totals ---
    function updateSidebar() {
        var all = getAllSelections();
        var total = all.length;
        var healthyCount = 0;
        var unhealthyCount = 0;
        var neutralCount = 0;

        all.forEach(function(entry) {
            if (entry.item) {
                if (entry.item.tag === "healthy")   healthyCount++;
                else if (entry.item.tag === "unhealthy") unhealthyCount++;
                else neutralCount++;
            }
        });

        var scorePercent = total > 0 ? Math.round((healthyCount / total) * 100) : 0;

        jQuery("#cart-total").text(total + " item" + (total !== 1 ? "s" : "") + " in cart");

        jQuery("#cart-health").html(
            '<span style="color:#2d7a2d;">🟢 Healthy: ' + healthyCount + '</span> &nbsp;' +
            '<span style="color:#888;">⚪ Neutral: ' + neutralCount + '</span> &nbsp;' +
            '<span style="color:#c0392b;">🔴 Unhealthy: ' + unhealthyCount + '</span><br>' +
            '<strong>Health score: ' + scorePercent + '%</strong>'
        );

        // Group selected items by category for sidebar list
        var grouped = {};
        all.forEach(function(entry) {
            var cat = entry.item ? entry.item.category : "other";
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(entry.label);
        });

        var html = "";
        Object.keys(grouped).sort().forEach(function(cat) {
            html += '<li style="list-style:none;font-weight:600;margin-top:6px;">' +
                    cat.charAt(0).toUpperCase() + cat.slice(1) + '</li>';
            grouped[cat].forEach(function(label) {
                html += '<li>' + label + '</li>';
            });
        });

        jQuery("#selected-items").html(html);

        // Write embedded data
        Qualtrics.SurveyEngine.setEmbeddedData("health_score", scorePercent);
        Qualtrics.SurveyEngine.setEmbeddedData("total_items", total);
        Qualtrics.SurveyEngine.setEmbeddedData("healthy_items", healthyCount);
    }

    // --- Update this question's own counter + sidebar ---
    function updateDisplay() {
        var $checked = $q.find("input[type='checkbox']:checked");
        jQuery("#count-" + qid).text($checked.length);

        // Per-category embedded data
        var items = [];
        $checked.each(function() {
            items.push(window.getItemLabel(jQuery(this)));
        });
        try {
            Qualtrics.SurveyEngine.setEmbeddedData(sec + "_count", $checked.length);
            Qualtrics.SurveyEngine.setEmbeddedData(sec + "_labels", items.join(", "));
        } catch(e) {}

        updateSidebar();
    }

    // Mark this question so getAllSelections() can find it
    $q.addClass("shopping-category-question");

    // Listen for changes
    $q.on("change", "input[type='checkbox']", function() {
        updateDisplay();
    });

    // Listen for pre-selection trigger from Q1
    $q.on("cart:update", function() {
        updateDisplay();
    });

    // Initial display
    updateDisplay();
});

Qualtrics.SurveyEngine.addOnPageSubmit(function() {
    var qid = this.questionId;
    var $q = jQuery("#" + qid);

    var qLabel = "";
    try { qLabel = this.getQuestionInfo().QuestionText; } catch(e) {}
    if (!qLabel) qLabel = "unknown";
    var sec = jQuery("<div>").html(qLabel).text()
                  .trim().toLowerCase().replace(/\W+/g, "_");

    var $checked = $q.find("input[type='checkbox']:checked");
    var items = [];
    $checked.each(function() {
        var id = jQuery(this).attr("id");
        var label = id ? jQuery("label[for='" + id + "']").filter("[id$='-label']").text().trim() : "";
        if (!label) label = jQuery(this).closest("li").text().trim();
        items.push(label || "Item");
    });

    Qualtrics.SurveyEngine.setEmbeddedData(sec + "_count", $checked.length);
    Qualtrics.SurveyEngine.setEmbeddedData(sec + "_labels", items.join(", "));
    console.log("onPageSubmit:", sec, $checked.length, "items");
});

Qualtrics.SurveyEngine.addOnUnload(function() {
    jQuery("#" + this.questionId).off("change cart:update");
});