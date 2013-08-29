var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var Toolbar = module.exports = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['nav', [
            ['ul', {
                name: 'ul'
            }]
        ]]);
    },

    addItem: function(item) {
        this.assets.ul.appendChild(fromJSON(
            ['li', [
                ['a', {
                        href: item.href
                    },
                    ['' + item.text]
                ]
            ]]
        ));
    }
});