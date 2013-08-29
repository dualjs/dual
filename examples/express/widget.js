var dominate = require('../../dominate');
var fromJSON = dominate.fromJSON;

var Widget = module.exports = dominate.Widget.extend({
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
        this.assets.titleCell.children[0].setContent(value);
    },

    applyAttribute_time: function(value) {
        this.assets.timeCell.children[0].setContent(value);
    },

    setTitle: function(title) {
        this.setAttribute('title', title);
    },

    setTime: function(time) {
        this.setAttribute('time', time);
    }
});