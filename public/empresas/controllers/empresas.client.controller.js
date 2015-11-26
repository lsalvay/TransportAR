// Invocar modo JavaScript 'strict'
'use strict';
var zona =[];

// Crear el controller 'articles'
angular.module('empresas').controller('EmpresasController', ['$scope', '$routeParams', '$location', 'Authentication', 'Empresas', '$http', 'Localidades',
    function($scope, $routeParams, $location, Authentication, Empresas, $http, Localidades) {
        // Exponer el service Authentication
        
        $scope.authentication = Authentication;
        $http.get('http://localhost:3000/api/localidades')
       .then(function(res){
          $scope.localidades = res.data;

                       
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
                sucursales: $scope.sucursales,
                zona:{
                    "type": "Polygon",
                    "coordinates":$scope.tempCoordenadas

                } 
                
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
]).filter("myFilter",["$filter",function($filter) {
  var filterFn=$filter("filter");
   
  /** Transforma el texto quitando todos los acentos diéresis, etc. **/
  function normalize(texto) {
    texto = texto.replace(/[áàäâ]/g, "a");
    texto = texto.replace(/[éèëê]/g, "e");
    texto = texto.replace(/[íìïî]/g, "i");
    texto = texto.replace(/[óòôö]/g, "o");
    texto = texto.replace(/[úùüü]/g, "u");
    texto = texto.toUpperCase();
    return texto;
  }
    
  /** Esta función es el comparator en el filter **/
  function comparator(actual, expected) {
      if (normalize(actual).indexOf(normalize(expected))>=0) {
        return true;
      } else {
        return false;
      }
  }
   
  /** Este es realmente el filtro **/
  function myFilter(array,expression) {
    //Lo único que hace es llamar al filter original pero pasado
    //la nueva función de comparator
    return filterFn(array,expression,comparator)
  }
   
  return myFilter;
   
}]).directive("myDirective", function(){

    return{
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function(scope, element, attrs){
            var myLatLong = new google.maps.LatLng(-33.7859831,-63.7955673);
            var mapOptions = {
                center: myLatLong,
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }; 
            var map = new google.maps.Map(document.getElementById(attrs.id),
                mapOptions);
             var triangleCoords = [
              {lat: -28.70408061020613, lng: -61.241455078125},
              {lat: -29.231268861253753, lng: -62.528076171875},
              {lat: -30.684803923910714, lng: -65.05035400390625},
              {lat: -31.70644501798348, lng: -65.0238037109375},
              {lat: -34.98593222251521, lng: -58.466796875},
              {lat: -33.62209381491508, lng: -58.55560302734375},
              {lat: -31.863849655116105, lng:-59.9627685546875 },
              {lat:-28.709459223613344, lng:-59.744873046875 }
            ];

            var defaultZone = new google.maps.Polygon({
                paths: triangleCoords,
                editable: true,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });
            defaultZone.setMap(map);

            // Identifica cuando los puntos del poligono son movidos 
            defaultZone.addListener('mouseup',function(event){
                var vertices = this.getPath();
                
                var coordenadas = [];
                for (var i =0; i < vertices.getLength(); i++) {
                    var xy = vertices.getAt(i);
                    coordenadas.push(
                        [  
                        xy.lat(),
                        xy.lng()
                        ]
                        );
                }

            // Asigna las coordenadas del poligono 
            scope.tempCoordenadas=    coordenadas;


            })
            
        }
    };
});

