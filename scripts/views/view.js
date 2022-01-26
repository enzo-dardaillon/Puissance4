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

    animationJetonFromPixel(plateau, x, destY, player, callback) {
        x = round(x, CANVAS_WIDTH/7, 0) - CANVAS_WIDTH/7;
        /*console.log(destY);
        destY = round(destY, CANVAS_HEIGHT/7, 0) - 2*(CANVAS_HEIGHT/7);
        console.log(destY);*/

        const ay = 1;
        let vy = 0;
        let currY = 0;
        let bounce = 1;
        let bounced = false;
        const handler = setInterval(function () {
            if(bounce <= 0) {
                //currY = destY - this.circleRadius + this.yoffset;
                this.clearScreen();
                //player.placerJetonFromPixel(plateau, x+1);
                plateau.grille[plateau.getCol(x+1)][plateau.getRow(destY)+1] = player.id;
                clearInterval(handler);
                callback();
            } else if(!bounced && currY >= destY) {
                vy = -vy/1.25;
                vy+=ay;
                currY+=vy;
                bounce--;
                bounced = true;
            } else {
                bounced = false;
                vy+=ay;
                currY+=vy;
            }
            this.afficherJetonFromPixel(plateau, x, currY, player.getColor());
        }.bind(this), 10);
    }

    retirerJetonFromGrid(plateau, x, y, callback){
        console.log(x + " || " + y);
        const color = plateau.grille[x][y] === 0 ? "#FFFF00" : "#FF0000";
        plateau.grille[x][y] = 2;

        let currY = y*(CANVAS_HEIGHT/7);
        let currX = x*(CANVAS_WIDTH/7);
        const handler = setInterval(function () {
            if(currY >= CANVAS_HEIGHT+2*this.circleRadius) {
                clearInterval(handler);
                //callback();
            } else {
                currY+=2;
                this.tkt(plateau, currX, currY, color);
            }
        }.bind(this), 10);
    }

    tkt(plateau, x, y, color) {
        //this.afficherGrille(plateau);

        this.context.beginPath();
        this.context.arc(x+this.circleRadius+this.xoffset, y+this.circleRadius+this.yoffset, this.circleRadius, 0, 2 * Math.PI, undefined);
        this.context.fillStyle = color;
        this.context.fill();
    }

    afficherJetonFromPixel(plateau, x, y, color) {
        this.afficherGrille(plateau);

        this.context.beginPath();
        this.context.arc(x+this.circleRadius+this.xoffset, y+this.circleRadius+this.yoffset, this.circleRadius, 0, 2 * Math.PI, undefined);
        this.context.fillStyle = color;
        this.context.fill();
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