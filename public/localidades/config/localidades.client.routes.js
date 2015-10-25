// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'empresas'
angular.module('localidades').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/localidades', {
			templateUrl: 'localidades/views/list-localidades.client.view.html'
		}).
		when('/localidades/create', {
			templateUrl: 'localidades/views/create-localidad.client.view.html'
		}).
		when('/localidades/:localidadId', {
			templateUrl: 'localidades/views/view-localidad.client.view.html'
		}).
		when('/localidades/:localidadId/edit', {
			templateUrl: 'localidades/views/edit-localidad.client.view.html'
		});
	}
]); 