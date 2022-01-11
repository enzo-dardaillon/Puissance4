let canvas;
let context;
let tourJoueur = 1;
let grille;
const headerHeight = 64;

window.onload = function () {
    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");

    grille = creerMatrice(10, 10);
    console.log(grille);

    afficherGrille(grille);

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        grille[getCol(x)][getRow(y)] = tourJoueur;

        tourJoueur = (tourJoueur+1) % 2

        afficherGrille(grille);

        /*context.beginPath();
        context.arc(x, y, 16, 0, 2 * Math.PI, undefined);
        context.fillStyle = '#FF00FF'
        context.fill();*/
    });

    canvas.addEventListener("mousemove", function (event) {
        afficherGrille(grille);

        const rect = canvas.getBoundingClientRect()
        const x = round(event.clientX - rect.left, canvas.width/7, 0)-36;


        context.beginPath();
        context.arc(x, 32, 32, 0, 2 * Math.PI, undefined);
        context.fillStyle = tourJoueur === 0 ? "#FFFF00" : "#FF0000";
        context.fill();
    })
}

//MATHS FUNCTIONS
function round(number, increment, offset) {
    return Math.ceil((number - offset) / increment ) * increment + offset;
}

//CREATION MATRICE
function creerMatrice(di, dj) {
    let matrice = [];

    for (let i = 0; i < di; i++) {
        matrice[i] = [];
        for (let j = 0; j < dj; j++) {
            matrice[i][j] = 2;
        }
    }

    return matrice;
}

function getCol(x) {
    return round(x, canvas.width/7, 0) / (canvas.width/7)-1;
}
function getRow(y) {
    return round(y, canvas.height/7, 0) / (canvas.height/7)-2;
}

//VIEW FUNCTIONS
function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/*******7
*
*
*
6
 */
function afficherGrille(grille) {
    clearScreen();
    context.fillStyle = "#0000FF"
    context.fillRect(0, headerHeight, canvas.width, canvas.height);

    const caseWidth = canvas.width/7;
    const caseHeight = (canvas.height-headerHeight)/6;
    const circleRadius = 32;
    const xoffset = 4;
    const yoffset = 8;

    let i = 0;
    let j = 0;
    for (let x = 0; x < canvas.width; x+=caseWidth) {
        for (let y = headerHeight; y < canvas.height; y+=caseHeight) {
            context.beginPath();
            context.arc(x+circleRadius+xoffset, y+circleRadius+yoffset, circleRadius, 0, 2 * Math.PI, undefined);
            switch (grille[i][j]) {
                case 0: context.fillStyle = '#FFFF00';break;
                case 1: context.fillStyle = '#FF0000';break;
                case 2: context.fillStyle = '#FFFFFF';break;
            }
            context.fill();
            j++;
        }
        i++;
        j = 0;
    }
}