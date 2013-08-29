var boop = require('boop');
var utils = require('./utils');
var esc = utils.escape;
var ERR = require('./error');

var Node = module.exports = boop.extend({
    tagname: 'div',
    parent: null,

    initialize: function() {
        this._ = {};
        this.children = [];
    },

    setAttribute: function(name, value) {
        this._[name] = value;
        this.applyAttribute(name, value);
    },

    applyAttribute: function(name, value) {
        var applier = 'applyAttribute_' + name;
        if ('function' === typeof this[applier]) {
            this[applier].call(this, value);
            return;
        }

        this._domify_applyAttribute(name, value);
    },

    _domify_applyAttribute: function(name, value) {
        if (this.el) {
            this.el.setAttribute(name, value);
        }
    },

    getAttribute: function(name) {
        return this._[name];
    },

    appendChild: function(node) {
        //а еще тут где-то надо синхронизировать изменения на реальный DOM, если он есть.
        throwIfSelfClosing(this);
        if (!node.isFree()) {
            node.parent.removeChild(node);
        }
        this.children.push(node);
        this.__own(node);
        this._domify_appendChild(node);
    },

    _domify_appendChild: function(node) {
        if (this.el) {
            this.el.appendChild(node.domify());
        }
    },

    prependChild: function(node) {
        throwIfSelfClosing(this);
        if (!node.isFree()) {
            node.parent.removeChild(node);
        }
        this.children.unshift(node);
        this.__own(node);
        this._domify_prependChild(node);
    },

    _domify_prependChild: function(node) {
        if (this.el) {
            utils.DOMPrependChild(this.el, node.domify());
        }
    },

    insertBefore: function(node, refNode) {
        throwIfSelfClosing(this);
        var index = this.indexOf(refNode);
        if (-1 === index) {
            return; //TODO: throw?
        }
        if (!node.isFree()) {
            node.parent.removeChild(node);
        }
        this.children.splice(index, 0, node);
        this.__own(node);
        this._domify_insertBefore(node, refNode);
    },

    _domify_insertBefore: function(node, refNode) {
        if (this.el) {
            this.el.insertBefore(node.domify(), refNode.domify());
        }
    },

    removeChild: function(node) {
        var index = this.indexOf(node);
        if (-1 === index) {
            return; //TODO: throw?
        }
        this.children.splice(index, 1);
        this.__free(node);
        this._domify_removeChild(node);
    },

    _domify_removeChild: function(node) {
        if (this.el) {
            this.el.removeChild(node.domify());
        }
    },

    clear: function () {
        while(this.children.length) {
            this.removeChild(this.children[0]);
        }
    },

    // //deprecated
    // insertAt: function(node, index) {
    //     throwIfSelfClosing(this);
    //     this.children.splice(index, 0, node);
    //     this.__own(node);
    // },

    indexOf: function(node) {
        return this.children.indexOf(node);
    },

    stringify: function() {
        var res = [];
        res.push('<');
        res.push(esc(this.tagname));
        res.push(stringifyAttrs(this._));
        if (this.isSelfClosing()) {
            res.push(' />');
            return res.join('');
        }

        res.push('>');

        res.push(this.children.map(function(child) {
            return child.stringify();
        }).join(''));

        res.push('</' + esc(this.tagname) + '>');
        return res.join('');
    },

    domify: function() {
        if (this.el) {
            return this.el;
        }

        var el = document.createElement(this.tagname);

        Object.keys(this._).forEach(function(key) {
            var val = this._[key];
            el.setAttribute(key, val);
        }.bind(this));

        this.children.forEach(function(child) {
            el.appendChild(child.domify());
        });

        this.el = el;

        return el;
    },

    toJSON: function() {
        var js = {};
        js.T = this.tagname;
        js.A = this._;
        js.C = this.children.map(function(child) {
            return child.toJSON();
        });
        return js;
    },

    isSelfClosing: function() {
        return false;
    },

    isTraversable: function() {
        return true;
    },

    isFree: function() {
        return !this.parent;
    },

    __own: function(node) {
        if (!node.isFree()) {
            throw new ERR.Integrity('Node not free');
        }
        node.parent = this;
    },

    __free: function(node) {
        node.parent = null;
    }
});

function stringifyAttrs(attrs) {
    var attrs = Object.keys(attrs).map(function(key) {
        var val = attrs[key];
        return esc(key) + '=' + '"' + esc(val) + '"';
    });
    if (attrs.length) {
        attrs.unshift('');
    }
    return attrs.join(' ');
}

function throwIfSelfClosing(node) {
    if (node.isSelfClosing()) {
        throw new ERR.NotSupported('Node is self closing');
    }
}