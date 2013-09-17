var Widget = require('../Widget');
// var ERR = require('../error');

var TextField = Widget.extend({
    initStructure: function() {
        var fromJSON = require('../fromJSON');
        this.$ = fromJSON([
            'input', {
                type: 'text'
            }
        ]);
    },

    setValue: function(value) {
        if(this._isDomified()) {
            this._getInput().domify().value = value;
        } else {
            this._getInput().setAttribute('value', value);
        }
    },


    getValue: function() {
        if(this._isDomified()) {
            return this._getInput().domify().value;
        } else {
            return this._getInput().getAttribute('value');
        }
    },

    _isDomified: function() {
        return !!(this.$.el);
    },

    _getInput:function () {
        return this.$;
    }
});

module.exports = TextField;