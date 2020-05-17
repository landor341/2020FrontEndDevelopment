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
        if (this.state == "hiddenBomb") {
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
        }
    }
}

class gameBoard {
    constructor(width, height, BoardElementID, bombs) {
        this.board = [];
        this.width = width;
        this.height = height;
        this.handleClick = this.handleClick.bind(this);
        for (let i = 0; i < height; i++ ) {
            let testRow = document.createElement("div");
            document.getElementById(BoardElementID).appendChild(testRow);
            testRow.id = `tableRow${i}`;
            this.board[i] = [];
            for (let j = 0; j < width; j++ ) {
                this.board[i][j] = new gameSpaceObject(`${500 / width}px`, `${500 / width}px`, `tableRow${i}`, `${i}.${j}`, this.handleClick);
            }
        }
        this.generateBombs(bombs);
        console.log(this.board);
    }

    handleClick(event) {
        // console.log(event);
        let id = event.target.id;
        let middleIndex = id.indexOf(".");
        console.log(id.substring(0, middleIndex) + " " + id.substring(middleIndex + 1));
        if (this.board[id.substring(0, middleIndex)][id.substring(middleIndex + 1)].isBomb()) {
            this.board[id.substring(0, middleIndex)][id.substring(middleIndex + 1)].showImage();
        } else {
            this.board[id.substring(0, middleIndex)][id.substring(middleIndex + 1)].setBackground(numUrls[this.getObjectNum(parseInt(id.substring(0, middleIndex)), parseInt(id.substring(middleIndex + 1)))]);
            // console.log(this.board[id.substring(0, middleIndex)][id.substring(middleIndex + 1)].hiddenimage);
            this.board[id.substring(0, middleIndex)][id.substring(middleIndex + 1)].showImage();
        }

    }

    getObjectNum(i, j) {
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

    generateBombs(bombs) {
        let i = 0;
        while (i < bombs) {
            let attempt = this.board[Math.floor(Math.random() * this.board.length)][Math.floor(Math.random() * this.board[0].length)];
            if (attempt.state != "hiddenBomb") {
                attempt.makeBomb();
                i++;
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
let game = new gameBoard(15, 15, "game-area", 56);
function changeURL() {
    game.board[0][0].object.style.backgroundImage = `url(${numUrls[Math.floor(Math.random() * numUrls.length)]})`;
}
// document.getElementById("startButton").addEventListener("onclick", changeURL);

function handleClick(event) {
    
}