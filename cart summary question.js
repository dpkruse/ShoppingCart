Qualtrics.SurveyEngine.addOnload(function() {});

Qualtrics.SurveyEngine.addOnReady(function() {
    var self = this;

    // Hide native navigation buttons — replaced by custom buttons in the HTML body
    self.hideNextButton();
    jQuery('#PreviousButton').hide();

    jQuery('#summary-back-btn').on('click', function() {
        jQuery('#PreviousButton').show().click();
    });

    jQuery('#summary-submit-btn').on('click', function() {
        try { self.clickNextButton(); } catch(e) { jQuery('#NextButton').show().click(); }
    });
});
