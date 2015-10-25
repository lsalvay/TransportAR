// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'articles'
angular.module('localidades').controller('LocalidadesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Localidades',
    function($scope, $routeParams, $location, Authentication, Localidades) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

 // Crear un nuevo método controller para crear nuevos articles
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource article
            var localidad = new Localidades({
                nombre: this.nombre,
                provincia: this.provincia
            });

            // Usar el método '$save' de article para enviar una petición POST apropiada
            localidad.$save(function(response) {
                // Si un artículo fue creado de modo correcto, redireccionar al usuario a la página del artículo 
                $location.path('localidades/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de artículos
        $scope.find = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.localidades = Localidades.query();
        };

        // Crear un nuevo método controller para recuperar un unico artículo
        $scope.findOne = function() {
            // Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.localidad = Localidades.get({
                localidadId: $routeParams.localidadId
            });
        };

 // Crear un nuevo método controller para actualizar un único article
        $scope.update = function() {
            // Usar el método '$update' de article para enviar una petición PUT apropiada
            $scope.localidad.$update(function() {
                // Si un article fue actualizado de modo correcto, redirigir el user a la página del article 
                $location.path('localidades/' + $scope.localidad._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para borrar un único artículo
        $scope.delete = function(localidad) {
            // Si un artículo fue enviado al método, borrarlo
            if (localidad) {
                // Usar el método '$remove' del artículo para borrar el artículo
                localidad.$remove(function() {
                    // Eliminar el artículo de la lista de artículos
                    for (var i in $scope.localidades) {
                        if ($scope.localidades[i] === localidad) {
                            $scope.localidades.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de article para borrar el article
                $scope.localidad.$remove(function() {
                    $location.path('localidades');
                });
            }
        };

    }
]);