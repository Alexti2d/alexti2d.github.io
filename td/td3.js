
window.onload = function() {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    var myimg = document.getElementById('paysage');
    ctx.drawImage(myimg, 10, 120);
    ctx.fillStyle = 'whitesmoke';
    ctx.fillRect(75, 550, 150, 100);
    ctx.fillStyle = 'gray';
    ctx.fillRect(85, 585, 45, 65);
    //Triangle
    ctx.fillStyle = 'brown';
    ctx.beginPath();
    ctx.moveTo(75, 550);
    ctx.lineTo(150, 500);
    ctx.lineTo(225, 550);
    ctx.fill();
    //Rond
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(300, 350, 50, 0, Math.PI * 2, true);
    ctx.fill();
}
