/* global describe, expect, it*/

var D = require('../dual');

describe('Destroy', function() {
    it('should destroy attributes', function() {
        var T = D.Object.extend({
            ATTRS : {
                foo : {}
            }
        });

        var o = new T();
        o.setFoo(500);
        o.getFoo().should.equal(500);
        o.destroy();
        (o.getFoo() === undefined).should.equal(true);
    });

    it('should destroy node events', function() {
        var n = D.fromJSON(['button']);
        n.domify();
        n.listenTo('click');
        n.on('dom.click', function () {});
        n.listeners('dom.click').should.have.lengthOf(1);
        n.destroy();
        n.listeners('dom.click').should.have.lengthOf(0);
    });

    it('should destroy DOM element', function() {
        var n = D.fromJSON(['button']);
        var dom = n.domify();
        n.destroy();
        (dom !== n.el).should.equal(true);
    });
});