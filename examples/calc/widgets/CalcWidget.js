var dominate = require('../../../dominate');
var fromJSON = dominate.fromJSON;

var CalcWidget = dominate.Widget.extend({
    initStructure: function() {
        this.$ = fromJSON([
            'div', {class:'calc'}, [
                ['div', [
                    ['field:text', {'ui:asset':'screen', readonly:'true'}],
                    ['input', {'ui:asset':'dump', type:'hidden'}]
                ]],
                ['table', [
                    ['tr', [
                        ['td', [['button', ['7'], {'ui:asset':'n7'}]]],
                        ['td', [['button', ['8'], {'ui:asset':'n8'}]]],
                        ['td', [['button', ['9'], {'ui:asset':'n9'}]]],
                        ['td', [['button', ['/'], {'ui:asset':'op_div'}]]],
                        ['td', [['button', ['C'], {'ui:asset':'reset'}]]]
                    ]],
                    ['tr', [
                        ['td', [['button', ['4'], {'ui:asset':'n4'}]]],
                        ['td', [['button', ['5'], {'ui:asset':'n5'}]]],
                        ['td', [['button', ['6'], {'ui:asset':'n6'}]]],
                        ['td', [['button', ['*'], {'ui:asset':'op_mul'}]]],
                        ['td', {rowspan:'3'}, [['button', ['='], {'ui:asset':'enter'}]]]
                    ]],
                    ['tr', [
                        ['td', [['button', ['1'], {'ui:asset':'n1'}]]],
                        ['td', [['button', ['2'], {'ui:asset':'n2'}]]],
                        ['td', [['button', ['3'], {'ui:asset':'n3'}]]],
                        ['td', [['button', ['-'], {'ui:asset':'op_sub'}]]]
                    ]],
                    ['tr', [
                        ['td', {colspan:'2'}, [['button', ['0'], {'ui:asset':'n0'}]]],
                        ['td', [['button', ['.'], {'ui:asset':'point'}]]],
                        ['td', [['button', ['+'], {'ui:asset':'op_add'}]]]
                    ]]
                ]]

            ]
        ]);
    },

    ready: function() {
        for (var i = 0; i <= 9; i++) {
            this.assets['n' + i].listenTo('click');
            this.assets['n' + i].on('dom.click', function(i) {
                this.emit('num', i);
            }.bind(this, i));
        }

        this.assets.op_add.listenTo('click');
        this.assets.op_sub.listenTo('click');
        this.assets.op_mul.listenTo('click');
        this.assets.op_div.listenTo('click');
        this.assets.enter.listenTo('click');
        this.assets.reset.listenTo('click');

        this.assets.op_add.on('dom.click', this.__opHandler.bind(this, 'add'));
        this.assets.op_sub.on('dom.click', this.__opHandler.bind(this, 'sub'));
        this.assets.op_mul.on('dom.click', this.__opHandler.bind(this, 'mul'));
        this.assets.op_div.on('dom.click', this.__opHandler.bind(this, 'div'));

        this.assets.enter.on('dom.click', function () {
            this.emit('enter');
        }.bind(this));

        this.assets.reset.on('dom.click', function () {
            this.emit('reset');
        }.bind(this));

        this.__addNamesToAssets();
    },

    __addNamesToAssets: function () {
        //Server-side: give assets names in order to submit HTML-form
        var formAssets = ['n0', 'n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9',
            'op_mul', 'op_div', 'op_add', 'op_sub',
            'enter', 'reset', 'dump'
        ];

        formAssets.forEach(function (assetName) {
            this.assets[assetName].setAttribute('name', assetName);
        }.bind(this));
    },

    __opHandler: function(op) {
        this.emit('op', op);
    },

    applyAttribute_screen: function(value) {
        this.assets.screen.setValue(value);
    },

    applyAttribute_dump: function(value) {
        //Server-side: full dump of calc state.
        //In this example we use hidden field to store of the machine state.
        this.assets.dump.setAttribute('value', value);
    }

});

module.exports = CalcWidget;