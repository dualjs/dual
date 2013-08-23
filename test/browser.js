require.config({
    baseUrl: 'amd',
    paths: {
        'boop': '../../node_modules/boop/boop'
    }
});

//--------------------------------------------------------------------
define(function(require) {
    var Node = require('./Node');
    var Img = require('./Node/Img');
    var fromJSON = require('./fromJSON');

    var n = fromJSON({
        T: 'div',
        A: {
            foo: 'bar',
            style: 'background: yellow; width: 50px; height:50px; display:inline-block'
        },
        C: []
    });

    document.body.appendChild(n.domify());

    n.setAttribute('style', 'background: red; width: 50px; height:50px; display:inline-block');


});