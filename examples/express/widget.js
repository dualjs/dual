var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var Widget = module.exports = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON({
            T: 'div',
            A: {
                name: 'root'
            },
            C: [{
                T: 'table',
                A: {
                    border: '1'
                },
                C: [{
                    T: 'tr',
                    C: [{
                        T: 'th',
                        C: ['Title:']
                    }, {
                        T: 'td',
                        A: {
                            name: 'titleCell'
                        },
                        C: ['hello']
                    }]
                }, {
                    T: 'tr',
                    C: [{
                        T: 'th',
                        C: ['Time:']
                    }, {
                        T: 'td',
                        A: {
                            name: 'timeCell'
                        },
                        C: ['world']
                    }]
                }, ]
            }]
        });
    },

    applyAttribute_title: function(value) {
        this.assets.titleCell.children[0].setContent(value);
    },

    applyAttribute_time: function(value) {
        this.assets.timeCell.children[0].setContent(value);
    },

    setTitle: function(title) {
        this.setAttribute('title', title);
    },

    setTime: function(time) {
        this.setAttribute('time', time);
    }
});