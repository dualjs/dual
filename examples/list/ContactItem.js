var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var ContactItem = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['li', {'ui:asset':'root'}, [
            ['p', [
                ['strong', [
                    ['span', {'ui:asset':'first'}],
                    ' ',
                    ['span', {'ui:asset':'last'}]
                ]]
            ]],
            ['p', [
                ['span', {'ui:asset':'email'}]
            ]]
        ]]);
    },

    ready : function () {
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