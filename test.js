var Node = require('./Node');
var Img = require('./Node/Img');
var fromJSON = require('./fromJSON');

var n = new Node();

n.setAttribute('foo', 'bar');

var i = new Img();
i.setAttribute('src', '/');

n.appendChild(i);

console.log(n.stringify());
console.log(JSON.stringify(n.toJSON(), false, 4));

console.log(fromJSON({
    T: 'div',
    A: {
        foo: 'bar'
    },
    C: [{
        T: 'img',
        A: {
            src : '1.png',
            style: 'float: left;'
        },
        C: []
    },{
        T: 'img',
        A: {
            src : '2.png',
            style: 'float: right;'
        },
        C: []
    }]
}).stringify());