module.exports = chat;
function chat(eventFactory) {
    return {
        restrict: 'AE',
        controller: function() {
            var vm = this;
            vm.input = '';
        },
        controllerAs: 'chatCtrl',
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