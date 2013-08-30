var factory = require('./defaultFactory');

module.exports = function (json) {
    return factory.create(json);
};