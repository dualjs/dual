var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;


var ContactItem = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['li', [
            ['p', [
                ['b', ['First Name: ']],
                ['span', {name:'first'}]
            ]],
            ['p', [
                ['b', ['Last Name: ']],
                ['span', {name:'last'}]
            ]]
        ]]);
    },

    applyAttribute_first : function (value) {
        this.assets.first.setText(value);
    },

    applyAttribute_last : function (value) {
        this.assets.last.setText(value);
    }

});

var ContactsList = dominate.List.extend({

    initStructure: function() {
        dominate.List.prototype.initStructure.call(this);
        this.$.setAttribute('class', 'contact-list');
    },

    setupItem: function(data) {
        return new ContactItem();
    }
});

var list = new ContactsList();

document.getElementById('app')
    .appendChild(list.domify());

list.add({
    first: 'Hello',
    last: 'World'
});

list.add({
    first: 'Foo',
    last: 'Bar'
});