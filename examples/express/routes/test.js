var dominate = require('../../../dominate');
var Widget = require('../widget');

exports.test = [
	function(req, res, next) {
		req.widget = new Widget();
		next();
	},
	function(req, res, next) {
		req.widget.setTitle('hello');
		req.widget.setTime('world');
		next();
	},
	function(req, res) {
		res.send(req.widget.stringify());
	}
];