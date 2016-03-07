module.exports = function sgNavbar() {
	return {
		restrict: 'E',
		templateUrl: 'templates/navbar-template.html',
		link: function(scope, el) {
			console.log(el);
		}
	}
} ;