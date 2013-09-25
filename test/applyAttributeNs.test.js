/* global describe, expect, it*/

var D = require('../dual');


describe('Node#applyAttributeNs', function() {

    describe('Node#applyAttributeNs_class', function() {
        it('should work', function() {
            var n = new D.Node();
            n.setAttribute('class:foo', true);
            n.setAttribute('class:bar', true);
            n.setAttribute('class:baz', true);

            n.setAttribute('class:bar', false);

            n.getAttribute('class').should.equal('foo baz');
        });
    });

    describe('Node#addClass/removeClass', function() {
        it('should work', function() {
            var n = new D.Node();
            n.addClass('foo');
            n.addClass('bar');
            n.addClass('baz');

            n.removeClass('bar');

            n.getAttribute('class').should.equal('foo baz');
        });
    });

    describe('Node#hasClass/toggleClass', function() {
        it('should work', function() {
            var n = new D.Node();
            n.toggleClass('foo');
            n.hasClass('foo').should.equal(true);
            n.toggleClass('foo');
            n.toggleClass('bar');

            n.getAttribute('class').should.equal('bar');
        });
    });

});
