angular.module('sg-components', ['common'])
    .controller('appController', ['eventFactory', require('./app-controller')])
    .directive('fillHeight', require('./behaviour/fill-height-directive'))
    .directive('navbar', require('./navbar/navbar-directive'))
    .directive('navbarSidebar', ['eventFactory', require('./navbar/navbar-sidebar-directive')]);