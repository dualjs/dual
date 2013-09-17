var boop = require('boop');

var BackboneCollectionAdapter = boop.extend({

    initialize: function(collection, list) {
        this.__collection = collection;
        this.__list = list;
        this.subscribe();
    },

    subscribe: function() {
        this.__collection.on('reset', this.__onCollectionReset.bind(this));
        this.__collection.on('add', this.__onCollectionAdd.bind(this));
        this.__collection.on('change', this.__onCollectionChange.bind(this));
        this.__collection.on('remove', this.__onCollectionRemove.bind(this));
        this.__collection.on('sort', this.__onCollectionSort.bind(this));
    },

    __onCollectionAdd: function(model, collection, options) {
        var list = this.__list;
        list.add(model.attributes);
    },

    __onCollectionRemove: function(model, collection, options) {
        var list = this.__list;
        var index = options.index;
        list.remove(index);
    },

    __onCollectionChange: function(model, options) {
        var coll = this.__collection;
        var list = this.__list;
        var index = coll.indexOf(model);
        list.updateItem(index, model.changedAttributes());
    },

    __onCollectionReset: function(collection) {
        var list = this.__list;

        list.clear();
        collection.each(function (model) {
            list.add(model.attributes);
        });
    },

    __onCollectionSort: function(collection) {
        var list = this.__list;

        list.clear();
        collection.each(function (model) {
            list.add(model.attributes);
        });
    },
});

module.exports = BackboneCollectionAdapter;