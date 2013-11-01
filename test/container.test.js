/* global describe, expect, it*/

var D = require('../dual');

describe('Container', function() {

    it('should add', function() {
        var MyContainer = D.Container.extend({
            initStructure: function() {
                this.$ = D.fromJSON(['ul']);
            }
        });
        var c = new MyContainer();
        var n = D.fromJSON(['div', ['hello']]);
        c.add(n);
        c.stringify().should.equal('<ul><div>hello</div></ul>');
    });

    it('should create container and add children with D.fromJSON', function() {
        var MyContainer = D.Container.extend({
            initStructure: function() {
                this.$ = D.fromJSON(['ul']);
            }
        });

        var w = D.fromJSON(['MyContainer', [
            ['li', ['hello']],
            ['li', ['world']]
        ]], {
            'MyContainer': MyContainer
        });

        w.stringify().should.equal('<ul><li>hello</li><li>world</li></ul>');
    });

    it('should create complex container and add children with D.fromJSON', function() {
        var MyContainer = D.Container.extend({
            initStructure: function() {
                this.$ = D.fromJSON(['ul']);
            },

            _getChildrenContainer: function() {
                //Create <li> as a wrapper for our child item
                var wrapper = D.fromJSON(['li']);
                this.$.appendChild(wrapper);
                return wrapper;
            },

            _removeChild: function (child, index) {
                //Remove <li> around the child item instead of an item itself
                this.$.removeChild(this.$.children[index]);
            }
        });

        var w = D.fromJSON(['MyContainer', [
            ['p', ['hello']],
            ['p', ['crazy']],
            ['p', ['world']]
        ]], {
            'MyContainer': MyContainer
        });

        w.stringify().should.equal('<ul>' +
            '<li><p>hello</p></li>' +
            '<li><p>crazy</p></li>' +
            '<li><p>world</p></li>' +
            '</ul>');

        w.removeAt(1);

        w.stringify().should.equal('<ul>' +
            '<li><p>hello</p></li>' +
            '<li><p>world</p></li>' +
            '</ul>');
    });

    it('should allow complex scenarios. For example, two-panel layout', function() {
        var MyContainer = D.Container.extend({
            initStructure: function() {
                this.$ = D.fromJSON(['div', [
                    ['aside', {
                        'ui:asset': 'leftPanel'
                    }],
                    ['article', {
                        'ui:asset': 'rightPanel'
                    }]
                ]]);
            },
            _getChildrenContainer: function(child, options) {
                child = child || null;
                options = options || {};
                if (options.panel === 'left') {
                    return this.assets.leftPanel;
                }
                if (options.panel === 'right') {
                    return this.assets.rightPanel;
                }
                throw new Error('wrong panel');
            }
        });
        var c = new MyContainer();

        c.add(D.fromJSON([
            'span', ['hello']
        ]), {
            panel: 'left'
        });

        c.add(D.fromJSON([
            'span', ['world']
        ]), {
            panel: 'right'
        });

        c.stringify().should.equal('<div>' +
            '<aside><span>hello</span></aside>' +
            '<article><span>world</span></article>' +
            '</div>');

        c.removeAt(1);
        c.stringify().should.equal('<div><aside><span>hello</span></aside><article></article></div>');

        c.removeAt(0);
        c.stringify().should.equal('<div><aside></aside><article></article></div>');
    });

});