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

