angular.module('common', [])
    .factory('eventFactory', require('./event-factory'))
    .factory('scrollFactory', ['eventFactory', require('./scroll-factory')]);
