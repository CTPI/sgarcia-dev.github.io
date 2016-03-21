(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require('./common');
require('./components');
angular.module('sgApp', ['sg-components']);
require('./config');
},{"./common":3,"./components":7,"./config":10}],2:[function(require,module,exports){
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
    .factory('eventFactory', require('./event-factory'))
    .factory('scrollFactory', ['eventFactory', require('./scroll-factory')]);

},{"./event-factory":2,"./scroll-factory":4}],4:[function(require,module,exports){
module.exports = scrollFactory;

function scrollFactory(eventFactory) {
    return {
      scrollTo: smoothScrollTo
    };
    function smoothScrollTo(target, duration, element) {
        if (typeof target !== 'number' && typeof target === 'string') {
            targetEl = document.querySelector(target);
            if (!targetEl)
                return console.error(target + ' is an invalid ID to scroll to');
            target = targetEl.offsetTop;
        }
        element = element || document.body || document.documentElement;
        target = Math.round(target);
        duration = Math.round(duration);
        if (duration < 0) {
            return Promise.reject("bad duration");
        }
        if (duration === 0) {
            element.scrollTop = target;
            return Promise.resolve();
        }

        var start_time = Date.now();
        var end_time = start_time + duration;

        var start_top = element.scrollTop;
        var distance = target - start_top;

        // based on http://en.wikipedia.org/wiki/Smoothstep
        var smooth_step = function(start, end, point) {
            if(point <= start) { return 0; }
            if(point >= end) { return 1; }
            var x = (point - start) / (end - start); // interpolation
            return x*x*(3 - 2*x);
        };

        return new Promise(function(resolve, reject) {
            // This is to keep track of where the element's scrollTop is
            // supposed to be, based on what we're doing
            var previous_top = element.scrollTop;

            // This is like a think function from a game loop
            var scroll_frame = function() {
                if(element.scrollTop != previous_top) {
                    reject("interrupted");
                    return;
                }

                // set the scrollTop for this frame
                var now = Date.now();
                var point = smooth_step(start_time, end_time, now);
                var frameTop = Math.round(start_top + (distance * point));
                element.scrollTop = frameTop;

                // check if we're done!
                if(now >= end_time) {
                    resolve();
                    return;
                }

                // If we were supposed to scroll but didn't, then we
                // probably hit the limit, so consider it done; not
                // interrupted.
                if(element.scrollTop === previous_top
                    && element.scrollTop !== frameTop) {
                    resolve();
                    return;
                }
                previous_top = element.scrollTop;

                // schedule next frame for execution
                setTimeout(scroll_frame, 0);
            };

            // boostrap the animation process
            setTimeout(scroll_frame, 0);
        });
    }
}
},{}],5:[function(require,module,exports){
module.exports = MainController;

function MainController(eventFactory, scrollFactory) {
    var vm = this;
    this.message = 'Hello';
    vm.openNavSidebar = function () {
        eventFactory.dispatch('openNavSidebar', {
            action: 'open'
        });
    };

    vm.scrollTo = function (selector) {
        scrollFactory.scrollTo(selector, 600);
    }
}
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
angular.module('sg-components', ['common'])
    .controller('appController', ['eventFactory', 'scrollFactory', require('./app-controller')])
    .directive('fillHeight', require('./behaviour/fill-height-directive'))
    .directive('navbar', require('./navbar/navbar-directive'))
    .directive('navbarSidebar', ['eventFactory', require('./navbar/navbar-sidebar-directive')]);
},{"./app-controller":5,"./behaviour/fill-height-directive":6,"./navbar/navbar-directive":8,"./navbar/navbar-sidebar-directive":9}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
module.exports = navbarSidebar;

function navbarSidebar(eventFactory) {
    return {
        restrict: 'AE',
        link: function(scope, el) {
            eventFactory.listen('openNavSidebar', function(data) {
                if (data.action === 'open' && !el.hasClass('is-open'))
                    el.addClass('is-open');
            });
            angular.element(document.querySelector('.navbar-sidebar .backdrop')).on('click', function() {
                el.removeClass('is-open');
            });
            angular.element(document.querySelectorAll('.navbar-sidebar .nav-item')).on('click', function() {
                el.removeClass('is-open');
            });
        }
    }
}
},{}],10:[function(require,module,exports){
angular.module('sgApp')
	.config(function() {
	});
},{}]},{},[1]);
