/*global Triage: true*/

Triage.modules.fluid = (function($, app) {
	"use strict";

	return {
		start: function() {
		
			app.on('system.activecountchanged', function(count) {

				if (count) {
					window.fluid.dockBadge = count+"";
				}
				else {
					window.fluid.dockBadge = "";
				}
			});

			window.fluid.addDockMenuItem("Refresh current tab", function(){
				alert('refreshed');
			});

			window.fluid.addDockMenuItem("Mark all as read", function(){
				alert('All read');
			});

			window.fluid.addDockMenuItem("Mark all as unread", function(){
				alert('All unread');
			});

		},
		stop: function() {

		},
	};
});

if (window && window.fluid) {
	Triage.modules.fluid.autoRegister = true;
}
