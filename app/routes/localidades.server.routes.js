// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	localidades = require('../../app/controllers/localidades.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'empresas'  
	app.route('/api/localidades')
	   .get(localidades.list)
	   .post(users.requiresLogin, localidades.create);
	
	// Configurar las rutas 'empresas' parametrizadas
	app.route('/api/localidades/:localidadId')
	   .get(localidades.read)
	   .put(users.requiresLogin, localidades.hasAuthorization, localidades.update)
	   .delete(users.requiresLogin, localidades.hasAuthorization, localidades.delete);

	// Configurar el parámetro middleware 'empresaId'   
	app.param('localidadId', localidades.localidadByID);
};