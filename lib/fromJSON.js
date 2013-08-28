var DefaultNode = require('./Node/Default')
var TextNode = require('./Node/Text')

var constructors = {
    'div' : require('./Node'),
    'img' : require('./Node/Img')
};

var fromJSON = module.exports = function fromJSON(json) {
    if(Object.prototype.toString.call(json) === '[object String]') {
        return createTextNode(json);
    }

    var tagname = json.T;
    var attrs = json.A || {};
    var children = json.C || [];

    var constr = constructors[tagname];
    if(constr) {
        var node = new constructors[tagname]();
    } else {
        var node = new DefaultNode();
        node.setTagName(tagname);
    }
    Object.keys(attrs).forEach(function (key) {
        var val = attrs[key];
        node.setAttribute(key, val);
    });

    children.forEach(function (child) {
        node.appendChild(fromJSON(child));
    });

    return node;

};

function createTextNode(str) {
    return new TextNode(str);
}