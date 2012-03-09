/*global Triage: true*/

Triage.modules.errorNav = (function($, app) {
	"use strict";

	var show = 'open';
	var orderBy = 'date';
	var direction = 'desc';
	var page = 0;
	var search;

	var reloadList = function() {
		page = 0;

		var params = {
			show: show,
			order_by: orderBy, 
			direction: direction,
		};

		if (search) {
			params['search'] = search;
		}

		$.pjax({
			url: window.location.origin + window.location.pathname + '?' + $.param(params),
			container: '.error-list tbody',
			replace: false,
			allowEmptyData: true,
			timeout: 2000,		
		});
	};

	var loadPage = function() {

	};

	var updateShowTabs = function(tab) {

		show = tab.data('name');
		tab.siblings().removeClass('active').addClass('inactive');
		tab.removeClass('inactive').addClass('active');
		reloadList();
	};


	var UpdateOrderTabs = function(tab) {

		orderBy = tab.data('name');

		if (tab.hasClass('active')) {

			if (direction == 'desc') {
				tab.removeClass('desc').addClass('asc');
				direction = 'asc';
			} else {
				tab.removeClass('asc').addClass('desc');
				direction = 'desc';
			}

		} else {
			tab.siblings().removeClass('active').addClass('inactive');
			tab.removeClass('inactive').addClass('active');
			tab.removeClass('asc').removeClass('desc').addClass(direction);
		}

		reloadList();
	};


	return {
		start: function() {

			$('#error-tabs li').on('click', function() { 
				updateShowTabs($(this));
				return false;
			});

			$('#order-items li').on('click', function() { 
				UpdateOrderTabs($(this));
				return false;
			});

			$('#errorlist-search').on('submit', function() {
				search = $(this).find('.searchfield').val();
				reloadList();
				return false;
			});
		},
		stop: function() {

		},
	};
});

Triage.modules.errorNav.autoRegister = true;
