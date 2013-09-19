module.exports = function (req, calc) {
    var post = req.body;

    calc.fromJSON(post.dump);

    for(var i = 0; i <= 9; i++) {
        if(('n'+i) in post) {
            calc.num(i);
            return;
        }
    }

    ['mul', 'div', 'add', 'sub'].forEach(function (operator) {
        if(('op_' + operator) in post) {
            calc.op(operator);
            return;
        }
    });

    if('reset' in post) {
        calc.reset();
        return;
    }

    if('enter' in post) {
        calc.enter();
        return;
    }
};