class Controller {
    plateau;
    view;
    joueurs;
    tourJoueur = 2;
    firstPlayer = 0;
    gameRunning;
    blinkHolder;
    gameLock = false;
    finishAnimationCount;
    finishAnimationCounter;
    finishAnimationHandler;

    constructor(plateau, view) {
        this.plateau = plateau;
        this.view = view;

        document.getElementById("label_button_first_player").style.backgroundColor =
            (this.firstPlayer === 0 ? "#FFFF00" : "#FF0000");

        this.view.canvas.addEventListener("click", this.placerJeton.bind(this));
        document.getElementById("button_ia").addEventListener("click", this.blinkResetButton.bind(this));
        document.getElementById("button_first_player").addEventListener("click", this.changeFirstPlayer.bind(this));
        this.view.canvas.addEventListener("mousemove", this.afficherJetonAvantPlacement.bind(this));
    }

    init() {
        document.getElementById("subtitle").innerText = 'Jeu en cours';
        document.getElementById("button_reset").value = 'Reset';
        if(this.blinkHolder !== null){
            clearInterval(this.blinkHolder);
            document.getElementById("button_reset").style.backgroundColor = '#ccc';
        }

        this.joueurs = [];
        this.joueurs[0] = new Player(0, "#FFFF00");

        if(document.getElementById("button_ia").checked) {
            this.joueurs[1] = new PlayerIA(1, "#FF0000");
        } else {
            this.joueurs[1] = new Player(1, "#FF0000");
        }

        if(this.tourJoueur === 2) this.tourJoueur = this.firstPlayer;

        this.plateau.resetMatrice();

        document.getElementById("subtitle").innerText = "Jeu en cours";
        this.gameRunning = true;
        this.display();

        if(this.getCurrentPlayer().isIA) this.botTurn(this.getCurrentPlayer());
    }

    display() {
        this.view.afficherGrille(this.plateau);
    }

    botTurn(player) {
        player.placerJetonFromGrid(this.plateau, this.view, this.testApresPlacement.bind(this));
    }

    nextTurn() {
        this.tourJoueur = (this.tourJoueur+1) % 2;

        if(this.getCurrentPlayer().isIA) {
            setTimeout(this.botTurn.bind(this), 500, this.getCurrentPlayer());
        }
    }

    getCurrentPlayer() {
        return this.joueurs[this.tourJoueur];
    }

    getNextPlayer() {
        return this.joueurs[(this.tourJoueur+1) % 2];
    }

    placerJeton(event) {
        if(!this.gameLock && this.gameRunning && !this.getCurrentPlayer().isIA){
            this.gameLock = true;
            const rect = this.view.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            //let y = event.clientY - rect.top;

            if(this.plateau.getCaseDispo(x) !== -1){
                this.getCurrentPlayer().placerJetonFromPixel(this.plateau, x, this.view, this.testApresPlacement.bind(this));
            } else {
                this.gameLock = false;
            }
            /*this.view.animationJetonFromPixel(this.plateau,
                x,
                this.plateau.getCaseDispo(x)*CANVAS_HEIGHT/7,
                this.getCurrentPlayer(),
                this.testApresPlacement.bind(this));*/
        }
    }

    testApresPlacement() {
        this.view.afficherGrille(this.plateau);

        this.detectWin();

        this.gameLock = false;

        if(this.gameRunning){
            this.nextTurn();
            //if(this.getNextPlayer().isIA) setTimeout(this.nextTurn.bind(this), 500);
            //else this.nextTurn();
        }
    }

    detectWin() {
        const playerWin = this.plateau.detectWin();
        if(playerWin !== 2) {
            this.finish(playerWin);
        }
    }

    afficherJetonAvantPlacement(event) {
        if(!this.gameLock && this.gameRunning && !this.getCurrentPlayer().isIA){
            this.view.afficherGrille(this.plateau);

            const rect = this.view.canvas.getBoundingClientRect()
            const x = round(event.clientX - rect.left, this.view.canvas.width/7, 0)-36;

            this.view.context.beginPath();
            this.view.context.arc(x, 32, 32, 0, 2 * Math.PI, undefined);
            this.view.context.fillStyle = this.tourJoueur === 0 ? "#FFFF00" : "#FF0000";
            this.view.context.fill();
        }
    }

    blinkResetButton(event) {
        if(this.gameRunning){
            this.blinkHolder = setInterval(function () {
                let resetButton = document.getElementById("button_reset");
                console.log(resetButton.style.backgroundColor);
                resetButton.style.backgroundColor = (resetButton.style.backgroundColor === 'red' ? '#ccc' : 'red');
            }, 500);
        }
    }

    changeFirstPlayer(event) {
        this.firstPlayer = (this.firstPlayer+1) % 2;

        document.getElementById("label_button_first_player").style.backgroundColor =
            (this.firstPlayer === 0 ? "#FFFF00" : "#FF0000");
    }

    finish(idPlayerWin) {
        this.gameRunning = false;
        document.getElementById("subtitle").innerText =
            idPlayerWin === 0 ? "Victoire du joueur jaune !" : "Victoire du joueur rouge !";

        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 6; y++) {
                if(this.plateau.grille[x][y] !== 2 && this.plateau.grille[x][y] !== idPlayerWin) {
                    this.view.retirerJetonFromGrid(this.plateau, x, y, this.stopFinishAnimation.bind(this));
                    this.finishAnimationCount++;
                }
            }
        }

        this.finishAnimationHandler = setInterval(function () {
            this.view.afficherGrille(this.plateau);
        }.bind(this), 20);
    }

    stopFinishAnimation() {
        this.finishAnimationCounter++;
        if(this.finishAnimationCounter >= this.finishAnimationCount) {
            clearInterval(this.finishAnimationHandler);
        }
    }
}