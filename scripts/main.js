let app;
let CANVAS_WIDTH;
let CANVAS_HEIGHT;

window.onload = function () {
    let c = document.getElementById("mycanvas");
    CANVAS_WIDTH = c.width;
    CANVAS_HEIGHT = c.height;

    app = new Controller(new Plateau(), new View(document.getElementById("mycanvas")));

    app.init();

    document.getElementById("button_reset").onclick = function (event) {
        app.init();
    }
}