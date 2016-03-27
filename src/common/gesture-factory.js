module.exports = gestureFactory;
function gestureFactory() {
    _hammer = require('hammerjs');
    return {
        hammer: Hammer
    }
}