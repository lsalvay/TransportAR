// Invocar modo JavaScript 'strict'
'use strict';

// Crear un nuevo método controller 'render'
exports.render = function(req, res) {
	// Usar el objeto 'response' para renderizar la view 'index' con un 'title' y propiedades 'userFullName'
	res.render('index', {
		title: 'TransportAR',
		user: JSON.stringify(req.user)
	});
};
