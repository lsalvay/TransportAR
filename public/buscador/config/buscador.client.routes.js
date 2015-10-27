// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'empresas'
angular.module('buscador').config(['$routeProvider',
	function($routeProvider) {
    	$routeProvider.
    	when('/', {
      	templateUrl: 'buscador/views/list-buscador.client.view.html'
    	}).
    	otherwise({
      	redirectTo: '/'
    	});
  	}
]); 