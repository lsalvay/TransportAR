// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'empresas'
angular.module('empresas').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'empresas/views/buscar-empresas.client.view.html'
		}).
		when('/empresas', {
			templateUrl: 'empresas/views/list-empresas.client.view.html'
		}).
		when('/empresas/create', {
			templateUrl: 'empresas/views/create-empresa.client.view.html'
		}).
		when('/empresas/:empresaId', {
			templateUrl: 'empresas/views/view-empresa.client.view.html'
		}).
		when('/empresas/:empresaId/edit', {
			templateUrl: 'empresas/views/edit-empresa.client.view.html'
		});
	}
]); 