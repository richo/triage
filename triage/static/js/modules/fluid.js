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

			app.on('nav.newchanges', function(count) {
				window.fluid.requestUserAttention();
				window.fluid.showGrowlNotification({
					title: "Triage: "+count+" new errors",
					description: "Click here to refresh",
					priority: 1, 
					sticky: false,
					identifier: "triage-changes",
					onclick: function() {
						app.trigger('nav.reload');
						if (window.fluid.activate) {
							window.fluid.activate();
						}
					}
				});				
			});

			window.fluid.addDockMenuItem("Refresh current tab", function(){
				app.trigger('nav.reload');
				if (window.fluid.activate) {
					window.fluid.activate();
				}
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
