var D = require('../../dual');

var CheckBox = D.Widget.extend({
    initStructure: function() {
        this.$ = D.fromJSON([
            'div', [['label', [
                ['input', {type: 'checkbox', 'ui:asset': 'input'}],
                ['span' , {'ui:asset': 'caption'}]
            ]]]
        ]);
    },

    applyAttribute_checked: function (value) {
        this.assets.input.setProperty('checked', value);
    },
    applyAttribute_value: function (value) {
        this.assets.input.setAttribute('value', value);
    },
    applyAttribute_caption: function (value) {
        this.assets.caption.setText(value);
    },
    ready: function () {
        this.listenTo('click');
        //TODO!
    }
});

var SitesList = D.List.extend({
    setupItem : function () {
        return new CheckBox();
    }
});

var sl = new SitesList();


sl.add({
    value : 'lenta',
    caption : 'Lenta.ru'
});
sl.add({
    value : 'habr',
    checked : true,
    caption : 'Habrahabr.ru'
});
sl.add({
    value : 'd3',
    caption : 'D3.ru'
});

document.getElementById('app').innerHTML = sl.stringify();
// var SitesList = D.List.extend({
// });