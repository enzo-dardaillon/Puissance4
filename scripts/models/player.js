class Player {
    id;
    color;
    isIA;
    animationHandler;

    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.isIA = false;
    }

    getColor() {
        return this.color;
    }

    /**
     *
     * @param plateau est le plateau de jeu sur lequel placer le jeton
     * @param x est la colonne sur laquelle on dépose le jeton
     */
    placerJetonFromPixel(plateau, x) {
        let i = 0;
        while(plateau.grille[plateau.getCol(x)][i] === 2 && i <= 10) {
            i++;
        }

        this.animationHandler = setInterval(this.animationJeton, 10, plateau, x, i, 0, 0);

        if(i !== 0) {
            plateau.grille[plateau.getCol(x)][i-1] = this.id;
        }
    }

    animationJeton(plateau, x, destY, currY) {
        if(destY === currY) clearInterval(this.animationHandler);

        currY--;
    }

    placerJetonFromGrid(plateau, x) {
        let i = 0;
        while(plateau.grille[x][i] === 2 && i <= 10) {
            i++;
        }

        if(i !== 0) {
            plateau.grille[x][i-1] = this.id;
        }
    }
}