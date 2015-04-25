(function () {
	var autocompleteSelector = "select[name=currency],select[name=category],select[name=tag],select[name=reportID],select[name=reportSelector]";
	var mutationHandler = function (mutationRecords) {
		// Find all the mutation event targets
		var targets = mutationRecords.map(function (record) {
			return record.target;
		});
		// Loop through all the unique targets
		$.unique(targets).forEach(function (target) {
			// Look for the now visible dialogs and add autocompletion
			$(target).filter(".dialog:visible").data("power-complete", true).each(function () {
				var $this = $(this);

				$this.find(autocompleteSelector).each(function () {
					$this.selectToAutocomplete();
				});
			});
			$(target).filter(".dialog:hidden").each(function () {
				var $this = $(this);
				// If this wasn't the target of power complete, we don't care
				if($this.data("power-complete") !== true) {
					return;
				}
				$this.find(autocompleteSelector).show().siblings("input.ui-autocomplete-input,span[role=status]").off().remove();
			});
		});
	};
	var observer = new MutationObserver(mutationHandler);
	jQuery(function ($) {
		$(".dialog").each(function () {
			observer.observe (this, {attributes: true});
		});
	});
})();