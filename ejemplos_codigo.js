app.route(path).VERB(callback)

app.VERB(path, callback)


app.get('/', function(req, res) {
  res.send('Esto es una petición GET');
});


app.post('/', function(req, res) {
  res.send('Esto es una petición POST');
});


app.route('/').get(function(req, res) {
  res.send('Esto es una petición GET');
}).post(function(req, res) {
  res.send('Esto es una petición POST');
});

var express = require('express');

var obtenerNombre = function(req, res, next) {
  if (req.param('nombre')) {
    next();
  } else {
    res.send('¿Cómo te llamas?');
  }
};

var diHola = function(req, res, next) {
  res.send('Hola ' + req.param('nombre'));
};

var app = express();
app.get('/', obtenerNombre, diHola);

app.listen(3000);
console.log('Servidor ejecutándose en http://localhost:3000/');