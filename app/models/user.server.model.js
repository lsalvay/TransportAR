// Invocar el modo JavaScript 'strict'
'use strict';

// Cargar las dependencias de módulos
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

// Definir un nuevo 'UserSchema'
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    // Validar el formato email 
    match: [/.+\@.+\..+/, "Por favor escribe una dirección de email correcta"]
  },
  username: {
    type: String,
    //Configurar un único index 'username'
    unique: true,
    //Validar existencia valor 'username'
    required: 'Nombre de usuario es obligatorio',
    //Trim el campo 'username'
    trim: true
  },
  password: {
    type: String,
    //Validar el valor length de 'password'
    validate: [
    function(password) {
        return password && password.length > 6;
      }, 'La contraseña debe ser más larga'
    ]
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    //Validar existencia valor Provider
    required: 'Provider es obligatorio'
  },
  providerId: String,
  providerData: {},
  created: {
    type: Date,
    //Crear un valor 'created' por defecto
    default: Date.now
  }
});

// Configurar la propiedad virtual 'fullname'
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

//Usar un middleware pre-save para hash la contraseña
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});
//Crear un método instancia para hashing una contraseña
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

//Crear un método instancia para autentificar usuario
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

//Encontrar posibles username no usados
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var _this = this;

  //Añadir un sufijo 'username'
  var possibleUsername = username + (suffix || '');

//Usar el método 'findOne' del model 'User' para encontrar un username único disponible
  _this.findOne({
    username: possibleUsername
  }, function(err, user) {
    //Si ocurre un error llama al callback con un valor null, en otro caso encuentra un username disponible único
    if (!err) {
        //si un username único disponible fue encontrado llama al método callback, en otro caso llama al método 'findUniqueUsername' de nuevo con un nuevo sufijo
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
UserSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

//Crear el model 'User' a partir del 'UserSchema'
mongoose.model('User', UserSchema);