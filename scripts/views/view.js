class View {
    canvas;
    context;
    caseWidth;
    caseHeight;

    headerHeight = 64;
    circleRadius = 32;
    xoffset = 4;
    yoffset = 8;

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

    afficherJetonFromPixel(plateau, x, y, color) {
        this.context.beginPath();
        this.context.arc(x+this.circleRadius+this.xoffset, y+this.circleRadius+this.yoffset, this.circleRadius, 0, 2 * Math.PI, undefined);
        this.context.fillStyle = color;
        this.context.fill();

        this.afficherGrille(plateau);
    }

    afficherJetonFromGrid(plateau, x, y, color) {
        this.afficherJetonFromPixel(plateau, x*this.caseWidth, y*this.caseHeight, color);
    }

    afficherGrille(plateau) {
        this.clearScreen();
        //this.afficherJetonFromGrid(plateau, 4.5, 4.5, '#FF00FF')
        this.context.fillStyle = "#0000FF"
        this.context.fillRect(0, this.headerHeight, this.canvas.width, this.canvas.height);

        let i = 0;
        let j = 0;
        for (let x = 0; x < this.canvas.width; x+=this.caseWidth) {
            for (let y = this.headerHeight; y < this.canvas.height; y+=this.caseHeight) {
                this.context.beginPath();
                this.context.arc(x+this.circleRadius+this.xoffset, y+this.circleRadius+this.yoffset, this.circleRadius, 0, 2 * Math.PI, undefined);
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