var Factory = require('./Factory');
var Node = require('./Node');

var f = module.exports = new Factory();

f.register({
	'div' : Node
});