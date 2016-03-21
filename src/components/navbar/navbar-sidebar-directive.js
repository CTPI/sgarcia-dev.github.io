module.exports = navbarSidebar;

function navbarSidebar(eventFactory) {
    return {
        restrict: 'AE',
        link: function(scope, el) {
            eventFactory.listen('openNavSidebar', function(data) {
                if (data.action === 'open' && !el.hasClass('is-open'))
                    el.addClass('is-open');
            });
            angular.element(document.querySelector('.navbar-sidebar .backdrop')).on('click', function() {
                el.removeClass('is-open');
            });
            angular.element(document.querySelectorAll('.navbar-sidebar .nav-item')).on('click', function() {
                el.removeClass('is-open');
            });
        }
    }
}