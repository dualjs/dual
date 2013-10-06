var Obj = require('./Object');
var utils = require('./utils');
var stub = require('./stub');

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

    initStructure: stub.abstractMethod,
    appendChild: stub.abstractMethod,
    prependChild: stub.abstractMethod,

    //TODO
    // toJSON: function() {
    //     return this.content;
    // }

});