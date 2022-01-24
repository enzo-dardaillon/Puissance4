class Jeton {
    x;
    y;
    neighbours;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.neighbours = this.getNeighbours(x, y);
    }

    getColor (x, y, plateau) {
        return plateau.grille[x][y];
    }

    //0 : g | 1 : gb | 2 : d | 3 : db | 4 : b
    getNeighbours (x, y) {
        let neighbours = [0, 0, 0, 0, 0];
        if (x > 0) {
            neighbours[0] = new Jeton(x - 1, y);
            if (y > 0) {
                neighbours[1] = (new Jeton(x - 1, y + 1));
            }
        }
        if (x > 0) {
            neighbours[2] = new Jeton(x + 1, y);
            if (y > 0) {
                neighbours[3] = new Jeton(x + 1, y + 1);
            }
        }
        if (y > 0) {
            neighbours[4] = new Jeton(x, y + 1);
        }
        return neighbours;
    }
}