var dual = require('../../dual');
var fromJSON = dual.fromJSON;

var Layout = module.exports = dual.Widget.extend({
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