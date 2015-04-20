angular.module('appModule', ['ui.router'])
	.config(routerConfig)
	.run(routerSetup);

routerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function routerConfig($stateProvider, $urlRouterProvider){
	new WOW().init();
	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl: './views/home.html',
			controller: 'homeController'
		})
		.state('about', {
			url:'/about',
			templateUrl: './views/about.html',
			controller: 'aboutController'
		})
		.state('skills', {
			url:'/skills',
			templateUrl: './views/skills.html',
			controller: 'skillsController'
		})
		.state('portfolio', {
			url:'/portfolio',
			templateUrl: './views/portfolio.html',
			controller: 'portfolioController'
		})
		.state('contact', {
			url:'/contact',
			templateUrl: './views/contact.html',
			controller: 'contactController'
		});

	$urlRouterProvider.otherwise('/home');
}

routerSetup.$inject = ['$rootScope'];
function routerSetup($rootScope) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		document.getElementById('nav-cover').className = 'nav-cover';
	});
}