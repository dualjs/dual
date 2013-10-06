var boop = require('boop');
var utils = require('./utils');
// var ERR = require('./error');

var Obj = boop.extend({
    initialize: function() {
        this._ = {};
        this._initAttributes();
    },

    ATTRS: {},

    /**
find attribute applier
apllier found? => call and return.
apllier not found? => find attribute NS applier
NS applier found? => call and return
NS applier not found? => call applyAttributeDefault

    */
    setAttribute: function(key, val) {
        var options = {};
        var path = this._getAttributePath(key);
        options.attrName = key;
        options.oldValue = this._[key];
        options.attrDescription = this.getAttributeDescription(key);

        this._[key] = val;
        var applier = this.getAttributeApplier(key);
        if (applier !== false) {
            applier.call(this, val, options);
            return;
        } else {
            var nsApplier = this.getAttributeNsApplier(path);
            if (false !== nsApplier) {
                options.path = path;
                nsApplier.call(this, path.name, val, options);
                return;
            }
            this.applyAttributeDefault(val, options);
        }
    },

    getAttribute: function(key) {
        return this._[key];
    },

    getAttributeDescription: function(key) {
        var attrs = this.ATTRS || {};
        return attrs[key] || {};
    },

    /**
     * Split an attribute to its namespace and attribute name
     * @param  {String} attrName
     * @return {Object}
     */
    _getAttributePath: function(attrName) {
        var aPath = attrName.split(':', 2);
        return {
            name: aPath.pop(),
            nameSpace: aPath.pop()
        };
    },

    applyAttributeDefault: function() {

    },

    forEachAttr: function(cb) {
        Object.keys(this.ATTRS || {}).forEach(cb);
    },

    _initAttributes: function() {
        this.forEachAttr(function(attr) {
            this._initAttribute(attr);
        }.bind(this));
    },

    _initAttribute: function(key) {
        var init = this.getAttributeDescription(key).init;
        if (undefined === init) {
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
        return getFunction(this, applier, false);
    },

    getAttributeNsApplier: function(path) {
        var applier = 'applyAttributeNs_' + path.nameSpace;
        return getFunction(this, applier, false);
    },

    destroy: function () {
        this._ = {};
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

        createAccessors(result);

        return result;
    }
});

function createAccessors(constr) {
    var proto = constr.prototype;
    var attrs = proto.ATTRS || {};
    Object.keys(attrs).forEach(function(key) {
        var key_ = utils.toUpperCaseFirst(utils.safeName(key));

        var setterName = 'set' + key_;
        if (!(setterName in proto)) {
            proto[setterName] = function(value) {
                this.setAttribute(key, value);
            };
        }
        var getterName = 'get' + key_;
        if (!(getterName in proto)) {
            proto[getterName] = function() {
                return this.getAttribute(key);
            };
        }
    });
}

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