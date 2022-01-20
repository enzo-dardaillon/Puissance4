class PlayerIA extends Player {
    constructor(id, color) {
        super(id, color);
        this.isIA = true;
    }

    placerJetonFromGrid(plateau) {
        super.placerJetonFromGrid(plateau, 0);
    }

    minimax(x, depth, maximinzingPlayer) {

    }
}