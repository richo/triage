Triage.modules.pane = (function($, app) {
	"use strict";

	var openAction = function(self, selector) {
		var $selector = selector || $(self).parent(),
			$pane = $selector.parents('.pane');

		$selector.siblings().removeClass('pane-active');
		$selector.addClass('pane-active');
		$pane.addClass('pane-open');
		$('body').addClass('pane-open');

	};

	var closeAction = function(self, selector) {
		var $selector = selector || $(self).parent(),
			$pane = $selector.parents('.pane');

		$selector.removeClass('pane-active');
		$pane.removeClass('pane-open');
		$('body').removeClass('pane-open');

	};

	var bindActions = function(self) {
		var $selector = $(self).parent();

		if ($selector.hasClass('pane-active'))
			closeAction(self, $selector);
		else
			openAction(self, $selector);
	};

	return {
		start: function() {

			$('.pane .pane-container').resizable({
				handles: 'n',
				minWidth: 50
			}).on('resize', function (e, ui) {
				$(this).css('top', 'auto');
			}).on('resizestop', function() {
				$.cookie('pane-size', $(this).height());
			});

			$('.pane .pane-actions a').on('click', function() {
				bindActions(this);
			});

			$(document).on('click', 'body.pane-open', function(e) {
				var $selector = $(e.target);

				if (!$selector.hasClass('pane') && !$selector.parents('.pane').length)
					closeAction($('.pane .pane-actions a:first-child'));
			});

			if ($.cookie('pane-size'))
				$('.pane .pane-container').height($.cookie('pane-size'));

		},
		stop: function() { }
	};
});

Triage.modules.pane.autoRegister = true;
