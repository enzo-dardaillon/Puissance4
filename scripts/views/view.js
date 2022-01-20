class View {
    canvas;
    context;
    caseWidth;
    caseHeight;

    headerHeight = 64;

    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.caseWidth = canvas.width/7;
        this.caseHeight = (canvas.height-this.headerHeight)/6;
    }

    //VIEW FUNCTIONS
    /**
     * Efface le canvas.
     * Utile pour afficher des animations ou actualiser le plateau de jeu
     */
    clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    afficherGrille(plateau) {
        this.clearScreen();
        this.context.fillStyle = "#0000FF"
        this.context.fillRect(0, this.headerHeight, this.canvas.width, this.canvas.height);

        const circleRadius = 32;
        const xoffset = 4;
        const yoffset = 8;

        let i = 0;
        let j = 0;
        for (let x = 0; x < this.canvas.width; x+=this.caseWidth) {
            for (let y = this.headerHeight; y < this.canvas.height; y+=this.caseHeight) {
                this.context.beginPath();
                this.context.arc(x+circleRadius+xoffset, y+circleRadius+yoffset, circleRadius, 0, 2 * Math.PI, undefined);
                switch (plateau.grille[i][j]) {
                    case 0: this.context.fillStyle = '#FFFF00';break;
                    case 1: this.context.fillStyle = '#FF0000';break;
                    case 2: this.context.fillStyle = '#FFFFFF';break;
                }
                this.context.fill();
                j++;
            }
            i++;
            j = 0;
        }
    }
}