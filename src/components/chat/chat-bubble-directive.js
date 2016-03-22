module.exports = chatBubble;
function chatBubble(eventFactory) {
    return {
        restrict: 'AE',
        link: function(scope, el) {
            var notification = angular.element(document.querySelector('chat-bubble > .notification'));
            setTimeout(function() {
                el.addClass('is-visible');
                setTimeout(function() {
                    notification.addClass('has-notification');
                }, 1000);
            }, 2000);
            el.on('click', function () {
                if (notification.hasClass('has-notification'))
                    notification.removeClass('has-notification');
                eventFactory.dispatch('chat-window', {
                    action: 'toggle'
                });
            });
        }
    }
}