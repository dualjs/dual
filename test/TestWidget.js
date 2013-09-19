var Widget = require('../lib/Widget');
var fromJSON = require('../lib/fromJSON');

module.exports = Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['div', {'ui:asset':'root'}, [
            ['table', [
                ['tr', [
                    ['td', {'ui:asset':'leftCell'}, ['hello']],
                    ['td', {'ui:asset':'rightCell'}, ['world']]
                ]]
            ]]
        ]]);
    },

    applyAttribute_left : function (value) {
        this.assets.leftCell.setText(value);
    },

    applyAttribute_right : function (value) {
        this.assets.rightCell.setText(value);
    }
});