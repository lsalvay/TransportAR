// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'articles'
angular.module('localidades').factory('Localidades', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' article
    return $resource('api/localidades/:localidadId', {
        localidadId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);