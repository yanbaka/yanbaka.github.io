"use strict";

(function($) {
    $.fn.lens = function(config) {
        var defaults = {
            lens_size: 200
        };

        var options = $.extend(defaults, config);

        return this.each(function() {

            var lens_size = options.lens_size;
            var lens_size_half = lens_size/2;

            var _this = $(this);
            var lens_wrap = $('<div class="lens_wrap">');
            _this.wrap(lens_wrap);
            
            var lens_image_src = _this.attr("src");
            var lens_image = $('<img>');
            lens_image.addClass("lens_image");

            lens_image.load(function() {
                var img = new Image();
                img.src = this.src;
                var img_w = img.width;
                var img_h = img.height;
                
                var lens_image_wrap = $('<div class="lens_image_wrap">');
                lens_image_wrap.css("width", lens_size+"px");
                lens_image_wrap.css("height", lens_size+"px");
                lens_image_wrap.css("border-radius", lens_size+"px");
                lens_image_wrap.append(this);

                var base = _this.parent();

                base.append(lens_image_wrap);

                var tw = base.width();
                var th = base.height();
                var lens_image_obj = $(".lens_image", base);
                var lens_image_wrap_obj = $(".lens_image_wrap", base);

                base.mousemove(function(e) {
                    var current = e.currentTarget;
                    var currentOffsetX = $(current).offset().left;
                    var currentOffsetY = $(current).offset().top;
                    var mx = e.pageX - currentOffsetX;
                    var my = e.pageY - currentOffsetY;
                    var ox = mx/tw;
                    var oy = my/th;
                    var ax = ox*(-img_w)+lens_size_half;
                    var ay = oy*(-img_h)+lens_size_half;
                    lens_image_obj.css("margin-left", ax);
                    lens_image_obj.css("margin-top", ay);
                    lens_image_wrap_obj.css("left", mx-lens_size_half);
                    lens_image_wrap_obj.css("top", my-lens_size_half);
                });
            });
            lens_image.attr("src", lens_image_src);
        });
    };
})(jQuery);