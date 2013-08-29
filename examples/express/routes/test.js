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

		req.toolbar.addItem({
			text: 'Home',
			href: '/'
		});
		next();
	},
	function(req, res) {
		var layout = dominate.fromJSON(['div']);
		layout.appendChild(req.toolbar);
		layout.appendChild(req.widget);


		res.send(layout.stringify());
	}
];