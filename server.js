// Invocar modo JavaScript 'strict'
'use strict';

// Configurar la variable 'NODE_ENV'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Cargar las dependencias de módulos
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

// Crear una nueva instancia conexión Mongoose
var db = mongoose();

// Crear una nueva instancia aplicación Express
var app = express();

// Configurar el middleware Passport
var passport = passport();

// Usar la instancia de la aplicación Express para que escuche en el puerto '3000'
app.listen(3000);

// Hacer Log del status del server a la consola
console.log('Servidor ejecutándose en http://localhost:3000/');

// Usar la prpiedad module.exports para exponer nuestra nuestra instancia de la aplicación Express para uso externo
module.exports = app;


