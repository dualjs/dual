var constructors = {
    'div' : require('./Node'),
    'img' : require('./Node/Img')
};

var fromJSON = module.exports = function fromJSON(json) {
    var tagname = json.T;
    var attrs = json.A;
    var children = json.C;

    var node = new constructors[tagname];
    Object.keys(attrs).forEach(function (key) {
        var val = attrs[key];
        node.setAttribute(key, val);
    });

    children.forEach(function (child) {
        node.appendChild(fromJSON(child));
    });

    return node;

};