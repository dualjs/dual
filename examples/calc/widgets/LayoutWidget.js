var dominate = require('../../../dominate');
var fromJSON = dominate.fromJSON;

var LayoutWidget = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON([
            'html', [
                ['link', {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: './public/style.css'
                }],
                ['title', ['Server-side calculator example']],
                ['body', [
                    ['h4', ['Server-side calculator example']],
                    ['p', [
                        ['a', {href:'/client-side'}, ['view client-side version']]
                    ]],
                    ['form', {
                        action: '/',
                        method: 'POST',
                        'ui:asset': 'content'
                    }]
                ]]
            ]
        ]);
    },

    content: function () {
        return this.assets.content;
    }

});

module.exports = LayoutWidget;