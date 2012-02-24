Triage.modules.errorList = (function($, app) {
	"use strict";

	return {
		start: function() {
			$(document).on('click', '.error-list tr', function(e) {
				var $selector = $(this);

				$selector.siblings().removeClass('error-active');
				$selector.addClass('error-active');
			});
		},
		stop: function() { }
	};
});

Triage.modules.errorList.autoRegister = true;
