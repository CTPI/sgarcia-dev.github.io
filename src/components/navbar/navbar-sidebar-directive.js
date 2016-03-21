module.exports = navbarSidebar;

function navbarSidebar(eventFactory) {
    return {
        restrict: 'AE',
        link: function(scope, el) {
            eventFactory.listen('openNavSidebar', function(data) {
                if (data.action === 'open' && !el.hasClass('is-open'))
                    el.addClass('is-open');
            });
        }
    }
}