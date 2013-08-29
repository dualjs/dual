var dominate = require('../../../dominate');
var Widget = require('../widget');
var layout = require('./layout');

exports.test = [
	layout.init,

	function(req, res, next) {
		req.widget = new Widget();
		req.layout.right().appendChild(req.widget);
		next();
	},

	function(req, res, next) {
		req.widget.setTitle('hello');
		req.widget.setTime('world');

		req.toolbar.addItem({
			text: 'Home',
			href: '/'
		});

		next();
	},

	layout.render
];