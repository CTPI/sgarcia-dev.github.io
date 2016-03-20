module.exports = sgNavbar;

function sgNavbar() {
	return {
		restrict: 'AEC',
		templateUrl: 'templates/navbar-template.html',
		link: function(scope, el) {
			console.log(el);
		}
	};
}