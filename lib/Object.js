var boop = require('boop');
var utils = require('./utils');
// var ERR = require('./error');

var Obj = boop.extend({
    initialize: function() {
        this._ = {};
        this._initAttributes();
    },

    ATTRS: {},

    setAttribute: function(key, val) {
        this._[key] = val;
        this.getAttributeApplier(key).call(this, val);
    },

    getAttribute: function(key) {
        return this._[key];
    },

    getAttributeDescription: function(key) {
        var attrs = this.ATTRS || {};
        return attrs[key] || {};
    },

    applyAttributeDefault: function() {

    },

    forEachAttr: function(cb) {
        Object.keys(this.ATTRS || {}).forEach(cb);
    },

    _initAttributes: function() {
        this.forEachAttr(function (attr) {
            this._initAttribute(attr);
        }.bind(this));
    },

    _initAttribute: function(key) {
        var init = this.getAttributeDescription(key).init;
        if(undefined === init) {
            return;
        }
        if ('function' === typeof init) {
            this.setAttribute(key, init.call(this, key));
            return;
        }
        this.setAttribute(key, init);
    },

    getAttributeApplier: function(key) {
        var applier = this.getAttributeDescription(key).apply || 'applyAttribute_' + key;
        return getFunction(this, applier, this.applyAttributeDefault);
    }
}, {
    extend: function(protoProps, staticProps) {
        var ext = utils.extend;
        var attrs = ext({}, this.prototype.ATTRS || {});
        var newAttrs = protoProps.ATTRS || {};
        var result = boop.extend.call(this, protoProps, staticProps);

        Object.keys(newAttrs).forEach(function(attrName) {
            if (!attrs[attrName]) {
                attrs[attrName] = {};
            }
            attrs[attrName] = ext({}, attrs[attrName], newAttrs[attrName]);
        });

        result.prototype.ATTRS = attrs;


        return result;
    }
});

function getFunction(self, func, def) {
    if ('function' === typeof(func)) {
        return func;
    }
    if ('function' === typeof(self[func])) {
        return self[func];
    }

    return def;
}

module.exports = Obj;