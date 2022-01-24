class Plateau {
    grille;

    constructor() {
        this.resetMatrice();
    }

    /**
     * Créer une grille de jeu
     *
     * @param di est le nombre de colonnes
     * @param dj est le nombre de ligne
     * @returns {*[]} une grille de jeu
     */
    creerMatrice(di, dj) {
        let matrice = [];

        for (let i = 0; i < di; i++) {
            matrice[i] = [];
            for (let j = 0; j < dj; j++) {
                matrice[i][j] = 2;
            }
        }

        return matrice;
    }

    resetMatrice(){
        this.grille = this.creerMatrice(7, 6);
    }

    /**
     *
     * @returns {number} l'id du joueur vainqueur, 2 si personne n'a encore gagné
     */
    detectWin() {
        let playerWin = 2;
        //Parcours de la grille de jeu
        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 6; y++) {
                //On recupère la couleur de la case courante
                const player = this.getCaseFromGrid(x, y);
                if(player === 2) continue;

                //On teste la colonne
                if(y <= 2) { //Inutile d'aller plus loin que les 3 premières lignes
                    for (let i = 0; i < 4; i++) {
                        if(this.getCaseFromGrid(x, y+i) !== player) break;
                        if(i === 3 && player !== 2 && this.getCaseFromGrid(x, y+i) === player) {
                            return player;
                        }
                    }
                }

                //On teste la ligne
                if(x <= 3) { //Inutile d'aller plus loin que les 4 premières colonnes
                    for (let i = 0; i < 4; i++) {
                        if(this.getCaseFromGrid(x+i, y) !== player) break;
                        if(i === 3 && player !== 2 && this.getCaseFromGrid(x+i, y) === player) {
                            return player;
                        }
                    }
                }

                //On teste la diagonale ⤡
                if(x <= 3 && y <= 2) { //Inutile d'aller plus loin que les 3 premières lignes et les 4 premières colonnes
                    for (let i = 0; i < 4; i++) {
                        if(this.getCaseFromGrid(x+i, y+i) !== player) break;
                        if(i === 3 && player !== 2 && this.getCaseFromGrid(x+i, y+i) === player) {
                            return player;
                        }
                    }
                }

                //On teste la diagonale ⤢
                if(x <= 3 && y >= 3) {
                    for (let i = 0; i < 4; i++) {
                        if(this.getCaseFromGrid(x+i, y-i) !== player) break;
                        if(i === 3 && player !== 2 && this.getCaseFromGrid(x+i, y-i) === player) {
                            return player;
                        }
                    }
                }
            }
        }
        return 2;
    }

    /**
     * Cette méthode permet de connaître la colonne en fonction d'un point 1D passé en paramètre.
     * Un exemple d'implémentation serait de faire passer le curseur de la souris en paramètre pour savoir quelle colonne le joueur pointe.
     * @param x est la position (sur la longueur) à l'écran choisie.
     * @returns {number} la colonne choisie
     */
    getCol(x) {
        return round(x, CANVAS_WIDTH/7, 0) / (CANVAS_WIDTH/7)-1;
    }

    /**
     * Cette méthode permet de connaître la ligne en fonction d'un point 1D passé en paramètre.
     * Un exemple d'implémentation serait de faire passer le curseur de la souris en paramètre pour savoir quelle ligne le joueur pointe.
     * @param y est la position (sur la hauteur) à l'écran choisie.
     * @returns {number} la ligne choisie
     */
    getRow(y) {
        return round(y, CANVAS_HEIGHT/7, 0) / (CANVAS_HEIGHT/7)-2;
    }

    getCaseFromPixel(x, y) {
        return this.grille[this.getCol(x)][this.getRow(y)];
    }

    getCaseFromGrid(x, y) {
        return this.grille[x][y];
    }

    getCaseDispo(x) {
        let i = 0;
        while(this.grille[this.getCol(x)][i] === 2 && i <= 10) {
            i++;
        }

        if(i !== 0) {
            return i;
        }
    }

    getRowPixelFromGrid(y) {
        return y*CANVAS_HEIGHT/7;
    }
}