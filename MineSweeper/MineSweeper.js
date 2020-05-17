let flagURL = "Resources/minesweeperFlag.jpg";
let bombURL = "Resources/minesweeperBomb.jpg";
let numUrls = ["Resources/minesweeper0.jpg", "Resources/minesweeper1.jpg", "Resources/minesweeper2.jpg", "Resources/minesweeper3.jpg", "Resources/minesweeper4.jpg", "Resources/minesweeper5.jpg", "Resources/minesweeper6.jpg", "Resources/minesweeper7.jpg", "Resources/minesweeper8.jpg"]; //will contain urls for back-ground images for 0-8


class gameSpaceObject {
    constructor(width, height, parentID, objectID, onClick) {
        this.state = "hidden";
        this.parent = document.getElementById(parentID); 
        this.object = document.createElement("div");
        this.parent.appendChild(this.object);
        this.object.style.width = width;
        this.object.style.height = height;
        this.object.id = objectID;
        this.object.addEventListener("click", onClick);
        this.object.className = "game-space";

    }

    deleteObject() {
        this.parent.removeChild(this.object);
    }

    makeBomb() {
        this.state = "hiddenBomb";
        this.hiddenImage = bombURL;
    }

    isBomb() {
        if (this.state == "hiddenBomb" || this.state == "shownBomb") {
            return true;
        }
        return false;
    }

    setBackground(url) {
        this.hiddenImage = url;
    }

    showImage() {
        if (this.hiddenImage) {
            this.object.style.backgroundImage = `url(${this.hiddenImage})`;
            if (this.state == "hiddenBomb" || this.state == "shownBomb") {
                this.state = "shownBomb";
            } else {
                this.state = "shown";
            }
        }
    }
}

class gameBoard {
    constructor(width, height, BoardElementID, bombs) {
        this.board = [];
        this.width = width;
        this.height = height;
        this.boardID = BoardElementID;
        this.bombs = bombs;
        this.firstClick = false;
        this.handleClick = this.handleClick.bind(this);
        this.generateBoard();
    }

    generateBoard() {
        //generates a board of the appropriate length
        if (this.board.length > 0) {
            this.deleteBoard();
        }
        for (let i = 0; i < this.height; i++ ) {
            let testRow = document.createElement("div");
            document.getElementById(this.boardID).appendChild(testRow);
            testRow.id = `tableRow${i}`;
            this.board[i] = [];
            for (let j = 0; j < this.width; j++ ) {
                this.board[i][j] = new gameSpaceObject(`${500 / this.width}px`, `${500 / this.width}px`, `tableRow${i}`, `${i}.${j}`, this.handleClick);
            }
        }
        this.generateBombs();
    }

    deleteBoard() {
        //deletes all the elements from the DOM
        for (let i = this.board.length - 1; i >= 0; i--) {
            for (let j = this.board[0].length - 1; j >= 0; j--) {
                this.board[i][j].deleteObject();
            }
        }
    }

    handleClick(event) {
        let id = event.target.id;
        let middleIndex = id.indexOf(".");
        this.uncoverElement(parseInt(id.substring(0, middleIndex)), parseInt(id.substring(middleIndex + 1)));
    }

    uncoverElement(x, y) {
        if (this.board[x][y].isBomb()) {
            if (!this.firstClick) {
                //makes sure the first click is an open space
                resetGame();
                game.handleClick(event);
                return;
            }
            this.board[x][y].showImage();
        } else {
            //this finds out what number image to assign the block
            let num = this.getObjectNum(x, y);
            if (!this.firstClick && num != 0) {
                //makes sure the first click is an open space
                resetGame();
                game.handleClick(event);
                return;
            }
            this.firstClick = true;
            this.board[x][y].setBackground(numUrls[num]);
            this.board[x][y].showImage();
            if (num == 0) {
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (this.board[x + i] && !(i == 0 && j == 0)) {
                            if (this.board[x + i][y+j]) {
                                if (this.board[x+i][y+j].state != "shown") {
                                    // console.log(i + " " + j);
                                    this.uncoverElement(x + i, y + j);
                                }
                            }
                        }
                    }
                }
            }


        }
    }

    getObjectNum(i, j) {
        //figures out how many bombs are around an object
        let count = 0;
        for (let k = -1; k < 2; k++) {
            for (let l = -1; l < 2; l++) {
                if (this.board[i + k]) {
                    if (this.board[i + k][j+l]) {
                        if (this.board[i + k][j + l].isBomb()) {
                        count++;
                        }
                    }
                }
            }
        }
        return count;
    }

    generateBombs() {
        //puts the bombs on the generated grid
        let i = 0;
        while (i < this.bombs) {
            let attempt = this.board[Math.floor(Math.random() * this.board.length)][Math.floor(Math.random() * this.board[0].length)];
            if (attempt.state != "hiddenBomb") {
                attempt.makeBomb();
                i++;
            }
        }
    }

    deleteBoard() {
        for (let i = this.height - 1; i >= 0; i--) {
            for (let j = this.width - 1; j >= 0; j--) {
                this.board[j][i].deleteObject();
            }
        }
    }
}
let game = new gameBoard(15, 15, "game-area", 56);
function resetGame() {
    if (game.board.length > 0) {
        game.deleteBoard();
    }
    game = new gameBoard(15, 15, "game-area", 56);
}
// document.getElementById("startButton").addEventListener("onclick", changeURL);

function handleClick(event) {
    
}