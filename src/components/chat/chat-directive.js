module.exports = chat;
function chat(eventFactory, scrollFactory) {
    return {
        restrict: 'AE',
        controller: function() {
            var vm = this;
            vm.chatLog = [];
            vm.input = '';
            eventFactory.listen('chat-window', function(data) {
                if (data.action === 'user-input') {
                    vm.chatLog.push({
                        author: 'user',
                        message: vm.input,
                        timestamp: new Date().toISOString()
                    });
                    vm.input = '';
                    data.callback();
                }
            });
        },
        controllerAs: 'chatCtrl',
        link: function(scope, el) {
            var chatInput = document.querySelector('.chat-input'),
                chatContent = document.querySelector('.chat-content');
            angular.element(chatInput).on('keyup', function(event) {
                if (event.which === 13) {
                    eventFactory.dispatch('chat-window', { action: 'user-input', callback: function() {
                        el.scope().$apply();
                        var lastMessageOffesetTop = document.querySelector('.chat-content .chat-message:last-child').offsetTop;
                        scrollFactory.scrollTo(lastMessageOffesetTop, 300, chatContent);
                    }});
                }
            });
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
                        if (el.hasClass('is-active')) {
                            chatInput.focus();
                        }
                        break;
                }
            });
        }
    }
}