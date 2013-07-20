define([
    'jquery',
    'underscore',
    'backbone',
    'event'
], function ($, _, Backbone, Event) {

    var curSelectCounrty, prevSelectCountry;

    Event.on("change-view", function(){
        if (prevSelectCountry != undefined) {
            for (i in prevSelectCountry.countryData) {
                var line = prevSelectCountry.countryData[i];
                line.setVisible(false);
            }
        }
    });

    function map_calculation(data, fillColor, developed_country_status, map, type) {

        var countries_g_name = data.countries;
        var support_money, support_center;
        var countryCircles = [];


        for (var g_num in countries_g_name) {
//        variable relating to supporting country
            var support_lat = countries_g_name[g_num].lat;
            var support_lng = countries_g_name[g_num].lng;
            support_money = countries_g_name[g_num].value;
            var support_country = countries_g_name[g_num].country;


//        creating the relation line objects array

            support_center = new google.maps.LatLng(support_lat, support_lng);


            var contries_supprted = countries_g_name[g_num].countries;
            var countryData = [];

            if (developed_country_status) {

                var lastNum = contries_supprted.length - 1;
                var sonotaMoney = contries_supprted[lastNum].value

                for (var r_num in contries_supprted) {
                    if (r_num < lastNum) {
                        var supproted_country = contries_supprted[r_num].country;
                        var supported_lng = contries_supprted[r_num].lng;
                        var supported_lat = contries_supprted[r_num].lat;
                        var supported_center = new google.maps.LatLng(supported_lat, supported_lng);


                        var supported_money = contries_supprted[r_num].value;

                        if (supported_money > 0) {
                            if(type == "developed"){
                                //drawing_line(map, support_country, support_center, supported_center, supported_money / (support_money - sonotaMoney), fillColor, countryData);
                                drawing_line(map, support_country, support_center, supported_center, supported_money/1000, fillColor, countryData);
                            }else if(type == "developing"){
                                //drawing_line(map, support_country, supported_center,  support_center, supported_money / (support_money - sonotaMoney), fillColor, countryData);
                                drawing_line(map, support_country, supported_center,  support_center, supported_money/1000, fillColor, countryData);
                            }

                        }

//                -------------------
                    }
                }
            } else {
                for (var r_num in contries_supprted) {
                    var supproted_country = contries_supprted[r_num].country;
                    var supported_lng = contries_supprted[r_num].lng;
                    var supported_lat = contries_supprted[r_num].lat;
                    var supported_center = new google.maps.LatLng(supported_lat, supported_lng);


                    var supported_money = contries_supprted[r_num].value;


                    if (supported_money > 0) {
                        if(type == "developed"){
                            drawing_line(map, support_country, support_center, supported_center, supported_money / 1000, fillColor, countryData);
                        }else{
                            drawing_line(map, support_country, supported_center, support_center, supported_money / 1000, fillColor, countryData);

                        }
                    }
//                -------------------
                }
            }

            /*
             drawing for supporting country.
             */

//        drawing_circle(support_center, support_money, color_support);
            var populationOptions = {
                strokeWeight: 0,
                fillColor: fillColor,
                fillOpacity: 0.8,
                map: map,
                center: support_center,
                radius: support_money * 60
            };

            var support_country_circle = new google.maps.Circle(populationOptions);
            support_country_circle.setVisible(false);
            support_country_circle.country = support_country;
            support_country_circle.countryData = countryData;
            countryCircles.push(support_country_circle);


            // Add a listener for the click event
            google.maps.event.addListener(support_country_circle, 'click', function (event) {
                curSelectCounrty = this;



                var i;
                if (prevSelectCountry != undefined) {
                    for (i in prevSelectCountry.countryData) {
                        var line = prevSelectCountry.countryData[i];
                        line.setVisible(false);
                    }
                }

                if(curSelectCounrty == prevSelectCountry) {
                    prevSelectCountry = undefined;
                    return;
                }

                // ----------------------

                for (i in curSelectCounrty.countryData) {
                    var line = curSelectCounrty.countryData[i];
                    line.setVisible(true);
                }

                prevSelectCountry = curSelectCounrty;

            });


        }

        return countryCircles;
    }

    /**
     *
     * @param map
     * @param countryName
     * @param support_pos
     * @param supported_pos
     * @param rate
     * @param col
     * @param countryData
     */
    function drawing_line(map, countryName, support_pos, supported_pos, rate, col, countryData) {
        var Coordinates_between_coordinate = [
            support_pos,
            supported_pos
        ];

        var lineSymbol = {
            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
        };

        var countryPath = new google.maps.Polyline({
            path: Coordinates_between_coordinate,
            strokeColor: col,
            strokeOpacity: 0.6,
            strokeWeight: rate * 100,
            icons: [
                {
                    icon: lineSymbol,
                    offset: '100%'

                }
            ]
        });

        countryPath.setVisible(false);
        countryData.push(countryPath)

        countryPath.setMap(map);

    }

    function country_mouseover(event) {
        console.log(event);

        var i;
        if (interactive_countries != undefined) {
            //            var prev_interactive_countries = relation_line_objects[]
            for (i in interactive_countries) {
                var line = interactive_countries[i];
                line.setVisible(false);
            }

        }

        interactive_countries = relation_line_objects[this.country];

        for (i in interactive_countries) {
            var line = interactive_countries[i];
            line.setVisible(true);
        }

    }


    return map_calculation;
});