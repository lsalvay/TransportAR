var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','users','example', 'empresas', 'localidades', 'ui.filters']);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider, uiGmapGoogleMapApiProvider) {
    $locationProvider.hashPrefix('!');

  }
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});