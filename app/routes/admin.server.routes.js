// Invocar el modo 'strict' de JavaScript
'use strict';

// Cargar las dependencias del módulo
var admin = require('../../app/controllers/admin.server.controller'),
    passport = require('passport');

//Definir el método del módulo routes
module.exports = function(app) {
  //Configurar las rutas 'signup'
  app.route('/administrador/signup')
     .get(admin.renderSignup)
     .post(admin.signup);

  //Configurar las routes 'signin'
  app.route('/administrador/signin')
     .get(admin.renderSignin)
     .post(passport.authenticate('local'), admin.isAdmin);
        

  app.route('/dashboard')
     .get(admin.renderDashBoard);
     
  //Configurar la route 'signout'
  app.get('/administrador/signout', admin.signout);
};