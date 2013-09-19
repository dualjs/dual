var Node = require('./Node');
var utils = require('./utils');
var ERR = require('./error');
var stub = require('./stub');
var esc = utils.escape;

var Widget = module.exports = Node.extend({
    tagname: null,

    initialize: function(content) {
        this.$ = null;
        this.assets = {};
        this.initStructure();
        this.indexStructure();
        this.bindEvents();
        Node.prototype.initialize.apply(this, arguments);
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

    bindEvents: function () {
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