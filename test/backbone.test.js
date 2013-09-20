/* global describe, expect, it*/

var backbone = require('backbone');
var TestWidget = require('./TestWidget');

var ContactList = require('./ContactList');

var BackboneModelAdapter = require('../lib/adapter/BackboneModel');
var BackboneCollectionAdapter = require('../lib/adapter/BackboneCollection');

describe('BackboneModelAdapter', function() {
    it('should bind to Backbone Model', function() {
        var m = new backbone.Model();
        var w = new TestWidget();
        var adapter = new BackboneModelAdapter(m, w);
        m.set('left', 'foo');
        m.set('right', 'bar');
        w.stringify().should.equal(
            '<div><table><tr>' +
            '<td>foo</td>' +
            '<td>bar</td>' +
            '</tr></table></div>');

        m.set('left', 'abc');
        w.stringify().should.equal(
            '<div><table><tr>' +
            '<td>abc</td>' +
            '<td>bar</td>' +
            '</tr></table></div>');

        m.set({
            left: 'one',
            right: 'two'
        });
        w.stringify().should.equal(
            '<div><table><tr>' +
            '<td>one</td>' +
            '<td>two</td>' +
            '</tr></table></div>');
    });
});

describe('BackboneCollectionAdapter', function() {
    it('should add models', function() {
        var c = new backbone.Collection();
        var l = new ContactList();
        var adapter = new BackboneCollectionAdapter(c, l);
        c.add({
            first: 'Sherlock',
            last: 'Holmes'
        });
        c.add({
            first: 'John',
            last: 'Watson'
        });

        l.stringify().should.equal('<ul>' +
            '<li><span>Sherlock</span>' +
            ' <span>Holmes</span></li>' +
            '<li><span>John</span>' +
            ' <span>Watson</span></li></ul>');

    });

    it('should remove models', function() {
        var c = new backbone.Collection();
        var l = new ContactList();
        var adapter = new BackboneCollectionAdapter(c, l);
        c.add({
            first: 'Sherlock',
            last: 'Holmes'
        });
        c.add({
            first: 'John',
            last: 'Watson'
        });

        c.remove(c.at(1));
        l.stringify().should.equal('<ul>' +
            '<li><span>Sherlock</span>' +
            ' <span>Holmes</span></li>' +
            '</ul>');
    });

    it('should reset models', function() {
        var c = new backbone.Collection();
        var l = new ContactList();
        var adapter = new BackboneCollectionAdapter(c, l);
        c.add({
            first: 'Sherlock',
            last: 'Holmes'
        });
        c.add({
            first: 'John',
            last: 'Watson'
        });

        c.reset([{
            first: 'John',
            last: 'Lennon'
        }, {
            first: 'Yoko',
            last: 'Ono'
        }]);

        l.stringify().should.equal('<ul>' +
            '<li><span>John</span>' +
            ' <span>Lennon</span></li>' +
            '<li><span>Yoko</span>' +
            ' <span>Ono</span></li></ul>');
    });

    it('should change collection', function() {
        var c = new backbone.Collection();
        var l = new ContactList();
        var adapter = new BackboneCollectionAdapter(c, l);
        c.add({
            first: 'Sherlock',
            last: 'Holmes'
        });
        c.add({
            first: 'Mrs.',
            last: 'Turner'
        });
        c.add({
            first: 'John',
            last: 'Watson'
        });

        c.at(1).set('last', 'Hudson');

        l.stringify().should.equal('<ul>' +
            '<li><span>Sherlock</span>' +
            ' <span>Holmes</span></li>' +

            '<li><span>Mrs.</span>' +
            ' <span>Hudson</span></li>' +

            '<li><span>John</span>' +
            ' <span>Watson</span></li></ul>');

    });

    it('should sort collection', function() {
        var c = new backbone.Collection();
        var l = new ContactList();
        var adapter = new BackboneCollectionAdapter(c, l);
        c.add({
            first: 'Sherlock',
            last: 'Holmes',
            order: 2
        });
        c.add({
            first: 'Mrs.',
            last: 'Hudson',
            order: 0
        });
        c.add({
            first: 'John',
            last: 'Watson',
            order: 1
        });

        c.comparator = function (model) {
            return model.get('order');
        };
        c.sort();

        l.stringify().should.equal('<ul>' +
            '<li><span>Mrs.</span>' +
            ' <span>Hudson</span></li>' +

            '<li><span>John</span>' +
            ' <span>Watson</span></li>' +

            '<li><span>Sherlock</span>' +
            ' <span>Holmes</span></li></ul>');


    });
});