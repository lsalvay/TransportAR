// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	empresas = require('../../app/controllers/empresas.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'empresas'  
	app.route('/api/empresas')
	   .get(empresas.list)
	   .post(users.requiresLogin, empresas.create);
	app.route('/api/empresas/maps')
	   .get(empresas.listMap)
	   .post(users.requiresLogin, empresas.create);
	
	// Configurar las rutas 'empresas' parametrizadas
	app.route('/api/empresas/:empresaId')
	   .get(empresas.read)
	   .put(users.requiresLogin, empresas.hasAuthorization, empresas.update)
	   .delete(users.requiresLogin, empresas.hasAuthorization, empresas.delete);

	// Configurar el parámetro middleware 'empresaId'   
	app.param('empresaId', empresas.empresaByID);
};