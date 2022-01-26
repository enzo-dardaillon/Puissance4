class Jeton {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getNeighbours () {
        let x = this.x;
        let y = this.y;
        let neighbours = [0, 0, 0, 0, 0, 0, 0];
        if (x > 0) {
            neighbours[1] = new Jeton(x - 1, y);
            if (y > 0)
                neighbours[0] = new Jeton(x - 1, y - 1);
            if (y < 5) {
                neighbours[2] = new Jeton(x - 1, y + 1);
            }
        }
        if (x < 6) {
            neighbours[5] = new Jeton(x + 1, y);
            if (y > 0)
                neighbours[6] = new Jeton(x + 1, y - 1);
            if (y < 5) {
                neighbours[4] = new Jeton(x + 1, y + 1);
            }
        }
        if (y < 5) {
            neighbours[3] = new Jeton(x, y + 1);
        }
        return neighbours;
    }

    getColor (plateau) {
        return plateau.grille[this.x][this.y];
    }

    getColorOpposed (plateau, i) {
        let neighbors = this.getNeighbours();
        if (i >= 0 && i <= 2 && neighbors[i+4] instanceof Jeton) {
            return neighbors[i+4].getColor(plateau);
        }
        else if (i >= 4 && i <= 6 && neighbors[i-4] instanceof Jeton) {
            return neighbors[i-4].getColor(plateau);
        }
        return -1;
    }
}