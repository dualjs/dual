/* global describe, expect, it*/

var D = require('../dual');
var TestWidget = require('./TestWidget');


describe('Aliases', function() {
	//With aliases you never must call defaultFactory.register()
	//Aliases help to defile local dependencies in widgets.

	describe('fromJSON', function() {
		it('should support aliases', function() {
			var node = D.fromJSON(['div', [
				['test'],
				['test']
			]], {
				//Here we can define an alias: name 'test' creates new TestWidget
				test: TestWidget
			});

			node.stringify().should.equal('<div><div>' +
				'<table><tr><td>hello</td><td>world</td></tr></table>' +
				'</div><div>' +
				'<table><tr><td>hello</td><td>world</td></tr></table>' +
				'</div></div>');
		});
	});

});