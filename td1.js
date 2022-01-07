navigator.geolocation.getCurrentPosition(position => {

    var { latitude, longitude } = position.coords;
    console.log(latitude, longitude)

    $("#Latitude").text("Latitude : " + latitude);
    $("#Longitude").text("Longitude : " + longitude);

  });

const WatchId = navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;
    const time = position.timestamp;
    const date = new Date(time);
    const accuracy = position.coords.accuracy;

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
    $("#Accela").text("Acceleration alpha : " + Math.round(event.alpha));
    $("#Accelb").text("Acceleration beta : " + Math.round(event.beta));
    $("#Accelg").text("Acceleration gamma : " + Math.round(event.gamma));
    $("#Accelx").text("Acceleration x : " + Math.round(event.x));
    $("#Accely").text("Acceleration y : " + Math.round(event.y));
    $("#Accelz").text("Acceleration z : " + Math.round(event.z));
  }
  