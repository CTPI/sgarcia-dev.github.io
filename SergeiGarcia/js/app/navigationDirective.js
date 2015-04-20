angular.module('appModule')
	.directive('navAnimate', navAnimateFunc);

navAnimateFunc.$inject = ['$state', '$timeout'];
function navAnimateFunc($state, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			function navigateTo() {
				$state.go(attrs.navTo);
			}
			element.bind('click', function() {
				document.getElementById("nav-cover").className = 'nav-cover active';
				$timeout(navigateTo,500);
			});
		}
	};
}