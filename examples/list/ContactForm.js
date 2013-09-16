var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

function field (name, title) {
    return ['label', [
        '' + title,
        ['br'],
        ['input', { name:name }]
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
        this.setAttribute('first', data.first);
        this.setAttribute('last', data.last);
        this.setAttribute('email', data.email);
    },

    serialize : function () {
        //TODO: to be completely rewritten!
        //A field must have interface for value accessors.
        //Placed her just for example.
        if(!this.isRenderedClientSide) {
            return {};
        }
        return {
            first : this.assets.first.domify().value,
            last  : this.assets.last.domify().value,
            email : this.assets.email.domify().value
        };
    },

    isRenderedClientSide : function () {
        return !!(this.$.el);
    },

    applyAttribute_first : function (value) {
        this.assets.first.setAttribute('value', value);
    },

    applyAttribute_last : function (value) {
        this.assets.last.setAttribute('value', value);
    },

    applyAttribute_email : function (value) {
        this.assets.email.setAttribute('value', value);
    }
});

module.exports = ContactForm;