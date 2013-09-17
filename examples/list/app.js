var ContactList = require('./ContactList');
var ContactForm = require('./ContactForm');
var backbone = require('backbone');
var BackboneModelAdapter = require('../../lib/adapter/BackboneModel');
var BackboneCollectionAdapter = require('../../lib/adapter/BackboneCollection');


var contactsListView = new ContactList();
var newContactFormView = new ContactForm();

var contactsCollection = new backbone.Collection();
var newContact = new backbone.Model();

new BackboneCollectionAdapter(contactsCollection, contactsListView);
new BackboneModelAdapter(newContact, newContactFormView);

contactsListView.on('select', function (data) {
    var selectedModel = contactsCollection.get(data.id);
    if(!selectedModel) {
        return;
    }

    newContact.set(selectedModel.attributes);
});

newContact.set({
    first: 'a',
    last: 'b',
    email: 'a.b@example.com'
});

contactsCollection.add({
    id: 100,
    first: 'Hello',
    last: 'World',
    email: 'hello.world@example.com'
});

contactsCollection.add({
    id: 101,
    first: 'Foo',
    last: 'Bar',
    email: 'foo.bar@example.com'
});

contactsCollection.add({
    id: 102,
    first: 'Abc',
    last: 'Xyz',
    email: 'abc.xyz@example.com'
}, {
    index: 1
});

document.getElementById('app')
    .appendChild(contactsListView.domify());

document.getElementById('app')
    .appendChild(newContactFormView.domify());