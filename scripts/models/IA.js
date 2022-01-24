class PlayerIA extends Player {

    playablePositions;
    scores = new Array(7);
    position;

    constructor(id, color) {
        super(id, color);
        this.isIA = true;
    }

    findPossiblePositions (plateau)
    {
        let i = 0;
        let possiblePositions = [];
        for (let j = 0 ; j < 7 ; ++j) {
            while (plateau.getCaseFromGrid(i, j) === 2 && i <= 10 && j <= 7) {
                i++;
            }
            let myJeton = new Jeton(i, j);
            possiblePositions.push(myJeton);
        }
        return possiblePositions;
    }

    evaluatePlayablePositions (aJeton = new Jeton(), plateau) {
        let score = 0;
        let x = aJeton.x;
        let y = aJeton.y;
        let neighborhood = aJeton.neighbours;
        //0 : g | 1 : gb | 2 : d | 3 : db | 4 : b
        for (let i = 0 ; i < neighborhood.length() ; ++i) {
            if (neighborhood[i] === 0) continue;
            if (neighborhood[i].getColor(x, y, plateau) === 2) {
                score += 10;
                if (neighborhood[i].neighbours[i].getColor(neighborhood[i].neighbours[i].x, neighborhood[i].neighbours[i].y, plateau) === 2)
                {
                    score += 10;
                    if (neighborhood[i].neighbours[i].neighbours[i].getColor(neighborhood[i].neighbours[i].neighbours[i].x, neighborhood[i].neighbours[i].neighbours[i].y, plateau) === 2)
                    {
                        score += 10;
                    }
                }
            }
        }
        return score;
    }

    scoreAssigment () {
        let tabScores = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0 ; i < this.playablePositions.length() ; ++i) {
            tabScores[i] = this.evaluatePlayablePositions(this.playablePositions[i]);
        }
        return tabScores;
    }

    findMaxScore () {
        let maxScore = 0;
        let positionFinal = new Jeton();
        for (let i = 0 ; i < 7 ; ++i) {
            if (this.scores[i] > maxScore){
                maxScore = this.scores[i]
                positionFinal = this.playablePositions[i];
            }
        }
        return positionFinal;
    }

    placerJetonFromGrid(plateau) {
        this.playablePositions = this.findPossiblePositions(plateau);
        this.scores = this.scoreAssigment();
        this.position = this.findMaxScore();
        super.placerJetonFromGrid(plateau, 0);
    }
}
