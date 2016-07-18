(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function sgContactForm() {
	return {
		restrict: 'E',
		templateUrl: 'templates/contact-form-template.html',
		controllerAs: 'sgContactForm',
		controller: function controller() {
			this.debug1 = false;
			this.debug2 = true;
			this.className = 'blue';
			this.name = '';
			this.email = '';
			this.message = 'hello from ngbind!';
			this.onSubmit = function () {
				debugger;
			};
		}
	};
}

module.exports = sgContactForm;

},{}],2:[function(require,module,exports){
'use strict';

angular.module('app').directive('sgContactForm', require('./contact-form-directive'));

},{"./contact-form-directive":1}],3:[function(require,module,exports){
'use strict';

angular.module('app', []);

require('./contact-form');

},{"./contact-form":2}]},{},[3]);
