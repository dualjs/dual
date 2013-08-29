var DefaultNode = require('./Node/Default');
var TextNode = require('./Node/Text');
var ERR = require('./error');

var constructors = {
    'div': require('./Node'),
    'img': require('./Node/Img')
};

var fromJSON = module.exports = function fromJSON(json) {
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
    if(isObject(json[1])) {
        attrs = json[1] || {};
    } else if(Array.isArray(json[1])) {
        children = json[1] || [];
    }

    if(isObject(json[2])) {
        if(attrs) {
            throw new ERR.Validation('Duplicate attrs');
        }
        attrs = json[2] || {};
    } else if(Array.isArray(json[2])) {
        if(children) {
            throw new ERR.Validation('Duplicate children');
        }
        children = json[2] || [];
    }

    attrs = attrs || {};
    children = children || [];

    var constr = constructors[tagname];
    if (constr) {
        var node = new constructors[tagname]();
    } else {
        var node = new DefaultNode();
        node.setTagName(tagname);
    }
    Object.keys(attrs).forEach(function(key) {
        var val = attrs[key];
        node.setAttribute(key, val);
    });

    children.forEach(function(child) {
        node.appendChild(fromJSON(child));
    });

    return node;

};

function createTextNode(str) {
    return new TextNode(str);
}

function isString(val) {
    return Object.prototype.toString.call(val) === '[object String]';
}
function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
