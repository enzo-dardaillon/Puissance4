class Controller {
    plateau;
    view;
    joueurs;
    tourJoueur;
    gameRunning;

    constructor(plateau, view) {
        this.plateau = plateau;
        this.view = view;

        this.joueurs = [];
        this.joueurs[0] = new Player(0, "#FF0000");
        this.joueurs[1] = new PlayerIA(1, "#FFFF00");

        this.view.canvas.addEventListener("click", this.placerJeton.bind(this));

        this.view.canvas.addEventListener("mousemove", this.afficherJetonAvantPlacement.bind(this));
    }

    init() {
        this.tourJoueur = 0;

        this.plateau.resetMatrice();

        document.getElementById("subtitle").innerText = "Jeu en cours";
        this.gameRunning = true;
        this.display();
    }

    display() {
        this.view.afficherGrille(this.plateau);
    }

    botTurn(player) {
        player.placerJetonFromGrid(this.plateau);
        this.view.afficherGrille(this.plateau);
        this.nextTurn();
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
        if(this.gameRunning && !this.getCurrentPlayer().isIA){
            const rect = this.view.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            //let y = event.clientY - rect.top;

            this.getCurrentPlayer().placerJetonFromPixel(this.plateau, x);

            this.view.afficherGrille(this.plateau);

            this.detectWin();

            if(this.gameRunning){
                this.nextTurn();
                //if(this.getNextPlayer().isIA) setTimeout(this.nextTurn.bind(this), 500);
                //else this.nextTurn();
            }
        }
    }

    detectWin() {
        const playerWin = this.plateau.detectWin();
        if(playerWin !== 2) {
            this.finish(playerWin);
        }
    }

    afficherJetonAvantPlacement(event) {
        if(this.gameRunning && !this.getCurrentPlayer().isIA){
            this.view.afficherGrille(this.plateau);

            const rect = this.view.canvas.getBoundingClientRect()
            const x = round(event.clientX - rect.left, this.view.canvas.width/7, 0)-36;

            this.view.context.beginPath();
            this.view.context.arc(x, 32, 32, 0, 2 * Math.PI, undefined);
            this.view.context.fillStyle = this.tourJoueur === 0 ? "#FFFF00" : "#FF0000";
            this.view.context.fill();
        }
    }

    finish(idPlayerWin) {
        this.gameRunning = false;
        document.getElementById("subtitle").innerText =
            idPlayerWin === 0 ? "Victoire du joueur jaune !" : "Victoire du joueur rouge !";
    }
}