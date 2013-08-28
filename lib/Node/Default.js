var Node = require('../Node');
var utils = require('../utils');

var Default = module.exports = Node.extend({
    tagname: null,

    isSelfClosing: function() {
        return !!utils.selfClosingTags[this.tagname];
    },

    setTagName: function(name) {
        this.tagname = name;
    }
});