module.exports = navbar;

function navbar() {
    return {
        restrict: 'AEC',
        link: function (scope, el) {
            var height = Math.max(window.innerHeight, document.documentElement.clientHeight || 0) - el[0].offsetHeight,
                isStatic = false;
            window.addEventListener('scroll', function() {
                if (window.scrollY > height && !isStatic) {
                    el.addClass('is-static');
                    isStatic = true;
                } else if (isStatic && window.scrollY < height) {
                    el.removeClass('is-static');
                    isStatic = false;
                }
            });
        }
    };
}