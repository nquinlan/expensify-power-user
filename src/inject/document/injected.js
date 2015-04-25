(function () {
	var autocompleteSelector = "select[name=currency],select[name=category],select[name=tag],select[name=reportID],select[name=reportSelector]";
	var addPowerComplete = function (target) {
		var target = target || this;

		var $target = $(target);

		$target.data("power-complete", true);

		$target.find(autocompleteSelector).each(function () {
			$(this).selectToAutocomplete();
		});
	};
	var removePowerComplete  = function (target) {
		var target = target || this;

		var $target = $(target);

		// If this wasn't the target of power complete, we don't care
		if($target.data("power-complete") !== true) {
			return;
		}

		$target.find(autocompleteSelector).show().siblings("input.ui-autocomplete-input,span[role=status]").off().remove();
	};
	var uniqueMutations = function (mutationRecords) {
		// Find all the mutation event targets
		var targets = mutationRecords.map(function (record) {
			return record.target;
		});
		// Return all the unique targets
		return $.unique(targets);
	};
	
	var dialogObserver = new MutationObserver(function (mutationRecords) {
		uniqueMutations(mutationRecords).forEach(function (target) {
			// Look for the now visible dialogs and add autocompletion
			$(target).filter(".dialog:visible").each(addPowerComplete);
			$(target).filter(".dialog:hidden").each(removePowerComplete);
		});
	});

	jQuery(function ($) {
		$(".dialog").each(function () {
			dialogObserver.observe(this, {attributes: true});
		});
	});
})();