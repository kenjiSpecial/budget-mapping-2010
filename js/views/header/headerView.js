define([
    'jquery',
    'underscore',
    'backbone',
    'bind',
    'event',

    'function/map_calculation'
], function($, _, Backbone, bind, Event, map_calculation){

    var headerView = Backbone.View.extend({
        el: $(".header-bt"),
        initialize: function(){
            this.$el.click(function(){
                Event.trigger("change-view");
            });
        }
    });

    return headerView;

});
