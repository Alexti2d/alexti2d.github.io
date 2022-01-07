navigator.geolocation.getCurrentPosition(position => {

    const { latitude, longitude } = position.coords;

    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);

  });