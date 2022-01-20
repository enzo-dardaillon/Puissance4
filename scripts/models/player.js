class Player {
    id;
    color;

    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    /**
     * TODO Intégrer une animation ???
     * @param plateau est le plateau de jeu sur lequel placer le jeton
     * @param x est la colonne sur laquelle on dépose le jeton
     */
    placerJeton(plateau, x) {
        let i = 0;
        while(plateau.grille[plateau.getCol(x)][i] === 2) {
            i++;
        }

        if(i !== 0) {
            plateau.grille[plateau.getCol(x)][i-1] = this.id;

            //tourJoueur = (tourJoueur+1) % 2;//todo nextTurn()
        }
    }
}