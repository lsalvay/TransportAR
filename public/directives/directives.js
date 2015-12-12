angular.module('directives',[]).directive("myDirective", function(){

    return{
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function(scope, element, attrs){
            var myLatLong = new google.maps.LatLng(-33.7859831,-63.7955673);
            var mapOptions = {
                center: myLatLong,
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }; 
            var map = new google.maps.Map(document.getElementById(attrs.id),
                mapOptions);
             var triangleCoords = [
              {lat: -28.70408061020613, lng: -61.241455078125},
              {lat: -29.231268861253753, lng: -62.528076171875},
              {lat: -30.684803923910714, lng: -65.05035400390625},
              {lat: -31.70644501798348, lng: -65.0238037109375},
              {lat: -34.98593222251521, lng: -58.466796875},
              {lat: -33.62209381491508, lng: -58.55560302734375},
              {lat: -31.863849655116105, lng:-59.9627685546875 },
              {lat:-28.709459223613344, lng:-59.744873046875 }
            ];

            var defaultZone = new google.maps.Polygon({
                paths: triangleCoords,
                editable: true,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#FF0000',
                fillOpacity: 0.35
            });
            defaultZone.setMap(map);

            // Identifica cuando los puntos del poligono son movidos 
            defaultZone.addListener('mouseup',function(event){
                var vertices = this.getPath();
                
                var coordenadas = [];
                for (var i =0; i < vertices.getLength(); i++) {
                    var xy = vertices.getAt(i);
                    coordenadas.push([xy.lng(),xy.lat()]);
                }

            // Asigna las coordenadas del poligono 
            coordenadas.push(coordenadas[0]);
            scope.tempCoordenadas=  coordenadas;  


            })
            
        }
    };
}).directive("myDirective2", function(){

    return{
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function(scope, element, attrs){
      //declaracion de variables globales      
      var distPuntoA = null;
      var distPuntoB = null;
      var origin_place_id = null;
      var destination_place_id = null;
      var travel_mode = google.maps.TravelMode.WALKING;
      var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: {lat: -31.3982698, lng: -64.3344306},
        zoom: 6
      });
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);

      //Encapsular de forma global el mapa 
      scope.mapaGlobal = map;

      var origin_input = document.getElementById('origin-input');
      var destination_input = document.getElementById('destination-input');
      var modes = document.getElementById('mode-selector');

      var origin_autocomplete = new google.maps.places.Autocomplete(origin_input);
      origin_autocomplete.bindTo('bounds', map);
      var destination_autocomplete =
          new google.maps.places.Autocomplete(destination_input);
      destination_autocomplete.bindTo('bounds', map);

      // Sets a listener on a radio button to change the filter type on Places
      // Autocomplete.
      

      function expandViewportToFitPlace(map, place) {
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
      }

      origin_autocomplete.addListener('place_changed', function() {
        var place = origin_autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }
        expandViewportToFitPlace(map, place);

        // Datos de coordenadas de la ubicacion origen
        var latitud = origin_autocomplete.getPlace().geometry.location.lat();
        var longitud = origin_autocomplete.getPlace().geometry.location.lng();

        // pasar parametros al scope 
        scope.puntoOrigen = [longitud,latitud];

        //guardar coordenadas del punto B para calcular la distancia
        distPuntoA = new google.maps.LatLng(latitud, longitud);

        // If the place has a geometry, store its place ID and route if we have
        // the other place ID
        origin_place_id = place.place_id;
        route(origin_place_id, destination_place_id, travel_mode,
              directionsService, directionsDisplay);
      });

      destination_autocomplete.addListener('place_changed', function() {
        var place = destination_autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }
        expandViewportToFitPlace(map, place);

        // Datos de coordenadas de la ubicacion destino
        var latitud = destination_autocomplete.getPlace().geometry.location.lat();
        var longitud = destination_autocomplete.getPlace().geometry.location.lng();

        // pasar parametros al scope 
        scope.puntoDestino = [longitud,latitud];

        //guardar coordenadas del punto B para calcular la distancia
        distPuntoB = new google.maps.LatLng(latitud,longitud);
        //envía al scope la distancia en KM
        scope.distancia= (google.maps.geometry.spherical.computeDistanceBetween (distPuntoA, distPuntoB)/1000).toFixed(2);
        scope.precio = scope.distancia*8;

        // If the place has a geometry, store its place ID and route if we have
        // the other place ID
        destination_place_id = place.place_id;
        route(origin_place_id, destination_place_id, travel_mode,
              directionsService, directionsDisplay);
      });

      function route(origin_place_id, destination_place_id, travel_mode,
                     directionsService, directionsDisplay) {
       // debugger;
        if (!origin_place_id || !destination_place_id) {
          return;
        }
        directionsService.route({
          origin: {'placeId': origin_place_id},
          destination: {'placeId': destination_place_id},
          travelMode: travel_mode
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

    }

    };
});

