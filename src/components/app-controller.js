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
    };
    vm.openChatBubble = function() {
        eventFactory.dispatch('chat-bubble', { action: 'open' });
    };
}