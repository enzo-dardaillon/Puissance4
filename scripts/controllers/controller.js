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
        this.joueurs[1] = new Player(1, "#FFFF00");

        this.view.canvas.addEventListener("click", this.placerJeton.bind(this));

        this.view.canvas.addEventListener("mousemove", this.afficher.bind(this));
    }

    init() {
        this.tourJoueur = 1;

        this.plateau.resetMatrice();

        document.getElementById("subtitle").innerText = "Jeu en cours";
        this.gameRunning = true;
        this.display();
    }

    display() {
        this.view.afficherGrille(this.plateau);
    }

    placerJeton(event) {
        if(this.gameRunning){
            const rect = this.view.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            //let y = event.clientY - rect.top;

            this.joueurs[this.tourJoueur].placerJeton(this.plateau, x);

            this.view.afficherGrille(this.plateau);


            const playerWin = this.plateau.detectWin();
            if(playerWin !== 2) {
                this.finish(playerWin);
            }

            this.tourJoueur = (this.tourJoueur+1) % 2;
        }
    }

    afficher(event) {
        this.view.afficherGrille(this.plateau);

        const rect = this.view.canvas.getBoundingClientRect()
        const x = round(event.clientX - rect.left, this.view.canvas.width/7, 0)-36;

        this.view.context.beginPath();
        this.view.context.arc(x, 32, 32, 0, 2 * Math.PI, undefined);
        this.view.context.fillStyle = this.tourJoueur === 0 ? "#FFFF00" : "#FF0000";
        this.view.context.fill();
    }

    finish(idPlayerWin) {
        this.gameRunning = false;
        document.getElementById("subtitle").innerText =
            idPlayerWin === 0 ? "Victoire du joueur jaune !" : "Victoire du joueur rouge !";
    }
}