const WatchId = navigator.geolocation.watchPosition(position => {
  const { latitude, longitude } = position.coords;
  const time = position.timestamp;
  const date = new Date(time);
  const accuracy = position.coords.accuracy;
;
  $("#Latitude").text("Latitude : " + Math.round(latitude));
  $("#Longitude").text("Longitude : " + Math.round(longitude));

});