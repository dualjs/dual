var Node = require('../Node');
var utils = require('../utils');
var esc = utils.escape;

var Text = module.exports = Node.extend({
    tagname: null,

    initialize: function(content) {
        this.setContent(content);
    },

    setContent:function (content) {
        this.content = content;

        if(this.el) {
            this.el.textContent = this.content;
        }
    },

    setAttribute: null,

    applyAttribute: null,

    getAttribute: null,

    appendChild: null,

    prependChild: null,

    insertAt: null,

    indexOf: null,

    insertBefore: null,

    isSelfClosing: null,

    stringify: function() {
        return esc(this.content);
    },

    domify: function() {
        if (this.el) {
            return this.el;
        }

        var el = this.el = document.createTextNode(this.content);

        return el;
    },

    toJSON: function() {
        return this.content;
    },

    isTraversable : function () {
        return false;
    }

});