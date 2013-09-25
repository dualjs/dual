var boop = require('boop');
var utils = require('./utils');
var esc = utils.escape;
var ERR = require('./error');
var bean = require('./bean');
var events = require('events');

var EventEmitter = events.EventEmitter;

var Node = boop.extend({
    tagname: 'div',
    parent: null,

    initialize: function() {
        this._ = {};
        this.children = [];
        this._domEvents = {};
    },

    setAttribute: function(name, value) {
        this._[name] = value;
        this.applyAttribute(name, value);
    },

    /**
     * Separate attribute to namespace and attribute name
     * @param  {String} attrName
     * @return {Object}
     */
    _getAttributePath: function (attrName) {
        var aPath = attrName.split(':', 2);
        return {
            name : aPath.pop(),
            nameSpace : aPath.pop()
        };
    },

    applyAttribute: function(attrName, value) {
        var path = this._getAttributePath(attrName);
        var name = path.name;
        var ns = path.nameSpace

        if(ns) {
            var nsApplier = 'applyAttributeNs_' + ns;
            if ('function' === typeof this[nsApplier]) {
                this[nsApplier].call(this, name, value);
                return;
            }
        }

        var applier = 'applyAttribute_' + name;
        if ('function' === typeof this[applier]) {
            this[applier].call(this, value);
            return;
        }

        this._domify_applyAttribute(name, value);
    },

    _domify_applyAttribute: function(name, value) {
        if(!this.__isAttrVisible(name)) {
            return;
        }
        if (this.el) {
            if (true === value) {
                this.el.setAttribute(name, name);
            } else if (false === value || null === value || undefined === value) {
                this.el.removeAttribute(name);
            } else {
                this.el.setAttribute(name, value);
            }
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

    setText: function (text) {
        var TextNode = require('./Node/Text');
        this.clear();
        var txtNode = new TextNode();
        txtNode.setContent(text);
        this.appendChild(txtNode);
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

    /**
    * listen to DOM event
    */
    listenTo: function(domEvent) {
        this._domEvents[domEvent] = true;
        this._domify_listenTo(domEvent);
    },

    unlistenTo: function(domEvent) {
        delete this._domEvents[domEvent];
        this._domify_unlistenTo(domEvent);
    },

    _domify_listenTo: function(domEvent) {
        if (this.el && bean) {
            bean.on(this.el, domEvent, this.__domEventHandler.bind(this));
        }
    },

    _domify_unlistenTo: function(domEvent) {
        if (this.el && bean) {
            bean.off(this.el, domEvent);
        }
    },

    __domEventHandler: function (e) {
        var type = e.type;
        this.emit('dom.'+type, e);
    },

    stringify: function() {
        var res = [];
        res.push('<');
        res.push(esc(this.tagname));
        res.push(this.__stringifyAttrs(this._));
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
        this.el = el;

        Object.keys(this._).forEach(function(key) {
            var val = this._[key];
            this._domify_applyAttribute(key, val);
        }.bind(this));

        this.children.forEach(function(child) {
            this._domify_appendChild(child);
        }.bind(this));

        Object.keys(this._domEvents).forEach(function(eventName) {
            this._domify_listenTo(eventName);
        }.bind(this));

        return el;
    },

    toJSON: function() {
        var js = [];
        js.push(this.tagname);
        js.push(this._);
        js.push(this.children.map(function(child) {
            return child.toJSON();
        }));
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

    applyAttributeNs_class : function (attrName, value) {
        var cl = this.getAttribute('class') || '';
        if(value) {
            this.setAttribute('class', utils.addToken(cl, attrName));
        } else {
            this.setAttribute('class', utils.removeToken(cl, attrName));
        }
    },

    addClass : function (cssClass) {
        this.setAttribute('class:' + cssClass, true);
    },

    hasClass : function (cssClass) {
        var cl = this.getAttribute('class') || '';
        var map = utils.strToTokenMap(cl);
        return map.hasOwnProperty(cssClass);
    },

    toggleClass : function (cssClass) {
        this.setAttribute('class:' + cssClass, !this.hasClass(cssClass));
    },

    removeClass : function (cssClass) {
        this.setAttribute('class:' + cssClass, false);
    },

    __own: function(node) {
        if (!node.isFree()) {
            throw new ERR.Integrity('Node not free');
        }
        node.parent = this;
    },

    __free: function(node) {
        node.parent = null;
    },

    __isAttrVisible: function (attrName) {
        return (0 !== attrName.indexOf('ui:'));
    },

    __stringifyAttrs: function (attrs) {
        var _attrs = Object.keys(attrs)
        .filter(function (attr) {
            return this.__isAttrVisible(attr);
        }.bind(this))
        .map(function(key) {
            var val = attrs[key];
            var escaped;
            if(true === val) {
                escaped = esc(key) + '=' + '"' + esc(key) + '"';
            } else if(false === val || null === val || undefined === val) {
                escaped = false;
            } else {
                escaped = esc(key) + '=' + '"' + esc(''+val) + '"';
            }
            return escaped;
        })
        .filter(function (item) {
            return item;
        });

        if (_attrs.length) {
            _attrs.unshift('');
        }
        return _attrs.join(' ');
    },

    on: EventEmitter.prototype.on,
    off: EventEmitter.prototype.off,
    emit: EventEmitter.prototype.emit
});

function throwIfSelfClosing(node) {
    if (node.isSelfClosing()) {
        throw new ERR.NotSupported('Node is self closing');
    }
}

module.exports = Node;