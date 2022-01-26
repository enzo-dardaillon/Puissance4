class PlayerIA extends Player {

    playablePositions;
    scoresDefense = new Array(7);
    scoresAttack = new Array(7);
    position;

    constructor(id, color) {
        super(id, color);
        this.isIA = true;
    }

    findPossiblePositions (plateau)
    {
        let y = 0;
        let possiblePositions = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0 ; x < 7 ; ++x) {
            while (y < 6 && plateau.getCaseFromGrid(x, y) === 2) {
                y++;
            }
            if (y > 0) possiblePositions[x] = new Jeton(x, y-1);
            y = 0;
        }
        return possiblePositions;
    }

    getRandomPlayablePos ()
    {
        let random = this.playablePositions[Math.floor(Math.random() * this.playablePositions.length)];
        if (random instanceof Jeton) {
            console.log(random);
            return random;
        }
        else this.getRandomPlayablePos();
    }

    evaluatePlayablePositions (aJeton = new Jeton(), plateau, colour) {
        let score = 0;
        let x = aJeton.x;
        let y = aJeton.y;
        let neighborhood = aJeton.getNeighbours();
        for (let i = 0 ; i < neighborhood.length ; ++i)
        {
            let currentScore = 0;
            if (neighborhood[i] === 0) {
                continue;
            }
            if (neighborhood[i] instanceof Jeton) {
                if (neighborhood[i].getColor(plateau) === colour) {
                    let children = neighborhood[i].getNeighbours();
                    score += 5;
                    if (children[i] === 0) {
                        continue;
                    }
                    if (children[i].getColor(plateau) === colour) {
                        children = children[i].getNeighbours();
                        score += 5;
                        if (i !== 3 && aJeton.getColorOpposed(plateau, i) === colour) {
                            score += 10;
                        }
                        if (children[i] === 0) {
                            continue;
                        }
                        if (children[i].getColor(plateau) === colour) {
                            score += 10;
                        }
                    }
                }
            }
            if (currentScore > score) score = currentScore;
        }
        return score;
    }

    scoreAssigment (plateau, colour) {
        let tabScores = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0 ; i < this.playablePositions.length ; ++i) {
            if (this.playablePositions[i] instanceof Jeton)
                tabScores[i] = this.evaluatePlayablePositions(this.playablePositions[i], plateau, colour);
            else {
                tabScores[i] = 0;
            }
        }
        return tabScores;
    }

    findMaxScore () {
        let positionFinal = new Jeton();
        let highScore = 0;
        for (let i = 0 ; i < this.scoresAttack.length && i < this.scoresDefense.length ; ++i) {
            if (this.scoresAttack[i] > this.scoresDefense[i] && this.scoresAttack[i] > highScore) {
                highScore = this.scoresAttack[i];
                positionFinal = this.playablePositions[i];
            }
            if (this.scoresDefense[i] > this.scoresAttack[i] && this.scoresDefense[i] > highScore) {
                if (this.scoresDefense[i] > 10) {
                    highScore = this.scoresDefense[i];
                    positionFinal = this.playablePositions[i];
                }
                else this.getRandomPlayablePos();
            }
        }
        if (highScore === 0) positionFinal = this.getRandomPlayablePos();
        return positionFinal;
    }

    placerJetonFromGrid(plateau) {
        this.playablePositions = this.findPossiblePositions(plateau);
        this.scoresDefense = this.scoreAssigment(plateau, 0);
        console.log(this.scoresDefense);
        this.scoresAttack = this.scoreAssigment(plateau, 1);
        console.log(this.scoresAttack);
        this.position = this.findMaxScore();
        super.placerJetonFromGrid(plateau, this.position.x);
    }
}

/*
placerJetonFromGrid(plateau) {
        this.playablePositions = this.findPossiblePositions(plateau);
        this.scores = this.scoreAssigment(plateau, 0);
        console.log(this.playablePositions);
        console.log("score defense : " + this.scores);
        let highScore = 0;
        for (let i = 0 ; i < this.scores.length ; ++i) {
            if (this.scores[i] > highScore) {
                highScore = this.scores[i];
            }
        }
        if (highScore < 60 && highScore > 10) {
            this.scores = this.scoreAssigment(plateau, 1);
        }
        console.log(this.scores);
        this.position = this.findMaxScore();
        super.placerJetonFromGrid(plateau, this.position.x);
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
        if (maxScore === 0) positionFinal = this.getRandomPlayablePos();
        return positionFinal;
    }
 */