navigator.geolocation.getCurrentPosition(position => {

    var { latitude, longitude } = position.coords;
    var altitude = position.altitude;
    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);
    $("#Altitude").text("Altitude : " + altitude);

  });

  const watchId = navigator.geolocation.watchPosition(position => {
    var { latitude, longitude } = position.coords;
    
    $("#Latitude2").text("Latitude : " + latitude);
    $("#Longitude2").text("Longitude : " + longitude);

  });