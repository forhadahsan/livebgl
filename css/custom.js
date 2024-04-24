(function() {
	'use strict';

	var tinyslider = function() {
		var el = document.querySelectorAll('.testimonial-slider');

		if (el.length > 0) {
			var slider = tns({
				container: '.testimonial-slider',
				items: 1,
				axis: "horizontal",
				controlsContainer: "#testimonial-nav",
				swipeAngle: false,
				speed: 700,
				nav: true,
				controls: true,
				autoplay: true,
				autoplayHoverPause: true,
				autoplayTimeout: 3500,
				autoplayButtonOutput: false
			});
		}
	};
	tinyslider();

	


	var sitePlusMinus = function() {

		var value,
    		quantity = document.getElementsByClassName('quantity-container');

		function createBindings(quantityContainer) {
	      var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0];
	      var increase = quantityContainer.getElementsByClassName('increase')[0];
	      var decrease = quantityContainer.getElementsByClassName('decrease')[0];
	      increase.addEventListener('click', function (e) { increaseValue(e, quantityAmount); });
	      decrease.addEventListener('click', function (e) { decreaseValue(e, quantityAmount); });
	    }

	    function init() {
	        for (var i = 0; i < quantity.length; i++ ) {
						createBindings(quantity[i]);
	        }
	    };

	    function increaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        console.log(quantityAmount, quantityAmount.value);

	        value = isNaN(value) ? 0 : value;
	        value++;
	        quantityAmount.value = value;
	    }

	    function decreaseValue(event, quantityAmount) {
	        value = parseInt(quantityAmount.value, 10);

	        value = isNaN(value) ? 0 : value;
	        if (value > 0) value--;

	        quantityAmount.value = value;
	    }
	    
	    init();
		
	};
	sitePlusMinus();


})()


//  slide js start 

$(function() {

	//for slick slider
	$('.slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		centerMode: true,
		arrows: false,
		autoplay: true,
	});

	$(".slider .slick-dots").append("<li class='animated-dot'><li>");

	$(".slick-dots .animated-dot").click(function() {
		$(this).toggleClass("play");
		if ($(this).hasClass("play")) {
			isPause = true;
			$(this).css('background-image', 'url(https://img.icons8.com/plasticine/100/000000/pause.png)');
			$('.slider').slick('slickPause');
			$bar.css({
				width: 100 + "%"
			});
		} else {
			isPause = false;
			$(this).css('background-image', '');
			$('.slider').slick('slickPlay');
		}
	});


	var time = 2;
	var $bar,
		isPause,
		tick,
		percentTime;

	$bar = $('.slider-progress .progress');

	function startProgressbar() {
		resetProgressbar();
		percentTime = 0;
		isPause = false;
		tick = setInterval(interval, 10);
	}

	function interval() {
		if ($(".slick-dots .animated-dot").hasClass("play")) {
			isPause = true;
		}
		if (isPause === false) {
			percentTime += 1 / (time + 0.1);
			$bar.css({
				width: percentTime + "%"
			});
			if (percentTime >= 100) {
				$(".slider").slick('slickNext');
				startProgressbar();
			}
		}
	}

	function resetProgressbar() {
		$bar.css({
			width: 0 + '%'
		});
		clearTimeout(tick);
	}

	startProgressbar();

	$(".slider").on("beforeChange", function() {
		resetProgressbar();
		startProgressbar();
		$bar.css({
			width: 100 + "%"
		});
	});

});