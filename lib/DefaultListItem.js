var fromJSON = require('./fromJSON');
var Widget = require('./Widget');

var DefaultListItem = Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['li']);
    },

    applyAttribute_text : function (value) {
        this.$.setText(value);
    }
});

module.exports = DefaultListItem;