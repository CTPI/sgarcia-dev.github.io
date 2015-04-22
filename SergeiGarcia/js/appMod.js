angular.module('appModule', ['ui.router'])
	.config(routerConfig)
	.run(routerSetup);

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function routerConfig($stateProvider, $urlRouterProvider) {
	new WOW().init();
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: './views/home.html',
			controller: 'homeController'
		})
		.state('about', {
			url: '/about',
			templateUrl: './views/about.html',
			controller: 'aboutController'
		})
		.state('skills', {
			url: '/skills',
			templateUrl: './views/skills.html',
			controller: 'skillsController'
		})
		.state('portfolio', {
			url: '/portfolio',
			templateUrl: './views/portfolio.html',
			controller: 'portfolioController'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: './views/contact.html',
			controller: 'contactController'
		});

	$urlRouterProvider.otherwise('/home');
}

routerSetup.$inject = ['$rootScope'];
function routerSetup($rootScope) {
	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		document.getElementById('fade-in-overlay').className = 'nav-cover';
	});

	document.getElementById('menu-toggle').addEventListener("click",
		function () {
			slideout.open();
		}
	);

	var scrollTop = true;
	window.addEventListener('scroll', function() {
		console.log(document.body.scrollTop);
		if (document.body.scrollTop == 0) {
			console.log('bingo!');
			document.getElementById('desktop-navbar').className = 'main-nav-desktop transparent';
			scrollTop = true;
		} else if(scrollTop) {
			document.getElementById('desktop-navbar').className = 'main-nav-desktop';
			scrollTop = false;
		}
	});
}