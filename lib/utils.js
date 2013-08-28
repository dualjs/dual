
exports.selfClosingTags = {
    'meta'   : true,
    'img'    : true,
    'link'   : true,
    'input'  : true,
    'source' : true,
    'area'   : true,
    'base'   : true,
    'col'    : true,
    'br'     : true,
    'hr'     : true
};

exports.DOMPrependChild = function(root, child) {
    if (!root.childNodes.length) {
        root.appendChild(child);
    } else {
        root.insertBefore(child, root.firstChild);
    }
};

exports.escape = function(unsafe_str) {
    return unsafe_str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
};

var traverse = exports.traverse = function (node, cb) {
    if(!node.isTraversable()) {
        return;
    }

    cb(node);
    node.children.forEach(function (child) {
        traverse(child, cb);
    });
};

var index = exports.index = function (node, multiple, cb) {
    multiple = !!multiple;
    var idx = {};
    traverse(node, function (node) {
        var val = cb(node);
        if(val !== undefined && val !== null) {
            if(multiple) {
                if(!idx[val]) {
                    idx[val] = [];
                }
                idx[val].push(node);
            } else {
                idx[val] = node;
            }
        }
    });
    return idx;
};

var indexBy = exports.indexBy = function (node, multiple, attrName) {
    return index(node, multiple, function (node) {
        return node.getAttribute(attrName);
    });
};

var indexByName = exports.indexByName = function (node, multiple) {
    return indexBy(node, multiple, 'name');
};

var indexById = exports.indexById = function (node, multiple) {
    return indexBy(node, multiple, 'id');
};