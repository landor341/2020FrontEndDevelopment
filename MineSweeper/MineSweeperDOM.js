let hideURL = "";
let bombURL = "";
let numUrls = ["Resources/minesweeper0.jpg", "Resources/minesweeper1.jpg", "Resources/minesweeper2.jpg", "Resources/minesweeper3.jpg", "Resources/minesweeper4.jpg", "Resources/minesweeper5.jpg", "Resources/minesweeper6.jpg", "Resources/minesweeper7.jpg", "Resources/minesweeper8.jpg"]; //will contain urls for back-ground images for 0-8




class spaceObject {
    constructor(width, height, parentID, objectID) {
        this.parent = document.getElementById(parentID); 
        this.object = document.createElement("div");
        this.parent.appendChild(this.object);
        this.object.style.width = width;
        this.object.style.height = height;
        this.object.id = "game-space";

    }

    deleteObject() {
        this.parent.removeChild(this.object);
    }

    changeBackground(state) {
        if ((typeof state) == "number") {
            this.object.style.backgroundImage = `url(${numUrls[state]})`;
            return;
        }
    }
}

class gameBoard {
    constructor(width, height, BoardElementID) {
        this.board = [];
        this.width = width;
        this.height = height;
        for (let i = 0; i < height; i++ ) {
            let testRow = document.createElement("div");
            testRow.style.margin = "0px";
            testRow.style.border = "0px";
            testRow.style.padding = "0px";
            testRow.style.display = "block";
            // testRow.style.height = "10px";
            document.getElementById(BoardElementID).appendChild(testRow);
            testRow.id = `tableRow${i}`;
            this.board[i] = [];
            for (let j = 0; j < width; j++ ) {
                this.board[i][j] = new spaceObject(`${500 / width}px`, `${500 / width}px`, `tableRow${i}`);
            }
        }
    }

    deleteBoard() {
        for (let i = this.height - 1; i >= 0; i--) {
            for (let j = this.width; j >= 0; j--) {
                this.board[j][i].deleteObject();
            }
        }
    }
}
let game = new gameBoard(15, 15, "game-area");
function changeURL() {
    game.board[0][0].object.style.backgroundImage = `url(${numUrls[Math.floor(Math.random() * numUrls.length)]})`;
}
// document.getElementById("startButton").addEventListener("onclick", changeURL);
console.log(game.board);