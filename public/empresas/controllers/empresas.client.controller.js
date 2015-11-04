// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'articles'
angular.module('empresas').controller('EmpresasController', ['$scope', '$routeParams', '$location', 'Authentication', 'Empresas', '$http', 'Localidades',
    function($scope, $routeParams, $location, Authentication, Empresas, $http, Localidades) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;
        $http.get('http://localhost:3000/api/localidades')
       .then(function(res){
          $scope.localidades = res.data;

        $scope.selection=[];
        // toggle selection for a given employee by name
        $scope.toggleSelection = function toggleSelection(provinciaNombre) {
        var idx = $scope.selection.indexOf(provinciaNombre);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selection.push(provinciaNombre);
        }
        }; 
        
        $scope.selectionLoc=[];
        // toggle selection for a given employee by name
        $scope.toggleSelectionLoc = function toggleSelectionLoc(localidadNombre) {
        var idx = $scope.selectionLoc.indexOf(localidadNombre);

        // is currently selected
        if (idx > -1) {
            $scope.selectionLoc.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selectionLoc.push(localidadNombre);
        }
        }; 
                
        });      

 // Crear un nuevo método controller para crear nuevos articles
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource article
            
                $scope.sucursales=[];
                if(this.direccionSuc!=null){
                    var Sucursal1={
                    direccion:this.direccionSuc,
                    telefono: this.telefonoSuc,
                    provincia:this.provinciaSuc,
                    localidad:this.localidadSuc
                    };
                $scope.sucursales.push(Sucursal1);
                }

                if(this.direccionSuc2!=null){
                    var Sucursal2={
                    direccion:this.direccionSuc2,
                    telefono: this.telefonoSuc2,
                    provincia:this.provinciaSuc2,
                    localidad:this.localidadSuc2
                    };
                    $scope.sucursales.push(Sucursal2);
                }
                
                if(this.direccionSuc3!=null){
                    var Sucursal3={
                    direccion:this.direccionSuc3,
                    telefono: this.telefonoSuc3,
                    provincia:this.provinciaSuc3,
                    localidad:this.localidadSuc3
                    };
                    $scope.sucursales.push(Sucursal3);
                }
                
                 if(this.direccionSuc4!=null){
                    var Sucursal4={
                    direccion:this.direccionSuc4,
                    telefono: this.telefonoSuc4,
                    provincia:this.provinciaSuc4,
                    localidad:this.localidadSuc4
                    };
                    $scope.sucursales.push(Sucursal4);
                }

                var empresa = new Empresas({
                nombre: this.nombre,
                telefono: this.telefono,
                web: this.web,
                provincia: $scope.selection,
                localidad: $scope.selectionLoc,
                sucursales: $scope.sucursales
                
            });


            // Usar el método '$save' de article para enviar una petición POST apropiada
            empresa.$save(function(response) {
                // Si un artículo fue creado de modo correcto, redireccionar al usuario a la página del artículo 
                $location.path('empresas/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de artículos
        $scope.find = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.empresas = Empresas.query();
        };

        // Crear un nuevo método controller para recuperar un unico artículo
        $scope.findOne = function() {
            // Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.empresa = Empresas.get({
                empresaId: $routeParams.empresaId
            });
        };

 // Crear un nuevo método controller para actualizar un único article
        $scope.update = function() {
            // Usar el método '$update' de article para enviar una petición PUT apropiada
            $scope.empresa.$update(function() {
                // Si un article fue actualizado de modo correcto, redirigir el user a la página del article 
                $location.path('empresas/' + $scope.empresa._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para borrar un único artículo
        $scope.delete = function(empresa) {
            // Si un artículo fue enviado al método, borrarlo
            if (empresa) {
                // Usar el método '$remove' del artículo para borrar el artículo
                empresa.$remove(function() {
                    // Eliminar el artículo de la lista de artículos
                    for (var i in $scope.empresas) {
                        if ($scope.empresas[i] === empresa) {
                            $scope.empresas.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de article para borrar el article
                $scope.empresa.$remove(function() {
                    $location.path('empresas');
                });
            }
        };

    }
]);