navigator.geolocation.getCurrentPosition(position => {

    const { latitude, longitude } = position.coords;

    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);

  });

  const watchId = navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;
    
    $("#Latitude2").text("Latitude : " + latitude);
    $("#Longitude2").text("Longitude : " + longitude);

  });