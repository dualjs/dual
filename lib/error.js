exports.NotSupported = function(msg) {
	var e = new Error(msg);
	e.name = 'NotSupported error';
	return e;
};

exports.NotImplemented = function(msg) {
	var e = new Error(msg);
	e.name = 'NotImplemented error';
	return e;
};

exports.Integrity = function(msg) {
	var e = new Error(msg);
	e.name = 'Integrity error';
	return e;
};

exports.Parse = function(msg) {
	var e = new Error(msg);
	e.name = 'Parse error';
	return e;
};

exports.Validation = function(msg) {
	var e = new Error(msg);
	e.name = 'Validation error';
	return e;
};