(function ($) {
	"use strict";

	// ================== Navbar Dropdown ==================
	if ($(window).width() < 992) {
		$('.navbar .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
	}

	// ================== Scroll to top ==================
	$(window).on('scroll', function () {
		if ($('#back-to-top').length) {
			var scrollToTop = $('#back-to-top'),
				scroll = $(window).scrollTop();
			if (scroll >= 200) {
				scrollToTop.fadeIn(200);
			} else {
				scrollToTop.fadeOut(100);
			}
		}
	});

	if ($('#back-to-top').length) {
		$('#back-to-top').on('click', function () {
			$('body,html').animate({ scrollTop: 0 }, 600);
			return false;
		});
	}

	// ================== Date picker ==================
	function datepicker() {
		if ($('#datepicker').length) {
			$('#datepicker').datepicker();
		}
	}

	// ================== Hero Slider ==================
	$('.hero-slider').slick({
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		infinite: true,
		speed: 300,
		dots: true,
		arrows: true,
		fade: true,
		responsive: [{
			breakpoint: 600,
			settings: { arrows: false }
		}]
	});
	$('.hero-slider').slickAnimation();

	// ================== Item Slider ==================
	$('.items-container').slick({
		infinite: true,
		arrows: true,
		autoplay: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{ breakpoint: 991, settings: { slidesToShow: 2, arrows: false } },
			{ breakpoint: 525, settings: { slidesToShow: 1, arrows: false } }
		]
	});

	// ================== Testimonial Slider ==================
	$('.testimonial-carousel').slick({
		infinite: true,
		arrows: false,
		slidesToShow: 2,
		dots: true,
		slidesToScroll: 2,
		responsive: [
			{ breakpoint: 991, settings: { slidesToShow: 2 } },
			{ breakpoint: 525, settings: { slidesToShow: 1 } }
		]
	});

	// ================== FancyBox Video ==================
	if ($('[data-fancybox]').length) {
		$('[data-fancybox]').fancybox({
			youtube: { controls: 0, showinfo: 0 },
			vimeo: { color: 'f00' }
		});
	}

	// ================== Google Maps с автопоиском ==================
	let map, marker, geocoder;

	window.initMap = function () {
		const bishkek = { lat: 42.8746, lng: 74.5698 };
		map = new google.maps.Map(document.getElementById("map"), {
			zoom: 12,
			center: bishkek
		});

		marker = new google.maps.Marker({
			map: map,
			position: bishkek
		});

		geocoder = new google.maps.Geocoder();

		// Подключаем автоподсказку
		const input = document.getElementById("map-search-input");
		const autocomplete = new google.maps.places.Autocomplete(input);
		autocomplete.bindTo("bounds", map);

		autocomplete.addListener("place_changed", function () {
			const place = autocomplete.getPlace();
			if (!place.geometry) {
				alert("Адрес не найден!");
				return;
			}
			map.setCenter(place.geometry.location);
			map.setZoom(15);
			marker.setPosition(place.geometry.location);
		});

		// ================== Поиск по Enter ==================
		input.addEventListener("keydown", function (e) {
			if (e.key === "Enter") {
				e.preventDefault();
				const address = input.value;
				if (!address) return;
				geocoder.geocode({ address: address }, function (results, status) {
					if (status === "OK") {
						map.setCenter(results[0].geometry.location);
						map.setZoom(15);
						marker.setPosition(results[0].geometry.location);
					} else {
						alert("Адрес не найден: " + status);
					}
				});
			}
		});
	};

	// ================== Когда документ загружен ==================
	$(window).on('load', function () {
		(function ($) {
			datepicker();
		})(jQuery);
	});

})(window.jQuery);
