var Widget = require('../lib/Widget');
var Node = require('../lib/Node');
var fromJSON = require('../lib/fromJSON');

module.exports = Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['div', {name:'root'}, [
            ['table', [
                ['tr', [
                    ['td', {name:'leftCell'}, ['hello']],
                    ['td', {name:'rightCell'}, ['world']]
                ]]
            ]]
        ]]);
    },

    applyAttribute_left : function (value) {
        this.assets.leftCell.setText(value);
    },

    applyAttribute_right : function (value) {
        this.assets.rightCell.setText(value);
    }
});