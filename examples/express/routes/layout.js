var Layout = require('../layout');

exports.init = function (req, res, next) {
    req.layout = new Layout();
    req.layout.left().appendChild(req.toolbar);
    next();
};

exports.render = function (req, res) {
    res.send(req.layout.stringify());
};
