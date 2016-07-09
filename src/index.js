var restaurantLocations =
    // Setup hardcoded locations of restaurants in Santa Monica
    [
    {
        name: "Valentino Santa Monica",
        loc: {lat: 34.026662, lng: -118.456821}
    },
    {
        name: "Fritto Misto",
        loc: {lat: 34.016845, lng: -118.489952}
    },
    {
        name: "Mercado",
        loc: {lat: 34.016158, lng: -118.494994}
    },
    {
        name: "Hillstone",
        loc: {lat: 34.017745, lng: -118.499792}
    },
    {
        name: "Umami Burger",
        loc: {lat: 34.019144, lng: -118.492336}
    }];

function initMap() {
    // Setup map using google maps API
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0182677, lng: -118.4745879}, // Santa Monica
        zoom: 14
    });

    // For each restaurant create a pin
    restaurantLocations.forEach(function(location) {
        location.marker = new google.maps.Marker ({
            position: location.loc,
            title: location.name
        });
        location.marker.setMap(map);
    });
}

var viewModel = function() {
    // Data
    // Set initial locations to the global restaurant locations
    this.viewableLocations = ko.observableArray(restaurantLocations);
};

// Apply knockout bindings
ko.applyBindings(new viewModel());