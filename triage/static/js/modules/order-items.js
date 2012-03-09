/*global Triage: true*/

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
				allowEmptyData: true,
				timeout: 2000,
			});

			$list.on("click", function() {
				var
					$parent = $(this).parent(),
					$button = $(this);
				if ($parent.hasClass('active')) {


					if ($parent.hasClass('desc')) {
						self.setAsc($parent, $button);
					} else {
						self.setDesc($parent, $button);
					}
				} else {
					self.setDesc($parent, $button);
					self.orderBy = $parent.data("name");
				}
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
		},
		setDesc: function($parent, $button) {
			var href = $button.attr("href").replace(/(.*)direction=(.*)/i, "$1direction=desc");
			$button.attr('href', href);

			$parent.removeClass('asc');
			$parent.addClass('desc');
		},
		setAsc: function($parent, $button) {
			var href = $button.attr("href").replace(/(.*)direction=(.*)/i, "$1direction=asc");
			$button.attr('href', href);
			$parent.removeClass('desc');
			$parent.addClass('asc');
		}
	};
});

Triage.modules.orderItems.autoRegister = true;
