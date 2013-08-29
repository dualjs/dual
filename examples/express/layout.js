var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var Layout = module.exports = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['div', [
            ['div', {name:'left'}],
            ['div', {name:'right'}]
        ]]);
    },

    left: function() {
        return this.assets.left;
    },

    right: function() {
        return this.assets.right;
    }
});