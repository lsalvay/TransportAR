// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'articles'
angular.module('buscador').controller('BuscadorController', ['$scope', '$routeParams', '$location', 'EmpresasBus',
    function($scope, $routeParams, $location, EmpresasBus) {
// Crear un nuevo método controller para recuperar una lista de artículos
        $scope.find = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.empresas = EmpresasBus.query();
        };


    }
]);