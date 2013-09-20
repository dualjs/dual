var dual = require('../../dual');
var fromJSON = dual.fromJSON;

var Widget = module.exports = dual.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON(['div', {name:'root'}, [
            ['table', { border:'1' }, [
                ['tr', [
                    ['th', ['Title:']],
                    ['td', {name:'titleCell'}, ['hello']]
                ]],
                ['tr', [
                    ['th', ['Time:']],
                    ['td', {name:'timeCell'}, ['world']]
                ]]
            ]]
        ]]);
    },

    applyAttribute_title: function(value) {
        this.assets.titleCell.setText(value);
    },

    applyAttribute_time: function(value) {
        this.assets.timeCell.setText(value);
    },

    setTitle: function(title) {
        this.setAttribute('title', title);
    },

    setTime: function(time) {
        this.setAttribute('time', time);
    }
});