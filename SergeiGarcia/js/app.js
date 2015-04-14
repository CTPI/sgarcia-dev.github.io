var navbar = $('.navbar');

$(document).scroll(function () {
	if ($(this).scrollTop() > 20) {
		navbar.removeClass('transparent');
	} else {
		navbar.addClass('transparent');
	}
});

console.log('hello');