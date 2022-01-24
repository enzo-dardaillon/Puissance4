class Jeton {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getColor (plateau) {
        return plateau.grille[this.x][this.y];
    }

    //0 : g | 1 : gb | 2 : d | 3 : db | 4 : b
    getNeighbours () {
        let x = this.x;
        let y = this.y;
        let neighbours = [0, 0, 0, 0, 0];
        if (x > 0) {
            neighbours[0] = new Jeton(x - 1, y);
            if (y < 5) {
                neighbours[1] = new Jeton(x - 1, y + 1);
            }
        }
        if (x < 6) {
            neighbours[2] = new Jeton(x + 1, y);
            if (y < 5) {
                neighbours[3] = new Jeton(x + 1, y + 1);
            }
        }
        if (y < 5) {
            neighbours[4] = new Jeton(x, y + 1);
        }
        return neighbours;
    }
}