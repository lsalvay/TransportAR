var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SucursalSchema = new Schema({
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
  localidad: {
    type: String,
    default: '',
    trim: true
  }
  
});

var EmpresaSchema = new Schema({
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
    type: [String],
    default: '',
    trim: true
  },
  localidad: {
    type: [String],
    default: '',
    trim: true
  },
  sucursales : [SucursalSchema],
  creador: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Empresa', EmpresaSchema);