// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/articles.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'articles'  
	app.route('/api/articles')
	   .get(articles.list)
	   .post(users.requiresLogin, articles.create);
	
	// Configurar las rutas 'articles' parametrizadas
	app.route('/api/articles/:articleId')
	   .get(articles.read)
	   .put(users.requiresLogin, articles.hasAuthorization, articles.update)
	   .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

	// Configurar el parámetro middleware 'articleId'   
	app.param('articleId', articles.articleByID);
};