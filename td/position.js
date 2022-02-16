const WatchId = navigator.geolocation.watchPosition(position => {
  const { latitude, longitude } = position.coords;
  const time = position.timestamp;
  const date = new Date(time);
  const accuracy = position.coords.accuracy;
;
  $("#Latitude").text("Latitude : " + latitude);
  $("#Longitude").text("Longitude : " + longitude);

});