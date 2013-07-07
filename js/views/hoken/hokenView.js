define([
    'jquery',
    'underscore',
    'backbone',
    'bind',
    'event',

    'function/map_calculation'
], function($, _, Backbone, bind, Event, map_calculation){

      var HokenView = Backbone.View.extend({
          color_support: null,
          color_supported: null,
          relation_line_objects: null,

          map: null,
          initialize: function(map){
              this.visible = false;

              this.circleCountries = [];
              this.count = 0;

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
              $.getJSON('js/json/hoken/developed_country_data.json',
                      bind(this.readDevelopedData, this)
                  ).success(function () {
                      console.log("second success");
                  })
                  .error(function () {
                      console.log("error");
                  })
                  .complete(function () {
                      console.log("complete");
                  });

              $.getJSON('js/json/hoken/developing_country_data.json',
                      bind(this.readDevelopingData, this)
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

              $("li#li_hoken").addClass("click");
              if($("li#li_oda").hasClass('click'))  $("li#li_oda").removeClass("click");

              // ------------

              for(var i in this.circleCountries){
                  this.circleCountries[i].setVisible(true);
              }
          },

          readDevelopedData: function(data){
              this.circleCountries = this.circleCountries.concat(map_calculation(data, this.color_support, false, this.map, "developed"));
              this.count += 1;

              if(this.count == 2){
                  Event.trigger("hokenViewRender");
              }
          },

          invisible: function(){
              this.visible = false;

              // ------------
              for(var i in this.circleCountries){
                  this.circleCountries[i].setVisible(false);
              }
          },

          readDevelopingData: function(data){
              this.circleCountries = this.circleCountries.concat(map_calculation(data, this.color_supported, false, this.map, "developing"));
              this.count += 1;

              if(this.count == 2){
                  Event.trigger("hokenViewRender");
              }
          }
      });

    return HokenView;

});
