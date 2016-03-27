angular.module('sg-components', ['common'])
    .controller('appController', ['eventFactory', 'scrollFactory', require('./app-controller')])
    .controller('chatController', ['eventFactory', require('./chat/chat-controller')])
    .directive('fillHeight', require('./behaviour/fill-height-directive'))
    .directive('navbar', require('./navbar/navbar-directive'))
    .directive('navbarSidebar', ['eventFactory', require('./navbar/navbar-sidebar-directive')])
    .directive('chat', ['eventFactory', 'scrollFactory', require('./chat/chat-directive')])
    .directive('chatBubble', ['eventFactory', 'gestureFactory', require('./chat/chat-bubble-directive')]);