var ContactList = require('./ContactList');
var ContactForm = require('./ContactForm');
var backbone = require('backbone');
var BackboneModelAdapter = require('../../lib/adapter/BackboneModel');
var BackboneCollectionAdapter = require('../../lib/adapter/BackboneCollection');


var list = new ContactList();
var form = new ContactForm();
var contacts = new backbone.Collection();
var newContact = new backbone.Model();
new BackboneCollectionAdapter(contacts, list);
new BackboneModelAdapter(newContact, form);


newContact.set({
    first: 'a',
    last: 'b',
    email: 'a.b@example.com'
});

contacts.add({
    first: 'Hello',
    last: 'World',
    email: 'hello.world@example.com'
});

contacts.add({
    first: 'Foo',
    last: 'Bar',
    email: 'foo.bar@example.com'
});

contacts.add({
    first: 'Abc',
    last: 'Xyz',
    email: 'abc.xyz@example.com'
}, {
    index: 1
});

document.getElementById('app')
    .appendChild(list.domify());

document.getElementById('app')
    .appendChild(form.domify());