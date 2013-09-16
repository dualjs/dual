var ContactList = require('./ContactList');
var ContactForm = require('./ContactForm');


var list = new ContactList();
var form = new ContactForm();

document.getElementById('app')
    .appendChild(list.domify());

document.getElementById('app')
    .appendChild(form.domify());

form.populate({
    first: 'a',
    last: 'b',
    email: 'a.b@example.com'
});

list.add({
    first: 'Hello',
    last: 'World',
    email: 'hello.world@example.com'
});

list.add({
    first: 'Foo',
    last: 'Bar',
    email: 'foo.bar@example.com'
});

list.add({
    first: 'Abc',
    last: 'Xyz',
    email: 'abc.xyz@example.com'
}, 1);