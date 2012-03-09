/*global Triage: true*/

Triage.modules.errorTabs = (function($, app) {
	"use strict";

	var container;
	var show;

	var isShow = function(tab) {
		return show.search(tab) > -1;
	};

	var updateActive = function() {
		container.find("li").removeClass("active");

		if (isShow('resolved')) {
			container.find("[data-name='resolved']").addClass("active");
		} else if (isShow('mine')) {
			container.find("[data-name='mine']").addClass("active");
		} else {
			container.find("[data-name='open']").addClass("active");
		}
	};

	return {
		start: function() {

			container = $("#error-tabs");

			show = container.data("show").toString();

			var $list = container.find("a");

			$list.pjax(".error-list tbody", {
				replace: false,
				allowEmptyData: true,
				timeout: 2000,
			});

			$list.on("click", function() {
				show = $(this).parent().data("name");
			});

			$(".error-list tbody").on("pjax:end", function(e){
				updateActive();
			});
		},
		stop: function() {

		},
	};
});

Triage.modules.errorTabs.autoRegister = true;
