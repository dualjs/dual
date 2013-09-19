module.exports = function(calc, calcView) {
    calcView.on('op', function(op) {
        calc.op(op);
    });

    calcView.on('num', function(digit) {
        calc.num(digit);
    });

    calcView.on('enter', function() {
        calc.enter();
    });

    calcView.on('reset', function() {
        calc.reset();
    });

    calc.on('screen', function(screen) {
        calcView.setAttribute('screen', screen);
    });
};