var map; // Setup gloval variable for map
var infowindow; // Setup global variable for infoWindow

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
    },
    {
        name: "Pacific Dining Car",
        loc: {lat: 34.039573, lng: -118.476822}
    },
    {
        name: "Chandni",
        loc: {lat: 34.036434, lng: -118.483516}
    },
    {
        name: "Z Garden Mediterranean Cuisine",
        loc: {lat: 34.026191, lng: -118.465835}
    },
    {
        name: "Cha Cha Chicken",
        loc: {lat: 34.009191, lng: -118.490940}
    },
    {
        name: "Huckleberry Café",
        loc: {lat: 34.024582, lng: -118.492053}
}];

var initMap = function() {
    // Setup map using google maps API
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.027908, lng: -118.48}, // Santa Monica
        zoom: 14
    });
    // Create infowindow
    infowindow = new google.maps.InfoWindow({
      content: null
    });

    // For each restaurant create a pin and display an infoWindow
    // when the pin is clicked on
    restaurantLocations.forEach(function(location) {
        // Create marker
        location.marker = new google.maps.Marker ({
            position: location.loc,
            title: location.name
        });
       location.marker.addListener('click', function() {
            // Call displayInfoWindow when a pin is clicked
            displayInfoWindow(location);
        });
        // Display markers on page
        location.marker.setMap(map);
    });

};

var displayInfoWindow = function(location) {
    // Add an animation that ends after 700 ms(1 bounce)
    location.marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ location.marker.setAnimation(null); }, 750);
    // Display an infoWindow when a pin is clicked on
    infowindow.setContent(location.name);
    infowindow.open(map, location.marker);
};

var viewModel = function() {
    var self = this;
    // Data

    // Set the initial locations to be viewed as a copy
    // of the global array of all restaurants
    self.viewableLocations = ko.observableArray(restaurantLocations.slice(0));

    // Set the initial value to be searched
    self.searchVal =  ko.observable('');

    // Functions

    // Call the search function every time the search value changes
    var search = function(query) {
        // Remove all the viewable restaurant locations
        self.viewableLocations.removeAll();
        // Loop through each restaurant
        for (var restaurantNum = 0; restaurantNum < restaurantLocations.length; restaurantNum++) {
            // Remove all pins
            restaurantLocations[restaurantNum].marker.setMap(null);
            // If the search value is found in the list of restaurants
            if (restaurantLocations[restaurantNum].name.toLowerCase().indexOf(query.toLowerCase()) >= 0) {
                // Make the restaurant viewable
                self.viewableLocations.push(restaurantLocations[restaurantNum]);
                // Add the pin to the map
                restaurantLocations[restaurantNum].marker.setMap(map);
            }
        }
    };

    self.clickLocationOnList = function(location) {
        // Call displayInfoWindow when a location on the list
        // is clicked on
        displayInfoWindow(location);
    };

    // Call the seach function everytime the searchVal is changed
    // using knockout's subscribe function
    self.searchVal.subscribe(search);

};
// Apply knockout bindings
ko.applyBindings(new viewModel());
