Qualtrics.SurveyEngine.addOnload(function () {
    // Runs when the page loads.
});

Qualtrics.SurveyEngine.addOnReady(function () {
    var qid = this.questionId;
    var maxItems = 30;
    var $q = jQuery("#" + qid);

    // --- 1. Get question label (e.g., "Bakery") ---
    var qLabel = this.questionText;                                   // legacy
    // var qLabel = this.getQuestionInfo().QuestionText;              // new experience (if needed)

    if (!qLabel) {
        console.error("Cannot read question text for " + qid);
        qLabel = "Unknown";
    }

    var sec = qLabel.trim().toLowerCase().replace(/\W+/g, "_"); // e.g., Bakery → bakery, Dairy/Eggs/Fridge → dairy_eggs_fridge

    // --- 2. Create shared layout only once (this is your old working code) ---
    if (!jQuery("#shopping-layout").length) {
        $q.before(
            '<div id="shopping-layout" style="display:flex;gap:16px;align-items:flex-start;">' +
                '<div id="shopping-main" style="flex:1;">' +
                    '<div id="item-counter" style="margin:10px 0;font-weight:600;">🛒 Items selected: 0 / ' + maxItems + '</div>' +
                '</div>' +
                '<div id="shopping-sidebar" style="width:280px;border:1px solid #ccc;padding:12px;border-radius:8px;background:#fafafa;position:sticky;top:20px;">' +
                    '<div style="font-weight:700;margin-bottom:8px;">Currently selected</div>' +
                    '<div id="selected-count" style="margin-bottom:8px;">0 items</div>' +
                    '<ul id="selected-items" style="padding-left:18px;margin:0;"></ul>' +
                '</div>' +
            '</div>'
        );

        $q.appendTo("#shopping-main");
    }

    function getItemLabel($checkbox) {
        var id = $checkbox.attr("id");
        var label = "";

        if (id) {
            label = jQuery("label[for='" + id + "']").text().trim();
        }

        if (!label) {
            label = $checkbox.closest("li").text().trim();
        }

        return label || "Item";
    }

    // --- 3. Update live display + console logging + embedded data ---
    function updateDisplay() {
        var $checked = $q.find("input[type='checkbox']:checked");
        var totalSelected = $checked.length;
        var items = [];

        $checked.each(function () {
            items.push(getItemLabel(jQuery(this)));
        });

        jQuery("#item-counter").text("🛒 Items selected: " + totalSelected + " / " + maxItems);
        jQuery("#selected-count").text(totalSelected + " selected");

        jQuery("#selected-items").html(
            items.map(function (item) {
                return "<li>" + item + "</li>";
            }).join("")
        );

        if (totalSelected >= maxItems) {
            $q.find("input[type='checkbox']").not(":checked").prop("disabled", true);
        } else {
            $q.find("input[type='checkbox']").prop("disabled", false);
        }

        // --- 4. Console logging for selections ---
        console.log("SECTION:", sec.toUpperCase());
        console.log("Count:", totalSelected);
        console.log("Items:", items);

        // --- 5. Write to embedded data ---
        var labelsStr = items.join(", ");
        console.log("Writing to ED:", sec + "_count =", totalSelected);
        console.log("Writing to ED:", sec + "_labels =", labelsStr);

        try {
            Qualtrics.SurveyEngine.setEmbeddedData(sec + "_count", totalSelected);
            Qualtrics.SurveyEngine.setEmbeddedData(sec + "_labels", labelsStr);
        } catch (e) {
            console.error("Error writing embedded data for " + qid, e);
        }
    }

    updateDisplay();

    $q.on("change", "input[type='checkbox']", function () {
        updateDisplay();
    });
});

Qualtrics.SurveyEngine.addOnUnload(function () {
    var qid = this.questionId;
    jQuery("#" + qid).off("change", "input[type='checkbox']");
});