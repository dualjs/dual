/* global describe, expect, it*/

var D = require('../dual');

describe('Properties', function() {

    it('should be applied to DOM after domify()', function() {
        var n = D.fromJSON(['input', {type:'text'}]);
        n.setProperty('value', 'abc');
        n.getProperty('value').should.equal('abc');
        n.domify().value.should.equal('abc');
        n.getProperty('value').should.equal('abc');
    });

    it('should be shown as attributes after stringify()', function() {
        var n = D.fromJSON(['input', {type:'text'}]);
        n.setProperty('value', 'abc');
        n.stringify().should.equal('<input type="text" value="abc" />');
        n.getProperty('value').should.equal('abc');
    });

    it('should reflect real DOM properties after domify()', function() {
        var n = D.fromJSON(['input', {type:'text'}]);
        n.setProperty('value', 'abc');
        n.getProperty('value').should.equal('abc');
        var dom = n.domify();
        dom.value = 'foobar';
        n.getProperty('value').should.equal('foobar');
    });

});