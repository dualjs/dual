var boop = require('boop');
var EventEmitter = require('events').EventEmitter;

var STATE_ENTER = 'enter';
var STATE_RESULT = 'result';


var Calc = boop.extend({
    initialize: function() {
        this.operator = null;
        this.rx = null;
        this.ry = null;
    },

    toJSON: function() {
        return JSON.stringify({
            state: this.state,
            operator: this.operator,
            rx: this.rx,
            ry: this.ry,
            screen: this.screen
        });
    },

    fromJSON: function(dump) {
        var obj = JSON.parse(dump);
        this.rx = obj.rx;
        this.ry = obj.ry;
        this.screen = obj.screen;
        this.operator = obj.operator;
        this.state = obj.state;

        this.emitScreen();
    },

    // debug: function () {
    // console.log('---------');
    // console.log('x', this.rx);
    // console.log('y', this.ry);
    // },

    reset: function() {
        this.screen = '0';
        this.state = STATE_RESULT;
        this.emitScreen();
        // this.debug();
    },

    emitScreen: function() {
        this.emit('screen', this.screen);
    },

    num: function(val) {
        if (STATE_RESULT === this.state) {
            this.screen = 0;
        }
        var s = (10 * this.screen) + val;
        this.screen = s;
        this.state = STATE_ENTER;

        this.emitScreen();
        // this.debug();
    },

    op: function(op) {
        this.operator = op;
        this.rx = 1 * this.screen;
        this.state = STATE_RESULT;

        this.emit('op', this.operator);
        // this.debug();
    },

    enter: function() {
        var op = this.operator;
        var opFunction = '_op_' + op;

        if (STATE_ENTER === this.state) {
            this.ry = 1 * this.screen;
        }
        this.rx = this[opFunction](this.rx, this.ry);

        this.state = STATE_RESULT;
        this.screen = this.rx;
        this.emitScreen();
        // this.debug();
    },

    _op_add: function(a, b) {
        return a + b;
    },

    _op_sub: function(a, b) {
        return a - b;
    },

    _op_div: function(a, b) {
        return a / b;
    },

    _op_mul: function(a, b) {
        return a * b;
    },

    on: EventEmitter.prototype.on,
    off: EventEmitter.prototype.off,
    emit: EventEmitter.prototype.emit
});

module.exports = Calc;