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
    $("#Accela").text("Orientation alpha : " + Math.round(event.alpha));
    $("#Accelb").text("Orientation beta : " + Math.round(event.beta));
    $("#Accelg").text("Orientation gamma : " + Math.round(event.gamma));
  }
  function handleMotionEvent(event) {

    $("#Accelx").text("Acceleration x : " + Math.round(event.accelerationIncludingGravity.x));
    $("#Accely").text("Acceleration y : " + Math.round(event.accelerationIncludingGravity.y));
    $("#Accelz").text("Acceleration z : " + Math.round(event.accelerationIncludingGravity.z));

}

window.addEventListener("devicemotion", handleMotionEvent, true);

window.onload = function() {
  var el = document.getElementsByTagName("body")[0];
  el.addEventListener('touchstart', handleStart, false);
}

function handleStart(evt) {
  $("body").click(function() {
    var $clicker = $(this);
    var pos = $clicker.position();
   console.log(pos.top);
   $("#Tx").text("Toucher x : " + pos.left);
   $("#Ty").text("Toucher y : " + pos.left);
    console.log(pos.left);
});
}