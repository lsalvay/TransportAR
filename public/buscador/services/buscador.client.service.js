// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'articles'
angular.module('buscador').factory('EmpresasBus', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' article
    return $resource('api/empresas/:empresaId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);