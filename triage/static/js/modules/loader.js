/*global Triage: true*/

Triage.modules.loader = (function($, app) {
	"use strict";

	return {
		start: function() {
			$('body').ajaxStart(function() {
				$(this).addClass('page-loading');
			});

			$('body').ajaxStop(function() {
				$(this).removeClass('page-loading');
			});
		},
		stop: function() { }
	};
});

Triage.modules.loader.autoRegister = true;
