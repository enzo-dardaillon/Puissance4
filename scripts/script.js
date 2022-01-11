let canvas;
let context;

window.onload = function () {
    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");

    afficherGrille();
}

function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/*******7
*
*
*
6
 */
function afficherGrille() {
    clearScreen();
    context.fillStyle = "#0000FF"
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(32, 32, 32, 0, 2 * Math.PI, undefined);
    context.fillStyle = '#FFFFFF'
    context.fill();
}