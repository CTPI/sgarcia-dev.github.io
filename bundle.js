(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./components');
angular.module('sgApp', ['sg-components']);
require('./config');
},{"./components":2,"./config":4}],2:[function(require,module,exports){
angular.module('sg-components', [])
	.directive('sgNavbar', [require('./navbar/navbar-directive')]);
},{"./navbar/navbar-directive":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
angular.module('sgApp')
	.config(function() {

	});
},{}]},{},[1]);
