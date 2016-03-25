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