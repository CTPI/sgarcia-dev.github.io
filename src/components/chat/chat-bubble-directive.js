module.exports = chatBubble;
var hammer = require('hammerjs');
function chatBubble(eventFactory, gestureFactory) {
    return {
        restrict: 'AE',
        controller: function() {
            var vm = this;
            vm.message = 'Bubble';
        },
        controllerAs: 'chatBubbleCtrl',
        link: function(scope, el) {
            var _currentState = '';
            function setState(state) {
                el.removeClass(_currentState || '');
                el.addClass(state);
                _currentState = state;
            }
            setState('default');
            var hammerChatBubble = new hammer(document.querySelector('.chat-bubble-btn')),
                closeButton = new hammer(document.querySelector('chat-bubble > .close-btn'));
            hammerChatBubble.on('tap', function() {
                if(_currentState === 'is-long-press')
                    return setState('default');
                setState('default');
                eventFactory.dispatch('chat-window', { action: 'toggle' });
            });
            closeButton.on('tap', function() {
                setState('is-hidden');
                eventFactory.dispatch('chat-window', { action: 'close' });
            });
            hammerChatBubble.on('press', function() {
                setState('is-long-press');
                eventFactory.dispatch('chat-window', { action: 'close' });
            });
            eventFactory.listen('chat-bubble', function(data) {
                if (data.action === 'show') {
                    setState('default');
                } else if(data.action === 'hide') {
                    setState('is-hidden');
                }
            });
        }
    }
}