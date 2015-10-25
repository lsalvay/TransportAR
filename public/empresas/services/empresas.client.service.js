// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'articles'
angular.module('empresas').factory('Empresas', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' article
    return $resource('api/empresas/:empresaId', {
        empresaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);