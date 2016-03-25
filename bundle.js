(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require('./common');
require('./components');
angular.module('sgApp', ['sg-components']);
require('./config');
},{"./common":3,"./components":10,"./config":13}],2:[function(require,module,exports){
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
        link: function(scope, el, attrs) {
            var height = Number(attrs.percentage) || Math.max(window.innerHeight, document.documentElement.clientHeight || 0);
            el.css('height', height + 'px');
        }
    }
}
},{}],7:[function(require,module,exports){
module.exports = chatBubble;
function chatBubble(eventFactory) {
    return {
        restrict: 'AE',
        controller: function() {
            var vm = this;
            vm.message = 'Bubble';
        },
        controllerAs: 'chatBubbleCtrl',
        link: function(scope, el) {
            var longPressTimer,
                isLongPress = false,
                clickDisabled = false,
                _currentState = '',
                chatIsOpen = false;
            el.notification = angular.element(document.querySelector('chat-bubble > .notification'));
            function setState(state) {
                el.removeClass(_currentState || '');
                el.addClass(state);
                _currentState = state;
            }
            // dummy message
            setTimeout(function() {
                setState('default');
                setTimeout(function() {
                    setState('has-notification');
                }, 200);
            }, 2000);
            // on click
            el.on('click', function () {
                if (clickDisabled)
                    return;
                isLongPress = false;
                setState('default');
                if (!chatIsOpen) {
                    eventFactory.dispatch('chat-window', { action: 'open' });
                    chatIsOpen = !chatIsOpen;
                }
                else {
                    eventFactory.dispatch('chat-window', { action: 'close' });
                    chatIsOpen = !chatIsOpen;
                }
            });
            // long press functionality
            el.on('mousedown', function (e) {
                longPressTimer = window.setTimeout(function() {
                    e.stopPropagation();
                    isLongPress = !isLongPress;
                    if (isLongPress) {
                        eventFactory.dispatch('chat-window', { action: 'close' });
                        setState('is-long-press');
                        clickDisabled = true;
                    }
                }, 400);
            });
            el.on('mouseup', function() {
                clearTimeout(longPressTimer);
                if (isLongPress) {
                    window.setTimeout(function() {
                        clickDisabled = false;
                    }, 50);
                }
            });
        }
    }
}
},{}],8:[function(require,module,exports){
module.exports = ChatController;
function ChatController() {
    var vm = this;
}
},{}],9:[function(require,module,exports){
module.exports = chat;
function chat(eventFactory) {
    return {
        restrict: 'AE',
        link: function(scope, el) {
            eventFactory.listen('chat-window', function(data) {
                switch(data.action) {
                    case 'open':
                        if (!el.hasClass('is-active'))
                            el.addClass('is-active');
                        break;
                    case 'close':
                        if (el.hasClass('is-active'))
                            el.removeClass('is-active');
                        break;
                    case 'toggle':
                        el.toggleClass('is-active');
                        break;
                }
            });
        }
    }
}
},{}],10:[function(require,module,exports){
angular.module('sg-components', ['common'])
    .controller('appController', ['eventFactory', 'scrollFactory', require('./app-controller')])
    .controller('chatController', ['eventFactory', require('./chat/chat-controller')])
    .directive('fillHeight', require('./behaviour/fill-height-directive'))
    .directive('navbar', require('./navbar/navbar-directive'))
    .directive('navbarSidebar', ['eventFactory', require('./navbar/navbar-sidebar-directive')])
    .directive('chat', ['eventFactory', require('./chat/chat-directive')])
    .directive('chatBubble', ['eventFactory', require('./chat/chat-bubble-directive')]);
},{"./app-controller":5,"./behaviour/fill-height-directive":6,"./chat/chat-bubble-directive":7,"./chat/chat-controller":8,"./chat/chat-directive":9,"./navbar/navbar-directive":11,"./navbar/navbar-sidebar-directive":12}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
angular.module('sgApp')
	.config(function() {
	});
},{}]},{},[1]);
