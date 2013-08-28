exports.DOMPrependChild = function (root, child) {
    if(!root.childNodes.length) {
        root.appendChild(child);
    } else {
        root.insertBefore(child, root.firstChild);
    }
};