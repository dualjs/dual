/* global describe, expect, it*/

var D = require('../dual');

describe('Object', function() {
    it('should work', function() {
        var T = D.Object.extend({
            foo: function() {
                return 'foo';
            }
        });

        (new T).foo().should.equal('foo');
    });

    it('should apply attributes', function() {
        var T = D.Object.extend({
            ATTRS: {
                foo: {
                    apply: '__applyFoo'
                }
            },
            __applyFoo: function(val) {
                this.bar = val;
            },
            applyAttribute_baz: function(val) {
                this.abc = val;
            }
        });

        var t = new T;

        t.setAttribute('foo', 123);
        t.bar.should.equal(123);

        t.setAttribute('baz', 456);
        t.abc.should.equal(456);
    });

    it('should inherit attribute description', function() {

        var T = D.Object.extend({
            ATTRS: {
                foo: {
                    apply: '__applyFoo'
                }
            },
        });

        var Y = T.extend({
            ATTRS: {
                foo: {
                    init: 147
                },

                bar: {
                    apply: 'test'
                }
            }
        });

        var y = new Y;

        y.ATTRS.should.have.property('foo');
        y.ATTRS.should.have.property('bar');
        y.ATTRS.foo.init.should.equal(147);
        y.ATTRS.foo.apply.should.equal('__applyFoo');

        var t = new T;

        t.ATTRS.should.have.property('foo');
        t.ATTRS.foo.apply.should.equal('__applyFoo');
        
        t.ATTRS.should.not.have.property('bar');
        t.ATTRS.foo.should.not.have.property('init');

    });

    it('should init attribute', function() {
        var T = D.Object.extend({
            ATTRS : {
                foo : {
                    init : 500
                },
                bar : {
                    init : function () {
                        return new Date();
                    }
                }
            }
        });

        var t = new T;

        t.getAttribute('foo').should.equal(500);
        t.getAttribute('bar').should.be.an.instanceOf(Date);
    });

    it('should create getters and setters', function() {
        var T = D.Object.extend({
            ATTRS : {
                foo : {}
            }
        });

        var t = new T();
        t.should.have.property('setFoo');
        t.should.have.property('getFoo');
        t.setFoo(123);
        t.getFoo().should.equal(123);
        t.getAttribute('foo').should.equal(123);
    });

    it('should skip accessors creation if the ones exist', function() {
        var existingGetter = function () {};
        var existingSetter = function () {};

        var T = D.Object.extend({
            ATTRS : {
                foo : {}
            },

            setFoo : existingSetter,
            getFoo : existingGetter
        });

        var t = new T();

        t.getFoo.should.equal(existingGetter);
        t.setFoo.should.equal(existingSetter);
    });

});