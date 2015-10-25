var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocalidadSchema = new Schema({
  creado: {
    type: Date,
    default: Date.now
  },
  nombre: {
    type: String,
    default: '',
    trim: true,
    required: 'El nombre no puede estar en blanco'
  },
  provincia: {
    type: String,
    default: '',
    trim: true
  },
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Localidad', LocalidadSchema);