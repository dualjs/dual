var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var ContactItem = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['li', {name:'root'}, [
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

    bindEvents : function () {
        this.assets.root.listenTo('click');
        this.assets.root.on('dom.click', function () {
            this.emit('click');
        }.bind(this));
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