define([
    'jquery',
    'underscore',
    'backbone',
    'bind',
    'event',

    'function/map_calculation'
], function ($, _, Backbone, bind, Event, map_calculation) {

    var ODAView = Backbone.View.extend({
        color_support: null,
        color_supported: null,
        relation_line_objects: null,

        map: null,

        initialize: function(map){
            this.count = 0;

            this.visible = false;

            this.circleCountries = [];

            // color
            //this.color_support = "#3498DB";
            //this.color_supported = "#1ABC9C";

            this.color_support = "#CD853F";
            this.color_supported = "#2F4F4F";

            // lineObject
            this.relation_line_objects = {};

            // map
            this.map = map;

            // reading the json file
            $.getJSON('js/json/oda/developed_country_data.json',
                    bind(this.readDataTrue, this)
                ).success(function () {
                    console.log("second success");
                })
                .error(function () {
                    console.log("error");
                })
                .complete(function () {
                    console.log("complete");
                });

            $.getJSON('js/json/oda/developing_country_data.json',
                    bind(this.readDataFalse, this)
            ).success(function () {
                    console.log("second success");
                })
                .error(function () {
                    console.log("error");
                })
                .complete(function () {
                    console.log("complete");
                });

        },

        render: function(){
            this.visible = true;

            if($("li#li_oda").hasClass('click') == false) $("li#li_oda").addClass("click");
            if($("li#li_hoken").hasClass('click'))  $("li#li_hoken").removeClass("click");

            // ------------
            for(var i in this.circleCountries){
                this.circleCountries[i].setVisible(true);
            }

        },

        invisible: function(){
            this.visible = false;

            // ------------
            for(var i in this.circleCountries){
                this.circleCountries[i].setVisible(false);
            }
        },

        readDataTrue: function(data){
            var countries = map_calculation(data, this.color_support, true, this.map, "developed");
            this.circleCountries = this.circleCountries.concat(countries);

            this.count += 1;

            if(this.count == 2){
                Event.trigger("odaViewRender");
            }
        },

        readDataFalse: function(data){
            this.circleCountries = this.circleCountries.concat(map_calculation(data, this.color_supported, false, this.map, "developing"));

            this.count += 1;

            if(this.count == 2){
                Event.trigger("odaViewRender");
            }
        }





    });

    return ODAView;
});
