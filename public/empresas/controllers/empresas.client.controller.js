// Invocar modo JavaScript 'strict'
'use strict';
var zona =[];

var urlConexion = window.configuraciones.urlServer;

// Crear el controller 'articles'
angular.module('empresas').controller('EmpresasController', ['$scope', '$routeParams', '$location', 'Authentication', 'Empresas', '$http', 'Localidades','localStorageCliente',
    function($scope, $routeParams, $location, Authentication, Empresas, $http, Localidades,localStorageCliente) {
        
        $scope.listaObjetosCoordenadas = {};
        // Exponer el service Authentication
        $scope.authentication = Authentication;

        $http.get(urlConexion+'/api/localidades')
            .then(function(res){
            $scope.localidades = res.data;

            });
        //seleccion de servicios
        $scope.servicios= [
            "carga",
            "paquete",
            "peligrosa"
        ];
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

            if(localStorageCliente.getDatos('intersect') !== undefined ){
               $scope.puntoOrigen = localStorageCliente.getDatos('puntoOrigen');
               $scope.puntoDestino = localStorageCliente.getDatos('puntoDestino');
              $scope.intersect = localStorageCliente.getDatos('intersect');
            }

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
                servicio: this.selection,
                sucursales: $scope.sucursales,
                zona:{
                    "type": "Polygon",
                    "coordinates":[$scope.tempCoordenadas]
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

        $scope.findIntersect = function() {
            var puntoOrigen =  $routeParams.origen;
            var puntoDestino =  $routeParams.destino;
          
            // consume el api pasando los parametros de coordenadas origen y destino 
            $http.get(urlConexion+'/api/intersect/?origen=['+puntoOrigen +"]&destino=["+puntoDestino+"]")
            .then(function(res){
            $scope.intersect = res.data;

            });
        };

        $scope.cachearDatos = function(){

          localStorageCliente.setDatos('puntoOrigen',$scope.puntoOrigen);
          localStorageCliente.setDatos('puntoDestino',$scope.puntoDestino);
          localStorageCliente.setDatos('intersect',$scope.intersect);

        }

        $scope.limpiarCache = function(){
            localStorageCliente.removeDatos('puntoOrigen');
            localStorageCliente.removeDatos('puntoDestino');
            localStorageCliente.removeDatos('intersect');
            $scope.intersect = [];

            for (var x in $scope.listaObjetosCoordenadas) {
                $scope.listaObjetosCoordenadas[x].setMap(null);
            }
        }

        $scope.linkDetalleEmpresa = function(_idEmpresa){
          
            $scope.cachearDatos();
            $location.path('empresas/'+_idEmpresa);
        }

        $scope.buscarEmpresasCoordenadas = function(){
            // Reiniciar datos  localstorate y limpiar mapa
            localStorageCliente.removeDatos('puntoOrigen');
            localStorageCliente.removeDatos('puntoDestino');
            localStorageCliente.removeDatos('intersect');
            $scope.intersect = [];

            for (var x in $scope.listaObjetosCoordenadas) {
                $scope.listaObjetosCoordenadas[x].setMap(null);
            }

            // Prepara la url  con los datos de las coordenadas 
            var puntoOrigen = $scope.puntoOrigen;
            var puntoDestino = $scope.puntoDestino;
            //redirecciona a la ruta intersect con las coordenadas
             // consume el api pasando los parametros de coordenadas origen y destino 
            $http.get(urlConexion+'/api/intersect/?origen=['+puntoOrigen +"]&destino=["+puntoDestino+"]")
            .then(function(res){
            $scope.intersect = res.data;

            });


        }
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

        $scope.ubicarEmpresa = function(_id,_zona){

          var coordenadasEmpresaUbicacion = [];
          // Armar el array con base a las coordenadas de google {lat:coordenada,lng:coordenada}
          _zona.coordinates.filter(
            function(dato){
              dato.filter(
                function(a)
                {
                  if(a){
                    coordenadasEmpresaUbicacion.push({'lat':  a[1], 'lng':a[0]})                     
                  }
                }
              )
            })
          coordenadasEmpresaUbicacion.splice(coordenadasEmpresaUbicacion.lenght,1);
          //obtener el mapa global 
          var mapaGlobal = $scope.mapaGlobal;
      
            if(!$scope.listaObjetosCoordenadas[_id]){

              //Asignar colores aleatorios para las coordenadas
              var colorA =  Math.floor((Math.random() * 254) + 1);
              var colorB =  Math.floor((Math.random() * 254) + 1);
              var colorC =  Math.floor((Math.random() * 254) + 1);
              
             $scope.listaObjetosCoordenadas[_id] = new google.maps.Polygon({
                paths: coordenadasEmpresaUbicacion,
                editable: false,
                strokeColor: '#'+colorA.toString(16)+colorB.toString(16)+colorC.toString(16),
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#'+colorA.toString(16)+colorB.toString(16)+colorC.toString(16),
                fillOpacity: 0.35
            });
            //asignar al mapa las coordenadas del poligono 
            $scope.listaObjetosCoordenadas[_id].setMap(mapaGlobal);
            }else{
              //borrar el poligono del mapa 
               $scope.listaObjetosCoordenadas[_id].setMap(null);
               //inicializar el objeto 
                //
                //
            // Esta linea es la que genera un problema a la hora de pintar la ubicacion y despintarla.
               $scope.listaObjetosCoordenadas[_id] = false;

            }
        }
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
   
}]);