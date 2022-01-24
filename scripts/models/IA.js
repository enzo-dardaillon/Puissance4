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
        let y = 0;
        let possiblePositions = [];
        for (let x = 0 ; x < 7 ; ++x) {
            while (y < 6 && plateau.getCaseFromGrid(x, y) === 2) {
                y++;
            }
            let myJeton = new Jeton(x, y-1);
            possiblePositions.push(myJeton);
            y = 0;
        }
        return possiblePositions;
    }

    evaluatePlayablePositions (aJeton = new Jeton(), plateau) {
        let score = 0;
        let x = aJeton.x;
        let y = aJeton.y;
        let neighborhood = aJeton.getNeighbours();
        console.log(aJeton);
        //0 : g | 1 : gb | 2 : d | 3 : db | 4 : b
        for (let i = 0 ; i < neighborhood.length ; ++i)
        {
            console.log(neighborhood[i]);
            if (neighborhood[i] === 0) {
                console.log("c'est egale a 0");
                continue;
            }
            if (neighborhood[i] instanceof Jeton) {
                console.log("couleur : " + neighborhood[i].getColor(plateau));
                if (neighborhood[i].getColor(plateau) === 0) {
                    let children = neighborhood[i].getNeighbours();
                    score += 10;
                    console.log(score);
                    if (children[i] === 0) {
                        console.log("c'est egale a 0");
                        continue;
                    }
                    if (children[i].getColor(plateau) === 0) {
                        children = children[i].getNeighbours();
                        score += 10;
                        console.log(score);
                        if (children[i] === 0) {
                            console.log("c'est egale a 0");
                            continue;
                        }
                        if (children[i].getColor(plateau) === 0) {
                            score += 10;
                            console.log(score);
                        }
                    }
                }
            }
        }
        return score;
    }

    scoreAssigment (plateau) {
        let tabScores = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0 ; i < this.playablePositions.length ; ++i) {
            tabScores[i] = this.evaluatePlayablePositions(this.playablePositions[i], plateau);
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
        console.log(plateau);
        this.playablePositions = this.findPossiblePositions(plateau);
        this.scores = this.scoreAssigment(plateau);
        this.position = this.findMaxScore();
        console.log(this.position.x);
        super.placerJetonFromGrid(plateau, this.position.x);
    }
}
