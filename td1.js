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
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler);
    setTimeout(stopJump, 3*1000);
    $("#Accelx").text("Acceleration x : " + evt.acceleration.x);
  }
  