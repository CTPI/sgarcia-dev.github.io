module.exports = MainController;

function MainController(eventFactory) {
    var vm = this;
    this.message = 'Hello';
    vm.openNavSidebar = function () {
        eventFactory.dispatch('openNavSidebar', {
            action: 'open'
        });
    }
}