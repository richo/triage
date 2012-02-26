Triage.modules.pane = (function($, app) {
	"use strict";

	var hidePane = function() {
		$('.pane').removeClass('pane-open');
		$('body').removeClass('pane-open');
		$('.pane-padding').height(0);
		$('.pane').find('.pane-active').removeClass('pane-active');
	};

	var showPane = function() {
		$('.pane').addClass('pane-open');
		$('body').addClass('pane-open');
		$('.pane-padding').height($('.pane').height());
		selectTab();
	};

	var togglePane = function() {
	
		if ($('body').hasClass('pane-open'))
			return hidePane();
		return showPane();
	};

	var selectTab = function(tab) {

		if (!tab) {
			var current = $('.pane .pane-actions li.pane-active');
			if (current.length) {
				tab = current;
			} else {
				tab = $('.pane .pane-actions li:first-child');
			}
		}
		tab = $(tab);
		tab.siblings().removeClass('pane-active');
		tab.addClass('pane-active');
		updateTabPane();	
	};

	var updateTabPane = function() {
		var tab = $('.pane-active');
		if (tab.length) {	
			var active = $('.pane-'+tab.data('view'));
			active.siblings().hide();
			active.show();
		}		
	};

	var bindActions = function(self) {
		var $selector = $(self).parent();

		if ($selector.hasClass('pane-active'))
			hidePane();
		else {
			showPane();
			selectTab($selector);
		}
	};

	var _moveItem = function(action) {
		var current = $('.pane .pane-actions li.pane-active');

		if (action == 'right' && current.next().length) {
			showPane();
			selectTab(current.next());
		}
		else if (action == 'left' && current.prev().length) {
			showPane();
			selectTab(current.prev());
		}
		return false;
	};

	var bindHotKeys = function(self) {
		jwerty.key('←', function (e) { e.stopPropagation(); return _moveItem('left'); });
		jwerty.key('→', function (e) { e.stopPropagation(); return _moveItem('right'); });
		jwerty.key('space', function(e) { e.stopPropagation(); togglePane(); return false; });
	};

	return {
		start: function() {
			bindHotKeys(this);

			$('.pane .pane-container').resizable({
				handles: 'n',
				minWidth: 50
			}).on('resize', function (e, ui) {
				$(this).css('top', 'auto');
			}).on('resizestop', function() {
				$.cookie('pane-size', $(this).height());
				$('.pane-padding').height($(this).height());
			});

			$('.pane .pane-actions a').on('click', function() {
				bindActions(this);
			});

			if ($.cookie('pane-size')) {
				$('.pane .pane-container').height($.cookie('pane-size'));
				$('.pane-padding').height($.cookie('pane-size'));
			}

			app.on('errorlist.selection.activated', function() {
				showPane();
			});

			app.on('errorlist.selection.changed', function(selection) {
				$('.pane .pane-inner').load(selection.data('url'), function(){
					updateTabPane();	
				});
			});

		},
		stop: function() { }
	};
});

Triage.modules.pane.autoRegister = true;
