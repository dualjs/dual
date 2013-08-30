var boop = require('boop');
var ERR = require('./error');
var DefaultNode = require('./Node/Default');
var TextNode = require('./Node/Text');



var Factory = module.exports = boop.extend({
    initialize: function() {
        this._registry = {};
    },

    register: function (name, constructor) {
        this._registry[name] = constructor;
    },

    create: function(json) {
        var self = this;
        if (isString(json)) {
            return createTextNode(json);
        }

        if (!Array.isArray(json)) {
            throw new ERR.Validation('Not an array');
        }

        if (!json.length) {
            throw new ERR.Validation('Array empty');
        }

        var tagname;
        var attrs;
        var children;
        var len = json.length;

        tagname = json[0];
        if (isObject(json[1])) {
            attrs = json[1] || {};
        } else if (Array.isArray(json[1])) {
            children = json[1] || [];
        }

        if (isObject(json[2])) {
            if (attrs) {
                throw new ERR.Validation('Duplicate attrs');
            }
            attrs = json[2] || {};
        } else if (Array.isArray(json[2])) {
            if (children) {
                throw new ERR.Validation('Duplicate children');
            }
            children = json[2] || [];
        }

        attrs = attrs || {};
        children = children || [];

        var constr = this._registry[tagname];
        if (constr) {
            var node = new this._registry[tagname]();
        } else {
            var node = new DefaultNode();
            node.setTagName(tagname);
        }
        Object.keys(attrs).forEach(function(key) {
            var val = attrs[key];
            node.setAttribute(key, val);
        });

        children.forEach(function(child) {
            node.appendChild(self.create(child));
        });

        return node;
    }

});



function createTextNode(str) {
    return new TextNode(str);
}

function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
}

function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}