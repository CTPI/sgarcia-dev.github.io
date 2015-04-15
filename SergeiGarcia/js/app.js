var navbar = $('.navbar');

$(document).scroll(function () {
	if ($(this).scrollTop() > 20) {
		navbar.removeClass('transparent');
	} else {
		navbar.addClass('transparent');
	}
});

$('.scroll-indicator').on('click', function(event) {
	$('html, body').animate({
		scrollTop: $(".bio").offset().top-$('nav').height()
	}, { duration: 700, easing: 'swing' });
});

/* hide the scrollbar
$('html, body').css({
	'overflow': 'hidden',
	'height': '100%'
});*/

console.log('hello');