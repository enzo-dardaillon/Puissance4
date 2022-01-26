class Player {
    id;
    color;
    isIA;

    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.isIA = false;
    }

    getColor() {
        return this.color;
    }

    placerJetonFromPixel(plateau, x, view, callback) {
        this.placerJetonFromGrid(plateau, plateau.getCol(x), view, callback);
    }

    placerJetonFromGrid(plateau, x, view, callback) {
        let i = 0;
        while(plateau.grille[x][i] === 2 && i <= 10) {
            i++;
        }

        if(i !== 0){
            view.animationJetonFromPixel(plateau,
                x*(CANVAS_WIDTH/7)+CANVAS_WIDTH/7,
                plateau.getCaseDispoFromGrid(x)*CANVAS_HEIGHT/7,
                this,
                callback);

            //plateau.grille[x][i-1] = this.id;
        }
    }
}