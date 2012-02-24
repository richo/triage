Triage.modules.errorList = (function($, app) {
	"use strict";

	var bindAction = function(self, selector) {
		var $selector = selector || $(self);

		$selector.siblings().removeClass('error-active');
		$selector.addClass('error-active');
	};

	var _moveItem = function(dir) {
		var direction = dir || 'down';
		var current = $('.error-list tr.error-active');

		if (!current.length) {
			bindAction($('.error-list tr:first-child'));
			return false;
		}
		else if (direction == 'down' && current.next().length) {
			bindAction(current.next());
		}
		else if (direction == 'up' && current.prev().length) {
			bindAction(current.prev());
		}

		return false;
	};

	var bindHotKeys = function(self) {
		jwerty.key('↑', function (e) { e.stopPropagation(); return _moveItem('up'); });
		jwerty.key('↓', function (e) { e.stopPropagation(); return _moveItem('down'); });
	};

	return {
		start: function() {
			bindHotKeys(this);

			$(document).on('click', '.error-list tr', function() {
				bindAction();
			});
		},
		stop: function() { },
		currentHash: null
	};
});

Triage.modules.errorList.autoRegister = true;
