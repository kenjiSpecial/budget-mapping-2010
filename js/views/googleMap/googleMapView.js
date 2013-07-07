define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var GoogleMapView = Backbone.View.extend({
        el: $("div#map_canvas"),
        map: null,
        initialize: function(){
            var geocoder, map;

            var styles = [ { "featureType": "water", "stylers": [ { "lightness": 100 } ] },{ "featureType": "landscape", "stylers": [ { "color": "#d0d5d8" } ] },{ "featureType": "administrative.province", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "stylers": [ { "visibility": "off" } ] },{ "featureType": "administrative.province", "stylers": [ { "visibility": "off" } ] },{ "featureType": "administrative.locality", "stylers": [ { "visibility": "off" } ] },{ "featureType": "administrative.country", "elementType": "geometry", "stylers": [ { "lightness": 100 }, { "weight": 1.8 } ] },{ "elementType": "labels", "stylers": [ { "lightness": 28 }, { "weight": 0.1 } ] },{ } ];
            var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
            var mapOptions = {
                center: new google.maps.LatLng(34.6500, 135.0000),
                zoom: 3,
                mapTypeControl: false,
                streetViewControl: false

            };

            this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            this.map.mapTypes.set('map_style', styledMap);
            this.map.setMapTypeId('map_style');

        },
        render: function(){

        }
    });

    return GoogleMapView;
});