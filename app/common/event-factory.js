module.exports = eventFactory;

function eventFactory() {
    return {
        dispatch: function(eventName, data) {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, true, true, data);
            window.dispatchEvent(event);
        },
        listen: function(eventName, callback) {
            window.addEventListener(eventName, function(event) {
                callback(event.detail)
            });
        }
    };
}