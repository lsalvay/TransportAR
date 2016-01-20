// Invocar modo JavaScript 'strict'
'use strict';
var multer = require('multer');

var upload = multer({dest: 'uploads/'})


// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	empresas = require('../../app/controllers/empresas.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'empresas'  
	app.route('/api/empresas')
	   .get(empresas.list)
	   .post(users.requiresLogin, upload.single('logo'), empresas.create);

	// Configurar la rutas base a 'intersect'    
	app.route('/api/intersect/')
	   .get(empresas.listMap);
	
	// Configurar las rutas 'empresas' parametrizadas
	app.route('/api/empresas/:empresaId')
	   .get(empresas.read)
	   .put(users.requiresLogin, users.validarAdmin, empresas.hasAuthorization, empresas.update)
	   .delete(users.requiresLogin, users.validarAdmin, empresas.hasAuthorization, empresas.delete);

	// Configurar el parámetro middleware 'empresaId'   
	app.param('empresaId', empresas.empresaByID);
	
};