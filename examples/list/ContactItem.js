var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var ContactItem = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['li', [
            ['p', [
                ['strong', [
                    ['span', {name:'first'}],
                    ' ',
                    ['span', {name:'last'}]
                ]]
            ]],
            ['p', [
                ['span', {name:'email'}]
            ]]
        ]]);
    },

    applyAttribute_first : function (value) {
        this.assets.first.setText(value);
    },

    applyAttribute_last : function (value) {
        this.assets.last.setText(value);
    },

    applyAttribute_email : function (value) {
        this.assets.email.setText(value);
    }
});

module.exports = ContactItem;