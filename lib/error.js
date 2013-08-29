exports.NotSupported = function(msg) {
	var e = new Error(msg);
	e.name = 'NotSupported error';
	return e;
};

exports.Integrity = function(msg) {
	var e = new Error(msg);
	e.name = 'Integrity error';
	return e;
};