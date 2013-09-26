var factory = require('./defaultFactory');

module.exports = function (json, aliases) {
    return factory.create(json, aliases);
};