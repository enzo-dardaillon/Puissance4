let canvas;
let context;
let tourJoueur;
let grille;
const headerHeight = 64;
let caseWidth;
let caseHeight;
let gameRunning = true;

window.onload = function () {
    init();

    canvas.addEventListener("click", function (event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        placerJeton(tourJoueur, x);

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
    });

    document.getElementById("button_reset").onclick = function (event) {
        init();
    }
}

function init() {
    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");

    caseWidth = canvas.width/7;
    caseHeight = (canvas.height-headerHeight)/6;

    tourJoueur = 1;

    grille = creerMatrice(7, 6);

    document.getElementById("subtitle").innerText = "Jeu en cours";
    gameRunning = true;
    afficherGrille(grille);
}

/**
 * TODO Intégrer une animation ???
 *
 * @param idPlayer est le joueur qui dépose son jeton
 * @param x est la colonne sur laquelle on dépose le jeton
 */
function placerJeton(idPlayer, x) {
    if(gameRunning){
        let i = 0;
        while(grille[getCol(x)][i] === 2) {
            i++;
        }

        if(i !== 0) {
            grille[getCol(x)][i-1] = tourJoueur;

            tourJoueur = (tourJoueur+1) % 2;
            afficherGrille(grille);
            const playerWin = detectWin();
            if(playerWin !== 2) {
                finish(playerWin);
            }
        }
    }
}

function animationJeton(idPlayer, x, currentY, destinationY) {

}

//MATHS FUNCTIONS
function round(number, increment, offset) {
    return Math.ceil((number - offset) / increment ) * increment + offset;
}

//CREATION MATRICE

/**
 * Créer une grille de jeu
 *
 * @param di est le nombre de colonnes
 * @param dj est le nombre de ligne
 * @returns {*[]} une grille de jeu
 */
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

/**
 *
 * @returns {number} l'id du joueur vainqueur, 2 si personne n'a encore gagné
 */
function detectWin() {
    let playerWin = 2;
    //Parcours de la grille de jeu
    for (let x = 0; x < 7; x++) {
        for (let y = 0; y < 6; y++) {
            //On recupère la couleur de la case courante
            const player = getCaseFromGrid(x, y);
            if(player === 2) continue;

            //On teste la colonne
            if(y <= 2) { //Inutile d'aller plus loin que les 3 premières lignes
                for (let i = 0; i < 4; i++) {
                    if(getCaseFromGrid(x, y+i) !== player) break;
                    if(i === 3 && player !== 2 && getCaseFromGrid(x, y+i) === player) {
                        return player;
                    }
                }
            }

            //On teste la ligne
            if(x <= 3) { //Inutile d'aller plus loin que les 4 premières colonnes
                for (let i = 0; i < 4; i++) {
                    if(getCaseFromGrid(x+i, y) !== player) break;
                    if(i === 3 && player !== 2 && getCaseFromGrid(x+i, y) === player) {
                        return player;
                    }
                }
            }

            //On teste la diagonale ⤡
            if(x <= 3 && y <= 2) { //Inutile d'aller plus loin que les 3 premières lignes et les 4 premières colonnes
                for (let i = 0; i < 4; i++) {
                    if(getCaseFromGrid(x+i, y+i) !== player) break;
                    if(i === 3 && player !== 2 && getCaseFromGrid(x+i, y+i) === player) {
                        return player;
                    }
                }
            }

            //On teste la diagonale ⤢
            if(x <= 3 && y >= 3) {
                for (let i = 0; i < 4; i++) {
                    if(getCaseFromGrid(x+i, y-i) !== player) break;
                    if(i === 3 && player !== 2 && getCaseFromGrid(x+i, y-i) === player) {
                        return player;
                    }
                }
            }
        }
    }
    return 2;
}

function finish(idPlayerWin) {
    gameRunning = false;
    document.getElementById("subtitle").innerText =
        idPlayerWin === 0 ? "Victoire du joueur jaune !" : "Victoire du joueur rouge !";
}

/**
 * Cette méthode permet de connaître la colonne en fonction d'un point 1D passé en paramètre.
 * Un exemple d'implémentation serait de faire passer le curseur de la souris en paramètre pour savoir quelle colonne le joueur pointe.
 * @param x est la position (sur la longueur) à l'écran choisie.
 * @returns {number} la colonne choisie
 */
function getCol(x) {
    return round(x, canvas.width/7, 0) / (canvas.width/7)-1;
}

/**
 * Cette méthode permet de connaître la ligne en fonction d'un point 1D passé en paramètre.
 * Un exemple d'implémentation serait de faire passer le curseur de la souris en paramètre pour savoir quelle ligne le joueur pointe.
 * @param y est la position (sur la hauteur) à l'écran choisie.
 * @returns {number} la ligne choisie
 */
function getRow(y) {
    return round(y, canvas.height/7, 0) / (canvas.height/7)-2;
}

function getCaseFromPixel(x, y) {
    return grille[getCol(x)][getRow(y)];
}

function getCaseFromGrid(x, y) {
    return grille[x][y];
}

//VIEW FUNCTIONS
/**
 * Efface le canvas.
 * Utile pour afficher des animations ou actualiser le plateau de jeu
 */
function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function afficherGrille(grille) {
    clearScreen();
    context.fillStyle = "#0000FF"
    context.fillRect(0, headerHeight, canvas.width, canvas.height);

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