var boop = require('boop');
var dominate = require('../../dominate');
var node = dominate.fromJSON;

var Widget = module.exports = boop.extend({
    initialize : function () {
        var el = node({T : 'div'});
        this.titleText = node('');
        this.timeText = node('');
        el.appendChild(this.titleText);
        el.appendChild(this.timeText);
        this.el = el;
    },

    setTitle : function (title) {
        this.titleText.setContent(title);
    },

    setTime : function (time) {
        this.timeText.setContent(time);
    },

    stringify : function () {
        return this.el.stringify();
    }
});