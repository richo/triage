/*global Triage: true*/

Triage.modules.loader = (function($, app) {
	"use strict";

	return {
		start: function() {
			$('body').ajaxStart(function(text) {
				$(this)
					.addClass('page-loading')
					.find('> .page-loader .progress').addClass('active')
					.find('.bar').text(text);
			});

			$('body').ajaxStop(function() {
				$(this)
					.removeClass('page-loading')
					.find('> .page-loader .progress').removeClass('active')
					.find('.bar').text('Loadding...');
			});
		},
		stop: function() { }
	};
});

Triage.modules.loader.autoRegister = true;
