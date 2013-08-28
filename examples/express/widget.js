var boop = require('boop');
var dominate = require('../../dominate');
var node = dominate.fromJSON;

var Widget = module.exports = boop.extend({
    initialize: function() {
        var el = node({
            T: 'div',
            C: [{
                T: 'p',
                A: {name:'title'},
                C: ['']
            }, {
                T: 'p',
                A: {name:'time'},
                C: ['']
            }]
        });
        this.assets = dominate.utils.indexByName(el);
        this.el = el;
    },

    setTitle: function(title) {
        this.assets.title.children[0].setContent(title);
    },

    setTime: function(time) {
        this.assets.time.children[0].setContent(time);
    },

    stringify: function() {
        return this.el.stringify();
    }
});