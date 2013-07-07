define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {

    var OdaModel = Backbone.Model.extend({
        initialize: function(){ alert("Welcome to this world"); }
    });

    var odaModel = new OdaModel();
    return odaModel;
});