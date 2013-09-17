var boop = require('boop');

var BackboneModelAdapter = boop.extend({

    initialize: function(model, node) {
        this.__model = model;
        this.__node = node;
        this.subscribe();
    },

    subscribe: function() {
        this.__model.on('change', this.__onModelChange.bind(this));
    },

    __onModelChange: function() {
        var model = this.__model;
        var changes = model.changedAttributes();
        if (!changes) {
            return;
        }

        for (var key in changes) {
            if (changes.hasOwnProperty(key)) {
                var value = changes[key];
                this.onModelChangeAttr(key, value);
            }
        }
    },

    onModelChangeAttr: function(attr, value) {
        var node = this.__node;
        node.setAttribute(attr, value);
    }

});

module.exports = BackboneModelAdapter;