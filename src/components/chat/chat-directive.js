module.exports = chat;
function chat(eventFactory, scrollFactory) {
    return {
        restrict: 'AE',
        controller: function() {
            var vm = this;
            vm.chatLog = [{
                author: 'admin',
                message: "Hello, and welcome to my site! As you might have noticed, it's not quite finished yet. Features like the chat window for real-time chat and quickly sending an email to me are not finished yet. However, feel free to browse other areas of my site normally while I work on the missing features. To close this chat, long press the chat-bubble and select close",
                timestamp: new Date().toISOString()
            }];
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
                chatContent = document.querySelector('.chat-content'),
                chatEnterButton = document.querySelector('.chat-input-btn');
            angular.element(chatInput).on('keyup', function(event) {
                if (event.which === 13) {
                    InsertMessage();
                }
            });
            angular.element(chatEnterButton).on('click', function() {
                InsertMessage();
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
            function InsertMessage() {
                eventFactory.dispatch('chat-window', { action: 'user-input', callback: function() {
                    el.scope().$apply();
                    var lastMessageOffesetTop = document.querySelector('.chat-content .chat-message:last-child').offsetTop;
                    scrollFactory.scrollTo(lastMessageOffesetTop, 300, chatContent);
                }});
            }
        }
    }
}