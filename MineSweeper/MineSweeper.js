/*
TODO:
    timer
    bomb count
    win detection (keep count of squares revealed and compare it to total squares - bomb count)
    further styling
    size options
    # of bombs
*/



let flagURL = "Resources/minesweeperFlag.jpg";
let bombURL = "Resources/minesweeperBomb.jpg";
let unmarkedURL = "Resources/minesweeperUnmarked.jpg";
let numUrls = ["Resources/minesweeper0.jpg", "Resources/minesweeper1.jpg", "Resources/minesweeper2.jpg", "Resources/minesweeper3.jpg", "Resources/minesweeper4.jpg", "Resources/minesweeper5.jpg", "Resources/minesweeper6.jpg", "Resources/minesweeper7.jpg", "Resources/minesweeper8.jpg"]; //will contain urls for back-ground images for 0-8
let length = 20;
let game = new gameBoard(length, length, "game-area", 150);




// game = new gameBoard(length, length, "game-area", 150);

function resetGame() {
    // game.deleteBoard();
    // game = new gameBoard(length, length, "game-area", 150);
    game.resetBoard();
}

