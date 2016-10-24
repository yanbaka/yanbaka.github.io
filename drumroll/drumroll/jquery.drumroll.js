"use strict";

(function($) {
	$.fn.drumroll = function(config) {
		var defaults = {
			targetNum: 1,
			loop: 1,
			delay: 0,
			duration: 1000,
			easing: "linear",
			onDrumrollLoad: function() {},
			onDrumrollAfter: function() {}
		};

		var options = $.extend(defaults, config);

		var _self = this;
		var _loop = options.loop;
		var _length = $("img", this).length;
		var _loopValue = _loop*_length;

		this.play = function() {
			var t = (options.targetNum+_loopValue) * -100;
			var delay = options.delay;
			var duration = options.duration;
			var easing = options.easing;
			$(".drumroll_images", _self).delay(delay).animate({top: t+"%"}, {duration: duration, easing: easing, complete: options.onDrumrollAfter});
		};
		this.reset = function() {
			$(".drumroll_images", _self).stop(true, true);
			$(".drumroll_images", _self).css("top", 0);
		};

		return this.each(function() {
			var str = '';
			for(var i=0; i<_loop+1; i++) {
				$("img", this).each(function() {
					str += '<img src="'+$(this).attr("src")+'">';
				});
			}
			$(this).empty();
			$(this).append($(str));
			$("img", this).wrapAll('<div class="drumroll_container"><div class="drumroll_images"></div></div>');
			var clone = $(".drumroll_images img:first-child", this).clone();
			clone.addClass("dummy");
			clone.prependTo($('.drumroll_container', this));

			var total = $(this).find("img").length;
			var cnt = 0;
			$("img", this).one("load", function() {
				cnt++;
				if(cnt >= total) {
					options.onDrumrollLoad();
				}
			});
		});
	};
})(jQuery);