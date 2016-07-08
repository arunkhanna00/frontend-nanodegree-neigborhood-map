var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0182677, lng: -118.4745879}, // Santa Monica
        zoom: 14
    });
}