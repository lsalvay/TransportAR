angular.module('servicesLocalStorage',[]).factory('localStorageCliente', ['$window', function($window) {
 
    var localStorage = $window.localStorage; 


    function setDatos(name,datos){
        return localStorage.setItem(name,JSON.stringify(datos));
    }

    function getDatos (name){
        return JSON.parse(localStorage.getItem(name));
    }


    function removeDatos(name){
        return localStorage.removeItem(name);
    }

    return{
        getDatos:getDatos,
        setDatos:setDatos,
        removeDatos:removeDatos
    }
}]);
