var List = require('../lib/List');
var fromJSON = require('../lib/fromJSON');
var ContactItem = require('./ContactItem');

var ContactList = List.extend({
    setupItem: function(data) {
        return new ContactItem();
    }
});

module.exports = ContactList;