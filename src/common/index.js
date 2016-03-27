angular.module('common', [])
    .factory('eventFactory', require('./event-factory'))
    .factory('gestureFactory', require('./gesture-factory'))
    .factory('scrollFactory', ['eventFactory', require('./scroll-factory')]);
