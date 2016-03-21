(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require('./components');
angular.module('sgApp', ['sg-components']);
require('./config');
},{"./components":3,"./config":5}],2:[function(require,module,exports){
module.exports = fillHeight;

function fillHeight() {
    return {
        restrict: 'A',
        link: function(scope, el) {
            var height = Math.max(window.innerHeight, document.documentElement.clientHeight || 0);
            el.css('height', height + 'px');
        }
    }
}
},{}],3:[function(require,module,exports){
angular.module('sg-components', [])
    .directive('fillHeight', require('./behaviour/fill-height-directive'))
    .directive('navbar', require('./navbar/navbar-directive'));
},{"./behaviour/fill-height-directive":2,"./navbar/navbar-directive":4}],4:[function(require,module,exports){
module.exports = navbar;

function navbar() {
    return {
        restrict: 'AEC',
        link: function (scope, el) {
            var height = Math.max(window.innerHeight, document.documentElement.clientHeight || 0) - el[0].offsetHeight,
                isStatic = false;
            window.addEventListener('scroll', function() {
                if (window.scrollY > height && !isStatic) {
                    el.addClass('is-static');
                    isStatic = true;
                } else if (isStatic && window.scrollY < height) {
                    el.removeClass('is-static');
                    isStatic = false;
                }
            });
        }
    };
}
},{}],5:[function(require,module,exports){
angular.module('sgApp')
	.config(function() {
	});
},{}]},{},[1]);
