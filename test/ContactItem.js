var Widget = require('../lib/Widget');
var fromJSON = require('../lib/fromJSON');

var ContactItem = Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['li', [
            ['span', {name:'first'}],
            ' ',
            ['span', {name:'last'}]
        ]]);
    },

    applyAttribute_first : function (value) {
        this.assets.first.setText(value);
    },

    applyAttribute_last : function (value) {
        this.assets.last.setText(value);
    }
});

module.exports = ContactItem;