var dual = require('../../dual');
var fromJSON = dual.fromJSON;
var ContactItem = require('./ContactItem');

var ContactList = dual.List.extend({

    initStructure: function() {
        dual.List.prototype.initStructure.call(this);
        this.$.setAttribute('class', 'contact-list');
    },

    setupItem: function(data) {
        var contactItem = new ContactItem();
        contactItem.on('click', function () {
            this.emit('select', data);
        }.bind(this));
        return contactItem;
    }
});

module.exports = ContactList;