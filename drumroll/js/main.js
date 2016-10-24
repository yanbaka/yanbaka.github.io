$(function() {
	var drumrolls = [];
    drumrolls.push($("#drumroll1").drumroll({
    }));
    drumrolls.push($("#drumroll2").drumroll({
        targetNum: 9,
    }));
    drumrolls.push($("#drumroll3").drumroll({
        loop: 3,
    }));
    drumrolls.push($("#drumroll4").drumroll({
        delay: 1000,
    }));
    drumrolls.push($("#drumroll5").drumroll({
        duration: 2000,
    }));
    drumrolls.push($("#drumroll6").drumroll({
        easing: "easeOutBack",
    }));
    drumrolls.push($("#drumroll7").drumroll({
    	onDrumrollLoad: function() {
    		$("#demo7 .console").html("loaded");
    	},
    	onDrumrollAfter: function() {
    		$("#demo7 .console").html("finished");
    	}
    }));

    $(".demo").each(function(i) {
    	var self = this;
        $("button", this).on("click", function() {
            if($(this).hasClass("play")) {
                drumrolls[i].play();
                $(this).removeClass("play");
                $(this).addClass("reset");
                $(this).html("reset");
            }
            else if($(this).hasClass("reset")) {
                drumrolls[i].reset();
                $(this).removeClass("reset");
                $(this).addClass("play");
                $(this).html("play");
                $(".console", self).html("");
            }
        });
    });
});