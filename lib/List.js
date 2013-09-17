var Widget = require('./Widget');
var DefaultListItem = require('./DefaultListItem');
var fromJSON = require('./fromJSON');
// var utils = require('./utils');
var ERR = require('./error');
// var stub = require('./stub');
// var esc = utils.escape;

var List = Widget.extend({
    initialize: function() {
        this._items = [];
        return Widget.prototype.initialize.apply(this, arguments);
    },

    initStructure: function() {
        this.$ = fromJSON(['ul', {
            name: 'root'
        }]);
    },

    setupItem: function() {
        return new DefaultListItem();
    },

    updateItem: function (index, newData) {
        var item = this.__getItem(index);
        var data = item.data;
        var node = item.node;
        for(var attrName in newData) {
            if(newData.hasOwnProperty(attrName)) {
                var attrValue = newData[attrName];
                var oldAttrValue = data[attrName];
                if(attrValue !== oldAttrValue) {
                    node.setAttribute(attrName, attrValue);
                }
            }
        }
    },

    __getItem: function (index) {
        index = parseInt(index, 10);
        var item = this._items[index];
        if(!item) {
            throw new ERR.Integrity('Item not found');
        }
        return item;
    },

    add: function(data, index) {
        var len = this.getLength();
        var nextSiblingItem = false;
        var parent = this.getChildrenContainer();

        if (!index && index !== 0) {
            index = len;
        } else {
            index = parseInt(index, 10);
        }
        if (index < 0) {
            index = 0;
        }
        if (index >= len) {
            index = len;
        } else {
            nextSiblingItem = this._items[index];
        }

        var child = this.setupItem(data, index);
        this._items.splice(index, 0, {
            data: {},
            node: child
        });
        this.updateItem(index, data);
        if (nextSiblingItem) {
            parent.insertBefore(child, nextSiblingItem.node);
        } else {
            parent.appendChild(child);
        }
    },

    getLength: function() {
        return this._items.length;
    },

    remove: function(index) {
        index = parseInt(index, 10);
        var item = this._items[index];
        if (!item) {
            throw new ERR.Integrity('Not found');
        }
        var node = item.node;
        this.getChildrenContainer().removeChild(node);
        this._items.splice(index, 1);
    },

    clear: function () {
        var len = this.getLength();
        while(len) {
            this.remove(len - 1);
            len = this.getLength();
        }
    },

    getChildrenContainer: function() {
        return this.assets.root;
    }
});
module.exports = List;