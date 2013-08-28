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