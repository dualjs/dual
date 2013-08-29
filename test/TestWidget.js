var Widget = require('../lib/Widget');
var Node = require('../lib/Node');
var fromJSON = require('../lib/fromJSON');

module.exports = Widget.extend({
    initStructure: function() {
        this.$ = fromJSON({
            T: 'div',
            A: {
                name: 'root'
            },
            C: [{
                T: 'table',
                C: [{
                    T: 'tr',
                    C: [{
                        T: 'td',
                        A: {
                            name: 'leftCell'
                        },
                        C: ['hello']
                    }, {
                        T: 'td',
                        A: {
                            name: 'rightCell'
                        },
                        C: ['world']
                    }]
                }]
            }]
        });
    },

    applyAttribute_left : function (value) {
        this.assets.leftCell.children[0].setContent(value);
    },

    applyAttribute_right : function (value) {
        this.assets.rightCell.children[0].setContent(value);
    }
});