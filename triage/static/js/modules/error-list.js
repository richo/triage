Triage.modules.errorList = (function($, app) {
	"use strict";

	var currentSelection = null;

	var changeSelection = function(selected) {
		selected = $(selected);

		selected.siblings().removeClass('error-active');
		selected.addClass('error-active');

		if (selected.is(':first-child'))
			$('body').scrollTop(0);
		else if (selected.is(':last-child'))
			$('body').scrollTop($('body').height());			
		else {
			if (selected.offset().top < $('body').scrollTop())
				$('body').scrollTop(selected.offset().top);
			
			if (selected.offset().top > $('.pane').offset().top)
				$('body').scrollTop($('body').scrollTop() + selected.height());
		}

		currentSelection = selected.data('errorid');
		app.trigger('errorlist.selection.changed', selected);
	}

	var activateSelection = function() {
		app.trigger('errorlist.selection.activated');
	};

	var _moveItem = function(action) {
		action = action || 'down';
		var current = $('.error-list tr.error-active');

		if (!current.length) {
			changeSelection($('.error-list tr:first-child'));
		}
		else if (action == 'down' && current.next().length) {
			changeSelection(current.next());
		}
		else if (action == 'up' && current.prev().length) {
			changeSelection(current.prev());
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

			$('.error-list').on('click', '.error-list tr', function() {
				changeSelection(this);
				activateSelection();
			});

			app.on('pane.tag.remove', function(tag){
				$('.label-'+tag).fadeOut();
			});
		},
		stop: function() { },
		currentHash: null
	};
});

Triage.modules.errorList.autoRegister = true;
