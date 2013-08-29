var Toolbar = require('../toolbar');

module.exports = function (req, res, next) {
	req.toolbar = new Toolbar();
	next();
};