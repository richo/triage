/*global Triage: true*/

Triage.modules.loader = (function($, app) {
	"use strict";

	return {
		start: function() {
			app.on('loader.start', function(text) {
				$('body')
					.addClass('page-loading')
					.find('> .page-loader .progress').addClass('active')
					.find('.bar').text(text);
			});

			app.on('loader.stop', function() {
				$('body')
					.removeClass('page-loading')
					.find('> .page-loader .progress').removeClass('active')
					.find('.bar').text('Loadding...');
			});
		},
		stop: function() { }
	};
});

Triage.modules.loader.autoRegister = true;
