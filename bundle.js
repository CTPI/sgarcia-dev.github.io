(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require('./common');
require('./components');
angular.module('sgApp', ['sg-components']);
require('./config');
},{"./common":3,"./components":6,"./config":9}],2:[function(require,module,exports){
module.exports = eventFactory;

function eventFactory() {
    return {
        dispatch: function(eventName, data) {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, true, true, data);
            window.dispatchEvent(event);
        },
        listen: function(eventName, callback) {
            window.addEventListener(eventName, function(event) {
                callback(event.detail)
            });
        }
    };
}
},{}],3:[function(require,module,exports){
angular.module('common', [])
    .factory('eventFactory', require('./event-factory'));
},{"./event-factory":2}],4:[function(require,module,exports){
module.exports = MainController;

function MainController(eventFactory) {
    var vm = this;
    this.message = 'Hello';
    vm.openNavSidebar = function () {
        eventFactory.dispatch('openNavSidebar', {
            action: 'open'
        });
    }
}
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
angular.module('sg-components', ['common'])
    .controller('appController', ['eventFactory', require('./app-controller')])
    .directive('fillHeight', require('./behaviour/fill-height-directive'))
    .directive('navbar', require('./navbar/navbar-directive'))
    .directive('navbarSidebar', ['eventFactory', require('./navbar/navbar-sidebar-directive')]);
},{"./app-controller":4,"./behaviour/fill-height-directive":5,"./navbar/navbar-directive":7,"./navbar/navbar-sidebar-directive":8}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
module.exports = navbarSidebar;

function navbarSidebar(eventFactory) {
    return {
        restrict: 'AE',
        link: function(scope, el) {
            eventFactory.listen('openNavSidebar', function(data) {
                if (data.action === 'open' && !el.hasClass('is-open'))
                    el.addClass('is-open');
            });
        }
    }
}
},{}],9:[function(require,module,exports){
angular.module('sgApp')
	.config(function() {
	});
},{}]},{},[1]);
