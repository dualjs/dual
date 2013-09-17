var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

function field (name, title) {
    return ['label', [
        '' + title,
        ['br'],
        ['field:text', { name:name }]
    ]];
}

var ContactForm = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['form', [
            ['p', [field('first', 'First Name')]],
            ['p', [field('last' , 'Last Name' )]],
            ['p', [field('email', 'E-Mail'    )]]
        ]]);
    },

    populate : function (data) {
        this.assets.first.setValue(data.first);
        this.assets.last.setValue(data.last);
        this.assets.email.setValue(data.email);
    },

    serialize : function () {
        return {
            first : this.assets.first.getValue(),
            last  : this.assets.last.getValue(),
            email : this.assets.email.getValue()
        };
    },

    isRenderedClientSide : function () {
        return !!(this.$.el);
    },

    applyAttribute_first : function (value) {
        this.assets.first.setValue(value);
    },

    applyAttribute_last : function (value) {
        this.assets.last.setValue(value);
    },

    applyAttribute_email : function (value) {
        this.assets.email.setValue(value);
    }
});

module.exports = ContactForm;