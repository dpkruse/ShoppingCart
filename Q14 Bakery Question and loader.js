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
    // Strip emoji and leading/trailing underscores so "🥛 Dairy, Eggs & Fridge" → "dairy_eggs_fridge"
    var qLabel = "";
    try { qLabel = this.getQuestionInfo().QuestionText; } catch(e) {}
    if (!qLabel) qLabel = "unknown";
    var sec = jQuery("<div>").html(qLabel).text()
                  .trim().toLowerCase()
                  .replace(/\W+/g, "_")
                  .replace(/^_+|_+$/g, "")
                  .replace(/_+/g, "_");
    console.log("Category question loaded — sec:", sec, "| qid:", qid);

    // Store sec on the element so getAllSelections() can read it as fallback
    $q.attr("data-sec", sec);

    // --- Build shared layout once ---
    if (!jQuery("#shopping-layout").length) {
        $q.before(
            '<div id="shopping-layout" style="display:flex;gap:16px;align-items:flex-start;">' +
                '<div id="shopping-main" style="flex:1;"></div>' +
                '<div id="shopping-sidebar" style="width:280px;border:1px solid #ccc;padding:12px;' +
                     'border-radius:8px;background:#fafafa;position:relative;">' +
                    '<div style="font-weight:700;margin-bottom:8px;">&#x1F6D2; Your cart</div>' +
                    '<div id="cart-total" style="margin-bottom:4px;font-weight:600;">0 / 30 items</div>' +
                    '<div id="cart-requirement" style="margin-bottom:8px;font-size:12px;color:#b8860b;' +
                         'background:#fffbe6;border:1px solid #ffe58f;border-radius:4px;padding:4px 8px;">' +
                        'Please select exactly 30 items to continue.' +
                    '</div>' +
                    '<div id="cart-health" style="margin-bottom:10px;font-size:13px;"></div>' +
                    '<ul id="selected-items" style="padding-left:18px;margin:0;font-size:13px;"></ul>' +
                    '<button id="cart-next-btn" type="button" ' +
                         'style="width:100%;margin-top:14px;padding:10px;background:#ccc;color:#fff;' +
                         'border:none;border-radius:6px;font-size:14px;font-weight:600;cursor:not-allowed;">' +
                        'Continue (0 / 30 selected)' +
                    '</button>' +
                '</div>' +
            '</div>'
        );

        // Hide native Next button — our custom sidebar button handles advancement.
        self.hideNextButton();
        jQuery('#cart-next-btn').on('click', function() {
            if (!jQuery(this).data('ready')) return;
            try { self.clickNextButton(); } catch(e) { jQuery('#NextButton').show().click(); }
        });

        // Sticky sidebar via margin-top on scroll.
        // position:sticky breaks in Qualtrics when an ancestor has overflow:hidden.
        // Adjusting margin-top achieves the same visual effect without requiring a
        // clean overflow context.
        jQuery(window).on("scroll.stickyCart resize.stickyCart", function() {
            var layout  = document.getElementById("shopping-layout");
            var sidebar = document.getElementById("shopping-sidebar");
            if (!layout || !sidebar) return;
            var TOP_GAP    = 20;
            var layoutRect = layout.getBoundingClientRect();
            var mt = Math.max(0, Math.min(
                TOP_GAP - layoutRect.top,
                layoutRect.height - sidebar.offsetHeight
            ));
            sidebar.style.marginTop = mt + "px";
        });
    }

    // Move this question into the main panel
    $q.appendTo("#shopping-main");

    // Add item counter above this question
    if (!jQuery("#counter-" + qid).length) {
        $q.before('<div id="counter-' + qid + '" style="margin:8px 0 4px;font-weight:600;color:#555;">' +
                  sec.charAt(0).toUpperCase() + sec.slice(1) + ': <span id="count-' + qid + '">0</span> selected</div>');
    }

    // --- Check if a single checkbox is selected ---
    // applyAllPreselections explicitly syncs $cb.prop("checked") after every setChoiceValue()
    // call, so the DOM is always the authoritative state for both preselected and
    // user-modified items. User clicks also update the DOM directly.
    function isChoiceSelected(engine, $cb) {
        return $cb.prop("checked");
    }

    // --- Collect all checked items across ALL category questions ---
    function getAllSelections() {
        var all = [];
        jQuery(".shopping-category-question").each(function() {
            var $catQ = jQuery(this);
            var catQid = $catQ.attr("id");
            var qSec = $catQ.attr("data-sec") || "unknown";
            var engine = (window._questionEngines || {})[catQid];
            $catQ.find("input[type='checkbox']").each(function() {
                var $cb = jQuery(this);
                if (!isChoiceSelected(engine, $cb)) return;
                var label = window.getItemLabel($cb);
                var item = window.ITEM_REGISTRY ? window.ITEM_REGISTRY[label] : null;
                all.push({ label: label, item: item, sec: qSec });
            });
        });
        return all;
    }

    // Title-case a category key (e.g. "dairy_eggs_fridge" -> "Dairy Eggs Fridge")
    function formatCat(cat) {
        return cat.replace(/_/g, " ").replace(/\b\w/g, function(c) { return c.toUpperCase(); });
    }

    // --- Disable unchecked checkboxes when at the 30-item limit ---
    function enforceLimit() {
        var total = getAllSelections().length;
        var atMax = total >= maxItems;
        jQuery(".shopping-category-question").each(function() {
            var $catQ = jQuery(this);
            var catQid = $catQ.attr("id");
            var engine = (window._questionEngines || {})[catQid];
            $catQ.find("input[type='checkbox']").each(function() {
                var $cb = jQuery(this);
                if (!isChoiceSelected(engine, $cb)) {
                    $cb.prop("disabled", atMax);
                    $cb.closest("li").css("opacity", atMax ? "0.45" : "");
                }
            });
        });
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
                if (entry.item.tag === "healthy")        healthyCount++;
                else if (entry.item.tag === "unhealthy") unhealthyCount++;
                else                                     neutralCount++;
            }
        });

        var scorePercent = total > 0 ? Math.round((healthyCount / total) * 100) : 0;
        var atMax        = total >= maxItems;

        // Cart total — amber while building toward 30, green when exactly 30
        var totalStyle = atMax
            ? 'color:#2d7a2d;font-weight:bold;'
            : 'color:#b8860b;font-weight:bold;';
        var checkmark = atMax ? ' &#x2713;' : '';
        jQuery("#cart-total").html(
            '<span style="' + totalStyle + '">' + total + ' / ' + maxItems + ' items' + checkmark + '</span>'
        );

        // Requirement notice — hidden once the participant reaches 30
        if (atMax) {
            jQuery("#cart-requirement").hide();
        } else {
            jQuery("#cart-requirement").show();
        }

        jQuery("#cart-health").html(
            '<span style="color:#2d7a2d;">&#x1F7E2; Healthy: ' + healthyCount + '</span> &nbsp;' +
            '<span style="color:#888;">&#x26AA; Neutral: ' + neutralCount + '</span> &nbsp;' +
            '<span style="color:#c0392b;">&#x1F534; Unhealthy: ' + unhealthyCount + '</span><br>' +
            '<strong>Health score: ' + scorePercent + '%</strong>'
        );

        // Group selected items by category for sidebar list.
        // Use entry.item.category when available; fall back to the question's own
        // section key (data-sec) so items never appear under "other".
        var grouped = {};
        all.forEach(function(entry) {
            var cat = entry.item ? entry.item.category : entry.sec;
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(entry.label);
        });

        var html = "";
        Object.keys(grouped).sort().forEach(function(cat) {
            html += '<li style="list-style:none;font-weight:600;margin-top:6px;">' +
                    formatCat(cat) + '</li>';
            grouped[cat].forEach(function(label) {
                html += '<li>' + label + '</li>';
            });
        });

        jQuery("#selected-items").html(html);

        // Update custom Next button
        var $btn = jQuery('#cart-next-btn');
        if ($btn.length) {
            if (atMax) {
                $btn.text('Continue →').data('ready', true)
                    .css({ background: '#2d7a2d', cursor: 'pointer' });
            } else {
                $btn.text('Continue (' + total + ' / 30 selected)').data('ready', false)
                    .css({ background: '#ccc', cursor: 'not-allowed' });
            }
        }

        // Write embedded data
        Qualtrics.SurveyEngine.setEmbeddedData("health_score", scorePercent);
        Qualtrics.SurveyEngine.setEmbeddedData("total_items", total);
        Qualtrics.SurveyEngine.setEmbeddedData("healthy_items", healthyCount);
    }

    // --- Update this question's own counter + sidebar + limit ---
    function updateDisplay() {
        var count = 0;
        var items = [];
        $q.find("input[type='checkbox']").each(function() {
            var $cb = jQuery(this);
            if (!isChoiceSelected(self, $cb)) return;
            count++;
            items.push(window.getItemLabel($cb));
        });

        jQuery("#count-" + qid).text(count);
        updateSidebar();
        enforceLimit();
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
    window._pageSubmitting = true;
    var qid = this.questionId;
    var $q = jQuery("#" + qid);
    var qLabel = "";
    try { qLabel = this.getQuestionInfo().QuestionText; } catch(e) {}
    if (!qLabel) qLabel = "unknown";
    var sec = jQuery("<div>").html(qLabel).text()
                  .trim().toLowerCase()
                  .replace(/\W+/g, "_")
                  .replace(/^_+|_+$/g, "")
                  .replace(/_+/g, "_");
    var count = 0;
    var items = [];
    $q.find("input[type='checkbox']:checked").each(function() {
        count++;
        items.push(window.getItemLabel(jQuery(this)));
    });
    console.log("[DEBUG Submit] " + sec + " count=" + count + " labels=" + items.join(", "));
    Qualtrics.SurveyEngine.setEmbeddedData(sec + "_count", count);
    Qualtrics.SurveyEngine.setEmbeddedData(sec + "_labels", items.join(", "));
});

Qualtrics.SurveyEngine.addOnUnload(function() {
    jQuery(window).off("scroll.stickyCart resize.stickyCart");
    jQuery("#" + this.questionId).off("change cart:update");
});
