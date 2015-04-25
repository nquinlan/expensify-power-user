chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});


var scripts = ["src/inject/document/vendor/jquery.select-to-autocomplete.js", "src/inject/document/injected.js"]

// Inject Scripts
scripts.forEach(function (scriptPath) {
	var scriptSource = chrome.extension.getURL(scriptPath);
	var injector = document.createElement('script');
	injector.setAttribute("src", scriptSource);
	(document.body || document.head || document.documentElement).appendChild(injector);
});