Triage.modules.infiniteScroll = (function($, app) {
	"use strict";

	return {
		start: function() {

			$(window).scroll(function(){
					if  ($(window).scrollTop() == $(document).height() - $(window).height()){
						console.log('here');
					}
			});
		},
		stop: function() {

		},
	};
});

Triage.modules.infiniteScroll.autoRegister = true;



 