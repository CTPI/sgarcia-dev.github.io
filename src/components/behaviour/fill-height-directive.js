module.exports = fillHeight;

function fillHeight() {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            var height = Number(attrs.percentage) || Math.max(window.innerHeight, document.documentElement.clientHeight || 0);
            el.css('height', height + 'px');
        }
    }
}