var Widget = require('./Widget');

var Container = module.exports = Widget.extend({
    childrenAsset: null,

    initialize: function () {
        this.children = [];
        Widget.prototype.initialize.apply(this, arguments);
    },

    add : function (child, options) {
        options = options || {};
        var holder = this._getChildrenContainer(child, options);
        holder.appendChild(child);
        this.children.push(child);
    },

    appendChild: function (child) {
        //For Factory compatibility
        //TODO: extract layout options from namespaced attrs.
        return this.add(child);
    },

    remove: function (child) {
        this.removeAt(this.indexOf(child));
    },

    removeAt: function (index) {
        var child = this.children[index];
        if(!child) {
            return; //TODO: throw?
        }
        this.children.splice(index, 1);
        this._removeChild(child, index);
    },

    _removeChild: function (child, index) {
        child.parent.removeChild(child);
    },

    indexOf: function (child) {
        return this.children.indexOf(child);
    },

    _getChildrenContainer: function (child, options) {
        child = child || null;
        options = options || {};

        return this.childrenAsset ? this.assets[this.childrenAsset] : this.$;
    },

    isTraversable: function () {
        return true;
    }
});