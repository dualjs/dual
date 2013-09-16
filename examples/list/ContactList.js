var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;
var ContactItem = require('./ContactItem');

var ContactList = dominate.List.extend({

    initStructure: function() {
        dominate.List.prototype.initStructure.call(this);
        this.$.setAttribute('class', 'contact-list');
    },

    setupItem: function(data) {
        return new ContactItem();
    }
});

module.exports = ContactList;