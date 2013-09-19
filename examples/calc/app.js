/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var CalcWidget = require('./widgets/CalcWidget');
var Calc = require('./Calc');
var calcController = require('./calcController');
var postController = require('./postController');

var LayoutWidget = require('./widgets/LayoutWidget');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


function init(req, res, next) {
    var layout = new LayoutWidget();
    var calcView = new CalcWidget();
    var calc = new Calc();
    calcController(calc, calcView);

    req.layout = layout;
    req.calcView = calcView;
    req.calc = calc;
    next();
}

function render(req, res) {
    req.layout.content().appendChild(req.calcView);
    res.send(req.layout.stringify());
}

app.get('/',
    init,
    function(req, res, next) {
        req.calc.reset();
        req.calcView.setAttribute('dump', req.calc.toJSON());
        next();
    },
    render
);

app.post('/',
    init,
    function(req, res, next) {
        postController(req, req.calc);
        req.calcView.setAttribute('dump', req.calc.toJSON());
        next();
    },
    render
);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});