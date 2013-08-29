/* global describe, expect, it*/

var Node = require('../lib/Node');
var fromJSON = require('../lib/fromJSON');
var utils = require('../lib/utils');
var TestWidget = require('./TestWidget');

describe('Node/Default', function() {
    it('should be created with fromJSON()', function() {
        var n = fromJSON([
            'test', {
                foo: 'bar'
            },
            []
        ]);
        n.stringify().should.equal('<test foo="bar"></test>');
    });

});

describe('Node/Text', function() {
    it('should be created with fromJSON()', function() {
        var n = fromJSON('hello world');
        n.stringify().should.equal('hello world');
        n.domify().should.be.an.instanceof(window.Text);
    });
});

describe('Node', function() {
    var n = new Node();

    it('should set and get attr', function() {
        n.setAttribute('foo', 'bar');
        var attr = n.getAttribute('foo');
        attr.should.equal('bar');
    });

    it('should set DOM element\'s attr in domify()', function() {
        var dom = n.domify();
        var attr = dom.getAttribute('foo');
        attr.should.equal('bar');
    });

    it('should set DOM element\'s attr after domify()', function() {
        var dom = n.domify();
        n.setAttribute('foo', 'baz');
        n.setAttribute('qqq', 'mnk');
        dom.getAttribute('foo').should.equal('baz');
        dom.getAttribute('qqq').should.equal('mnk');
    });

    it('should allow adding children', function() {
        var n = new Node();
        var c = new Node();
        c.setAttribute('id', '2');

        n.appendChild(c);
        n.stringify().should.equal('<div><div id="2"></div></div>');
    });

    it('should allow insertBefore', function() {
        var n = new Node();
        var c1 = new Node();
        var c2 = new Node();
        var c3 = new Node();
        c1.setAttribute('name', 'c1');
        c2.setAttribute('name', 'c2');
        c3.setAttribute('name', 'c3');
        n.appendChild(c1);
        n.appendChild(c3);

        n.insertBefore(c2, c3);
        n.stringify().should.equal('<div><div name="c1"></div><div name="c2"></div><div name="c3"></div></div>');
    });

    it('should reflect insertBefore on domified tree', function() {
        var n = new Node();
        n.domify();
        var c1 = new Node();
        var c2 = new Node();
        var c3 = new Node();
        c1.setAttribute('name', 'c1');
        c2.setAttribute('name', 'c2');
        c3.setAttribute('name', 'c3');
        n.appendChild(c1);
        n.appendChild(c3);

        n.insertBefore(c2, c3);
        n.domify().outerHTML.should.equal('<div><div name="c1"></div><div name="c2"></div><div name="c3"></div></div>');
    });

    it('should reflect appendChild() on domified tree', function() {
        var n = new Node();
        var c = new Node();
        var dom = n.domify();
        c.setAttribute('id', '2');

        n.appendChild(c);
        dom.outerHTML.should.equal('<div><div id="2"></div></div>');
    });

    it('should allow removeChild()', function() {
        var n = new Node();
        var c = new Node();
        n.appendChild(c);
        n.stringify().should.equal('<div><div></div></div>');
        n.removeChild(c);
        n.stringify().should.equal('<div></div>');
    });

    it('should reflect removeChild() on domified tree', function() {
        var n = new Node();
        var c = new Node();
        n.domify().outerHTML.should.equal('<div></div>');
        n.appendChild(c);
        n.domify().outerHTML.should.equal('<div><div></div></div>');
        n.removeChild(c);
        n.domify().outerHTML.should.equal('<div></div>');
    });

    it('should be able to move node correctly from one parent to another', function() {
        var n1 = new Node();
        var n2 = new Node();
        var c = new Node();

        n1.domify().outerHTML.should.equal('<div></div>');
        n2.domify().outerHTML.should.equal('<div></div>');

        n1.appendChild(c);
        n1.domify().outerHTML.should.equal('<div><div></div></div>');
        n2.domify().outerHTML.should.equal('<div></div>');

        n2.appendChild(c);
        n1.domify().outerHTML.should.equal('<div></div>');
        n2.domify().outerHTML.should.equal('<div><div></div></div>');
    });


    it('should be cleared', function() {
        var n = fromJSON(['div', [
            ['div'],
            ['div']
        ]]);
        n.clear();
        n.stringify().should.equal('<div></div>');
    });


    it('should allow setText', function() {
        var n = fromJSON(['div', [
            ['div'],
            ['div']
        ]]);
        n.setText('hello world');
        n.stringify().should.equal('<div>hello world</div>');
    });
});

describe('utils/index*', function() {
    it('should index by custom function', function() {
        var n = fromJSON([
            'div', {
                name: 'one'
            },
            [
                ['div', {
                    name: 'two'
                }]
            ]
        ]);
        var idx = utils.index(n, false, function(ch) {
            return ch.getAttribute('name');
        });
        idx.should.have.property('one');
        idx.should.have.property('two');
    });

    it('should index by name', function() {
        var n = fromJSON([
            'div', {
                name: 'one'
            },
            [
                ['div', {
                    name: 'two'
                }]
            ]
        ]);
        var idx = utils.indexByName(n, false);
        idx.should.have.property('one');
        idx.should.have.property('two');
    });
});

describe('Widget', function() {
    it('should be created', function() {
        var w = new TestWidget();

        w.domify().querySelectorAll('td').length.should.equal(2);

        w.stringify().should.equal(['<div name="root">',
            '<table><tr>',
            '<td name="leftCell">hello</td>',
            '<td name="rightCell">world</td>',
            '</tr></table></div>'
        ].join(''));

        w.assets.root.should.be.an.instanceof(Node);
        w.assets.leftCell.should.be.an.instanceof(Node);
        w.assets.rightCell.should.be.an.instanceof(Node);
        console.log(w);
    });

    it('should be appended to node', function() {
        var n = new Node();
        var w = new TestWidget();

        n.appendChild(w);

        w.parent.should.equal(n);

        n.stringify().should.equal(['<div><div name="root">',
            '<table><tr>',
            '<td name="leftCell">hello</td>',
            '<td name="rightCell">world</td>',
            '</tr></table></div></div>'
        ].join(''));
    });

    it('should apply its attributes', function() {
        var w = new TestWidget();

        w.setAttribute('left', 'foo');
        w.setAttribute('right', 'bar');

        w.stringify().should.equal(['<div name="root">',
            '<table><tr>',
            '<td name="leftCell">foo</td>',
            '<td name="rightCell">bar</td>',
            '</tr></table></div>'
        ].join(''));
    });
});