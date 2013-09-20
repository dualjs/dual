var dual = require('../../dual');
var fromJSON = dual.fromJSON;

var Toolbar = module.exports = dual.Widget.extend({
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