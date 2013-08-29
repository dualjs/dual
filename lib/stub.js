var ERR = require('./error');

module.exports.abstractMethod = function () {
    throw new ERR.NotImplemented('Abstract method');
};

module.exports.notImplemented = function () {
    throw new ERR.NotImplemented('Not implemented');
};