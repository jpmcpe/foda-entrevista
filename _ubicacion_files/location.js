var FRDLocation = function () {
};

var geocoder;
var map;
var coords;
var marker;

FRDLocation.set_marker = function () {
    marker = new google.maps.Marker({
        position: coords,
        title:"Location"
    });

    marker.setMap(map);
}

FRDLocation.set_location = function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    coords = new google.maps.LatLng(latitude, longitude);

    var options = {
        zoom                    : 16,
        center                  : coords,
        mapTypeControl          : false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        disableDefaultUI        : true,

        mapTypeId               : google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("location-map"), options);

    FRDLocation.set_marker();

    setInterval(function(){
        geocoder.geocode({'latLng': coords}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                for (i = 0 ; i < results.length ; ++i){
                    var super_var1 = results[i].address_components;
                    for (j = 0 ; j < super_var1.length ; ++j){
                      var super_var2 = super_var1[j].types;
                      for (k = 0 ; k < super_var2.length ; ++k){
                        if (super_var2[k] == "locality"){
                            document.getElementById("inputDistrict").value=super_var1[j].long_name;
                        }
                        if (super_var2[k] == "administrative_area_level_2"){
                            document.getElementById("inputCity").value=super_var1[j].long_name;
                        }
                      }
                    }
                }
                document.getElementById("inputAddress").value=results[0].formatted_address.split(',')[0];
            }
        });
    }, 5000);

    google.maps.event.addListener(map, 'center_changed', function() {
        coords = map.getCenter();
        marker.setPosition(coords);
    });
};

jQuery(document).ready(function () {
    Utils.geo_location(FRDLocation.set_location);
    geocoder = new google.maps.Geocoder();
});