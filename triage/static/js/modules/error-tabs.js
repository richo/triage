Triage.modules.errorTabs = (function($, app) {
	"use strict";

	return {
		$container: null,
		start: function() {
			this.$container = $("#error-tabs");

			this.updateActive();
		},
		updateActive: function() {
			this.$container.find("li").removeClass("active");

			if (this.isShow('hidden')) {
				this.$container.find(".resolved").addClass("active");
			} else {
				this.$container.find(".open").addClass("active");
			}
		},
		stop: function() {

		},
		isShow: function(tab) {
			return this.$container.data("show").toString().search(tab) > -1;
		}
	};
});

Triage.modules.errorTabs.autoRegister = true;
