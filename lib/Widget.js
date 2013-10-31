var Obj = require('./Object');
var easyAttrs = require('./easyAttrs');
var utils = require('./utils');
var stub = require('./stub');
var events = require('events');

var EventEmitter = events.EventEmitter;

var Widget = module.exports = Obj.extend({
    tagname: null,

    initialize: function(content) {
        this.$ = null;
        this.assets = {};
        this.initStructure();
        this.indexStructure();
        Obj.prototype.initialize.apply(this, arguments);
        this.ready();
    },

    stringify: function() {
        return this.$.stringify();
    },

    domify: function() {
        return this.$.domify();
    },

    indexStructure: function() {
        this.assets = utils.indexBy(this.$, false, 'ui:asset');
        this.assetGroups = utils.indexBy(this.$, true, 'ui:group');
    },

    ready: function () {
    },

    __destroyChildren: function () {
        this.$.destroy();
    },

    __destroyEvents: function () {
        this.removeAllListeners();
    },

    destroy: function () {
        this.__destroyChildren();
        this.__destroyEvents();

        Obj.prototype.destroy.call(this);
    },

    isTraversable: function () {
        return true;
    },


    initStructure: stub.abstractMethod,
    appendChild: stub.abstractMethod,
    prependChild: stub.abstractMethod,

    //TODO
    // toJSON: function() {
    //     return this.content;
    // }

}, {
    extend: function (protoProps, staticProps) {
        var newConstructor = Obj.extend.call(this, protoProps, staticProps);
        return easyAttrs(newConstructor, protoProps, staticProps);
    }
});

utils.extend(Widget.prototype, EventEmitter.prototype);