/* global describe, expect, it*/

var Node = require('../lib/Node');
var fromJSON = require('../lib/fromJSON');

describe('Node/Default', function() {
    it('should be created with fromJSON()', function () {
        var n = fromJSON({
            T : 'test',
            A : {
                'foo': 'bar'
            },
            C : []
        });
        n.stringify().should.equal('<test foo="bar"></test>');
    });

});

describe('Node/Text', function() {
    it('should be created with fromJSON()', function () {
        var n = fromJSON('hello world');
        n.stringify().should.equal('hello world');
        n.domify().should.be.an.instanceof(window.Text);
    });
});

describe('Node', function() {
    var n = new Node();

    it('should set and get attr', function () {
        n.setAttribute('foo', 'bar');
        var attr = n.getAttribute('foo');
        attr.should.equal('bar');
    });

    it('should set DOM element\'s attr in domify()', function () {
        var dom = n.domify();
        var attr = dom.getAttribute('foo');
        attr.should.equal('bar');
    });

    it('should set DOM element\'s attr after domify()', function () {
        var dom = n.domify();
        n.setAttribute('foo', 'baz');
        n.setAttribute('qqq', 'mnk');
        dom.getAttribute('foo').should.equal('baz');
        dom.getAttribute('qqq').should.equal('mnk');
    });

    it('should allow adding children', function () {
        var n = new Node();
        var c = new Node();
        c.setAttribute('id', '2');

        n.appendChild(c);
        n.stringify().should.equal('<div><div id="2"></div></div>');
    });

    it('should allow reflect appendChild() on domified tree', function () {
        var n = new Node();
        var c = new Node();
        var dom = n.domify();
        c.setAttribute('id', '2');

        n.appendChild(c);
        dom.outerHTML.should.equal('<div><div id="2"></div></div>');
    });


});
