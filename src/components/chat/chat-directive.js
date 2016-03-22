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
                        break;
                    case 'toggle':
                        el.toggleClass('is-active');
                        break;
                }
            });
        }
    }
}