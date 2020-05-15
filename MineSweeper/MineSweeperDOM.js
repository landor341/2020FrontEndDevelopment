
let hideURL = "";
let numUrls = ["", "", "", "", "", "", "", "", ""]; //will contain urls for back-ground images for 0-8

class spaceObject {
    constructor() {

    }
}
let test = document.createElement("div");
document.getElementById("game-area").appendChild(test);
test.style.width = '500px';
test.style.height = "500px";
test.style.backgroundColor = "gray";

class gameBoard {
    constructor(width, height) {
        this.board = [];
        for (let i = 0; i < height; i++ ) {
            this.board[i] = [];
            for (let j = 0; j < width; j++ ) {
                this.board[i][j] = new spaceObject();
            }
        }
    }
}
let game = new gameBoard(5, 5);
console.log(game.board);