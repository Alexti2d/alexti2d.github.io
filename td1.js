navigator.geolocation.getCurrentPosition(position => {

    var { latitude, longitude } = position.coords;
    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);

  });

  const watchId = navigator.geolocation.watchPosition(position => {
    var { latitude, longitude } = position.coords;
    var time = Date.now();
    var date = new Date(time)
    var vitesse = position.vitesse;

    $("#Timestamp").text("Timestamp : " + date);
    $("#Vitesse").text("Vitesse : " + vitesse);
    $("#Latitude2").text("Latitude : " + latitude);
    $("#Longitude2").text("Longitude : " + longitude);

  });