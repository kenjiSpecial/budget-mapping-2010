// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'event',
    'views/googleMap/googleMapView',
    'views/oda/odaView',
    'views/hoken/hokenView',
    'views/header/headerView'
], function ($, _, Backbone, Event, GoogleMapView, OdaView, HokenView, HeaderView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'oda': 'oda',
            'hoken': 'hoken',

            // Default: show the oda view.
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var app_router = new AppRouter;
        var googleMapView = new GoogleMapView();
        googleMapView.render();
        var hokenView = new HokenView(googleMapView.map);
        var odaView = new OdaView(googleMapView.map);
        var headerView = new HeaderView();

        var renderFirst = true;
        var renderHoken = false;
        var renderODA = false;

        Event.on('hokenViewRender', function(){
            if(renderFirst&&renderHoken){
                hokenView.render();
                renderFirst = false;
                renderHoken = false;
            }
        });

        Event.on('odaViewRender', function(){
            if(renderFirst&&renderODA){
                odaView.render();
                renderFirst = false;
                renderODA = false;
            }
        });

        app_router.on('route:oda', function () {
            odaView.render();

            renderODA = true;

            if(hokenView.visible){
                hokenView.invisible();
            }
        });

        app_router.on('route:hoken', function () {
            hokenView.render();

            renderHoken = true;

            if(odaView.visible){
                odaView.invisible();
            }
        });


        app_router.on('route:defaultAction', function () {
            odaView.render();

            renderODA = true;

            if(hokenView.visible){
                hokenView.invisible();
            }
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
