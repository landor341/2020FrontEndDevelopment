class gameSpaceObject {
    constructor(width, height, parentID, objectID, onClick, onRightClick) {
        this.state = "hidden";
        this.parent = document.getElementById(parentID); 
        this.object = document.createElement("div");
        this.parent.appendChild(this.object);
        this.object.style.width = width;
        this.object.style.height = height;
        this.object.id = objectID;
        this.object.addEventListener("click", onClick);
        this.object.addEventListener('contextmenu', onRightClick, false);
        this.object.className = "game-space";

    }

    deleteObject() {
        this.parent.removeChild(this.object);
    }

    resetObject() {
        this.isBomb = false;
        this.isFlag = false;
        this.state = "hidden";
        this.object.style.backgroundImage = `url(${unmarkedURL})`;
    }

    makeBomb() {
        this.isBomb = true;
        this.hiddenImage = bombURL;
    }

    makeFlag() {
        if (this.state == "hidden") {
            this.isFlag = true;
            this.object.style.backgroundImage = `url(${flagURL})`;
        }
    }

    removeFlag() {
        this.isFlag = false;
        if (this.isBomb) {
            this.makeBomb();
            this.object.style.backgroundImage = `url(${unmarkedURL})`;
        } else {
            this.hiddenImage = undefined;
            this.object.style.backgroundImage = `url(${unmarkedURL})`;
        }
    }

    setBackground(url) {
        this.hiddenImage = url;
    }

    hideObject() {
        this.hiddenImage = unmarkedURL;
        this.showImage();
        this.state = "hidden";
    }

    showImage() {
        if (this.hiddenImage && ! this.isFlag) {
            this.object.style.backgroundImage = `url(${this.hiddenImage})`;
            this.state = "shown";
        }
    }
}





class gameBoard {
    constructor(width, height, BoardElementID, bombs) {
        this.active = true;
        this.board = [];
        this.width = width;
        this.height = height;
        this.boardID = BoardElementID;
        this.bombs = bombs;
        this.firstClick = false;
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
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
                this.board[i][j] = new gameSpaceObject(`${400 / this.width}px`, `${400 / this.width}px`, `tableRow${i}`, `${i}.${j}`, this.handleLeftClick, this.handleRightClick);
            }
        }
        this.generateBombs();
    }

    resetBoard() {
        this.firstClick = false;
        this.active = true;
        console.log("gdf")
        //deletes all the elements from the DOM
        this.board.forEach((item) => {
            item.forEach((object) => { object.resetObject() });
        })
        this.generateBombs();
    }

    handleLeftClick(event) {
        let id = event.target.id;
        let middleIndex = id.indexOf(".");
        this.uncoverElement(parseInt(id.substring(0, middleIndex)), parseInt(id.substring(middleIndex + 1)));
    }

    handleRightClick(event) { //Flagging
        let id = event.target.id;
        let middleIndex = id.indexOf(".");
        let element = this.board[parseInt(id.substring(0, middleIndex))][parseInt(id.substring(middleIndex + 1))];
        if (element.isFlag) {
            element.removeFlag();
            event.preventDefault(); //stops right click menu from appearing when right clicking element in game area
        } else {
            element.makeFlag();
            element.showImage();
            event.preventDefault(); //stops right click menu from appearing when right clicking element in game area
        }
    }

    uncoverElement(x, y) {
        if (! this.board[x][y].isFlag && this.active) {
            if (this.board[x][y].isBomb) {
                //TODO: Turn this into loss detection
                if (!this.firstClick) {
                    //makes sure the first click is an open space
                    this.resetBoard();
                    game.handleLeftClick(event);
                    return;
                }
                this.active = false;
                this.board[x][y].showImage();


            } else {
                //this finds out what number image to assign the block
                let num = this.getObjectNum(x, y);
                if (!this.firstClick && num != 0) {
                    //makes sure the first click is an open space
                    this.resetBoard();
                    game.handleLeftClick(event);
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
                                        //auto-uncovers elements around it if it's an empty space
                                        this.uncoverElement(x + i, y + j);
                                    }
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
                        if (this.board[i + k][j + l].isBomb) {
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