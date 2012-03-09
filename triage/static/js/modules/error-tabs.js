/*global Triage: true*/

Triage.modules.errorTabs = (function($, app) {
	"use strict";

	return {
		$container: null,
		show: null,
		start: function() {
			var self = this;

			this.$container = $("#error-tabs");

			this.show = this.$container.data("show").toString();

			var $list = this.$container.find("a");

			$list.pjax(".error-list tbody", {
				replace: false,
				allowEmptyData: true,
				timeout: 10000,
			});

			$list.on("click", function() {
				self.show = $(this).parent().data("name");
			});

			$(".error-list tbody").on("pjax:end", function(e){
				self.updateActive();
			});
		},
		updateActive: function() {
			this.$container.find("li").removeClass("active");

			if (this.isShow('resolved')) {
				this.$container.find("[data-name='resolved']").addClass("active");
			} else if (this.isShow('mine')) {
				this.$container.find("[data-name='mine']").addClass("active");
			} else {
				this.$container.find("[data-name='open']").addClass("active");
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
