navigator.geolocation.getCurrentPosition(position => {

    var { latitude, longitude } = position.coords;
    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);

  });

navigator.geolocation.watchPosition(position => {
    var { latitude, longitude } = position.coords;
    var time = position.timestamp;
    var date = new Date(time);
    var accuracy = position.coords.accuracy;

    $("#Timestamp").text("Timestamp : " + date);
    $("#Precision").text("Precision : " + accuracy + " m");
    $("#Latitude2").text("Latitude : " + latitude);
    $("#Longitude2").text("Longitude : " + longitude);

  });
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
  } else {
    alert("Sorry, your browser doesn't support Device Orientation");
  }
  function deviceOrientationListener(event) {
    $("#Accelx").text("Acceleration x : " + event.alpha);
  }
  