Triage.modules.errorTabs = (function($, app) {
	"use strict";

	return {
		$container: null,
		show: null,
		start: function() {
			this.$container = $("#error-tabs");
			this.show = this.$container.data("show").toString();

			this.$container.find("a[data-pjax]").pjax();
		},
		updateActive: function() {
			this.$container.find("li").removeClass("active");

			if (this.isShow('hidden')) {
				this.$container.find(".resolved").addClass("active");
			} else if (this.isShow('mine')) {
				this.$container.find(".mine").addClass("active");
			} else {
				this.$container.find(".open").addClass("active");
			}
		},
		stop: function() {

		},
		isShow: function(tab) {
			return this.show.search(tab) > -1;
		}
	};
});

Triage.modules.errorTabs.autoRegister = true;
