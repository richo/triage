Triage.modules.pane = (function($, app) {
	"use strict";

	var openAction = function(self, trigger) {
		var $trigger = trigger || $(self).parent(),
			$pane = $trigger.parents('.pane');

		$trigger.siblings().removeClass('pane-active');
		$trigger.addClass('pane-active');
		$pane.addClass('pane-open');
		$('body').addClass('pane-open');

	};

	var closeAction = function(self, trigger) {
		var $trigger = trigger || $(self).parent(),
			$pane = $trigger.parents('.pane');

		$trigger.removeClass('pane-active');
		$pane.removeClass('pane-open');
		$('body').removeClass('pane-open');

	};

	var bindActions = function(self) {
		var $trigger = $(self).parent();

		if ($trigger.hasClass('pane-active'))
			closeAction(self, $trigger);
		else
			openAction(self, $trigger);
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
				var $trigger = $(e.target);

				if (!$trigger.hasClass('pane') && !$trigger.parents('.pane').length)
					closeAction($('.pane .pane-actions a:first-child'));
			});

			if ($.cookie('pane-size'))
				$('.pane .pane-container').height($.cookie('pane-size'));

		},
		stop: function() { }
	};
});

Triage.modules.pane.autoRegister = true;
