var Node = require('../Node');
var utils = require('../utils');
var stub = require('../stub');

var esc = utils.escape;

var Text = module.exports = Node.extend({
    tagname: null,

    initialize: function(content) {
        this.setContent(content);
    },

    setContent: function(content) {
        this.content = content;

        if (this.el) {
            this.el.textContent = this.content;
        }
    },

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

    isTraversable: function() {
        return false;
    },

    setAttribute: stub.notImplemented,
    applyAttribute: stub.notImplemented,
    getAttribute: stub.notImplemented,
    appendChild: stub.notImplemented,
    prependChild: stub.notImplemented,
    insertAt: stub.notImplemented,
    indexOf: stub.notImplemented,
    insertBefore: stub.notImplemented,
    isSelfClosing: stub.notImplemented
});