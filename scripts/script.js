let canvas;
let context;

window.onload = function () {
    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");

    afficherGrille();

    canvas.addEventListener("click", function (event) {
        afficherGrille();

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        context.beginPath();
        context.arc(x, y, 16, 0, 2 * Math.PI, undefined);
        context.fillStyle = '#FF00FF'
        context.fill();
    });
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

    const caseWidth = canvas.width/7;
    const caseHeight = canvas.height/6;
    const circleRadius = (caseWidth + caseHeight)/5;
    const xoffset = 4;
    const yoffset = 8;

    for (let x = 0; x < canvas.width; x+=caseWidth) {
        for (let y = 0; y < canvas.height; y+=caseHeight) {
            context.beginPath();
            context.arc(x+circleRadius+xoffset, y+circleRadius+yoffset, circleRadius, 0, 2 * Math.PI, undefined);
            context.fillStyle = '#FFFFFF'
            context.fill();
        }
    }
}