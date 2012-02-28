Triage.modules.orderItems = (function($, app) {
	"use strict";

	return {
		$container: null,
		orderBy: null,
		start: function() {
			var self = this;

			this.$container = $("#order-items");

			this.orderBy = this.$container.data("orderby").toString();

			var $list = this.$container.find("a");

			$list.pjax(".error-list tbody", {
				replace: false,
				allowEmptyData: true
			});

			$list.on("click", function() {
				self.orderBy = $(this).parent().data("name");
			});

			$(".error-list tbody").on("pjax:end", function(e){
				self.updateActive();
			});
		},
		updateActive: function() {
			this.$container.find("li").removeClass("active");

			if (this.isOrderBy('occurances')) {
				this.$container.find("[data-name='occurances']").addClass("active");
			} else if (this.isOrderBy('activity')) {
				this.$container.find("[data-name='activity']").addClass("active");
			} else {
				this.$container.find("[data-name='date']").addClass("active");
			}
		},
		stop: function() {

		},
		isOrderBy: function(name) {
			return this.orderBy.search(name) > -1;
		}
	};
});

Triage.modules.orderItems.autoRegister = true;
