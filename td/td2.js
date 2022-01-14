
var greenIcon = L.icon({
    iconUrl: 'leaf-green.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


navigator.geolocation.getCurrentPosition(position => {

    var { latitude, longitude } = position.coords;
    const accuracy = position.coords.accuracy;
    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);

    var map = L.map('map').setView([latitude, longitude], 8);

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var circle = L.circle([latitude, longitude], {
    color: 'rgb(50, 50, 50)',
    fillColor: 'rgba(0, 0, 0, 0.4)',
    fillOpacity: 0.5,
    radius: accuracy
}).addTo(map);

var marker = L.marker([latitude, longitude], {icon: greenIcon}).addTo(map);

var from = turf.point([latitude, longitude]);
var to = turf.point([43.283783, 5.370421]);
var options = {units: 'kilometers'};

var distance = turf.distance(from, to, options);
var polyline = L.polyline([
    [latitude, longitude],
    [43.283783, 5.370421],
], {
    color: 'rgb(50, 50, 50)',
}).addTo(map);
console.log(distance)

$("#Coord").text("Distance de " + Math.round(distance) + " Km")

var map2 = L.map('map2').setView([24.47202, -72.12104], 4);

L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    attribution: '&copy; <a href="http://maps.stamen.com/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

var polygon = L.polygon([
    [25.77, -80.3],
    [18.35, -66.28],
    [32.33, -64.73]
]).addTo(map2);

$.ajax({
    url:'https://api-adresse.data.gouv.fr/search/?q=draguignan&type=street',
    type:'GET',
    dataType: 'json',
    error: function()
    {
    },
    success: function(data) {
      console.log(JSON.stringify(data))
      L.geoJSON(data, {icon: greenIcon}).addTo(map);
    } 
});

  });

    