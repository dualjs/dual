var boop = require('boop');

var Node = module.exports = boop.extend({
    tagname: 'div',
    selfClosing: false,

    initialize: function() {
        this._ = {};
        this.children = [];
    },

    setAttribute: function(name, value) {
        this._[name] = value;
        //а еще тут где-то надо синхронизировать изменения на реальный DOM, если он есть.
        //но чтобы можно было переопределять это, надо сделать чтото типа типа applyAttribute
    },

    getAttribute: function(name) {
        return this._[name];
    },

    appendChild: function(node) {
        //а еще тут где-то надо синхронизировать изменения на реальный DOM, если он есть.
        throwIfSelfClosing(this);
        this.children.push(node);
    },
    //а еще тут надо removeChild и removeAt
    //и деструктор!
    //АААААА!!!!!!!!

    prependChild: function(node) {
        throwIfSelfClosing(this);
        this.children.unshift(node);
    },

    insertAt: function(node, index) {
        throwIfSelfClosing(this);
        this.children.splice(index, 1, node);
    },

    indexOf: function(node) {
        return this.children.indexOf(node);
    },

    insertBefore: function(node, refNode) {
        throwIfSelfClosing(this);
        this.insertAt(node, this.locate(refNode));
    },

    stringify: function() {
        var res = [];
        res.push('<');
        res.push(esc(this.tagname));
        res.push(' ');
        res.push(stringifyAttrs(this._));
        if(this.selfClosing) {
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

    domify: function () {
        if(this.el) {
            return this.el;
        }

        var el = document.createElement(this.tagname);

        Object.keys(this._).forEach(function (key) {
            var val = this._[key];
            el.setAttribute(key, val);
        }.bind(this));

        this.children.forEach(function (child) {
            el.appendChild(child.domify());
        });

        this.el = el;

        return el;
    },

    toJSON : function () {
        var js = {};
        js.T = this.tagname;
        js.A = this._;
        js.C = this.children.map(function (child) {
            return child.toJSON();
        });
        return js;
    }
});

function esc(unsafe_str) {
    return unsafe_str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
}

function stringifyAttrs(attrs) {
    return Object.keys(attrs).map(function(key) {
        var val = attrs[key];
        return esc(key) + '=' + '"' + esc(val) + '"';
    }).join(' ');
}

function throwIfSelfClosing(node) {
    if (node.selfClosing) {
        throw new Error('E_SELF_CLOSING');
    }
}