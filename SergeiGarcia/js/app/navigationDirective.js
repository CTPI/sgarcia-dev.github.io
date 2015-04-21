angular.module('appModule')
	.directive('navAnimate', navAnimateFunc);

navAnimateFunc.$inject = ['$state', '$timeout'];
function navAnimateFunc($state, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			function navigateTo() {
				$state.go(attrs.state);
			}
			element.bind('click', function() {
				if ($state.current.name == attrs.state) {
					return;
				}
				document.getElementById("fade-in-overlay").className = 'nav-cover active';
				slideout.close();
				$timeout(navigateTo,500);
			});
		}
	};
}

var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 256,
	'tolerance': 70
});