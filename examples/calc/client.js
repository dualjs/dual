var dual = require('../../dual');
var Calc = require('./Calc');
var CalcWidget = require('./widgets/CalcWidget');
var calcController = require('./calcController');

var container = document.getElementById('app');
var calcView = new CalcWidget();
var calc = new Calc();
calcController(calc, calcView);

calc.reset();

container.appendChild(calcView.domify());