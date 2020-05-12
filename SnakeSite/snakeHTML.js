/*

This is my file for interacting with the HTML

I could've used react.js but it was a simple enough project that I didn't
think it was necessary. Also it's probably easier for you to look over

*/


let vw;
let vh;
let snakeGame;
let borderWidth = 0;
let RealSnakeArray = [];
let playArea = document.getElementById('playArea');
let startArea = document.getElementById("start");
let startButton = document.getElementById("startButton");
let startText = document.getElementById("startText");
let appleObject;
let main = document.getElementById("main");
startButton.style.display = "visible";
sizeBrowser();

startButton.addEventListener("click", () =>{
    hideStart();
    snakeGame = new SnakeGame(vw - (25 + (vw % 25)), vh - (25 + (vh % 25)), 25);
});

window.addEventListener("resize", sizeBrowser);

document.addEventListener('keydown', event => {
    if (snakeGame && snakeGame.isActive) {
        if (event.keyCode == 87 || event.keyCode == 38) {
            snakeGame.changeVelocity('up');
        } else if (event.keyCode == 68 || event.keyCode == 39) {
            snakeGame.changeVelocity('right');
        } else if (event.keyCode == 65 || event.keyCode == 37) {
            snakeGame.changeVelocity('left');
        } else if (event.keyCode == 83 || event.keyCode == 40) {
            snakeGame.changeVelocity('down');
        }
    }
})

//visualizes snake array and target elements
const updateSnakeHTML = () => {
    //clear the screen if snakeGame isn't active
    if (snakeGame && ! snakeGame.isActive) {
        for (let i = RealSnakeArray.length - 1; i >= 0; i--) {
            RealSnakeArray[i].parentNode.removeChild(RealSnakeArray[i]);
            RealSnakeArray.splice(i, 1);
        }
        if (appleObject) {
            appleObject.parentNode.removeChild(appleObject);
            appleObject = null;
        }
        return;
    }   


    if (snakeGame && snakeGame.isActive && snakeGame.apple) {
        for (let i = 0; i < snakeGame.snakeArray.length; i++) {
            if (! RealSnakeArray[i]) {
                RealSnakeArray[i] = document.createElement('div');
                playArea.append(RealSnakeArray[i]);
                RealSnakeArray[i].id = "snake";
            }
            RealSnakeArray[i].style.left = `${Math.round(12.5 + (vw % 25 / 2)) + 1 + snakeGame.snakeArray[i].X}px`;
            RealSnakeArray[i].style.top = `${Math.round(12.5 + (vh % 25 / 2)) + 1 + snakeGame.snakeArray[i].Y}px`; 
        }
        if (! appleObject) {
            appleObject = document.createElement('div');
            playArea.append(appleObject);
            appleObject.id = "snake";
            appleObject.style.backgroundColor = "green";
        }
        appleObject.style.top = `${Math.round(12.5 + (vh % 25 / 2)) + 1 + snakeGame.apple.Y}px`;
        appleObject.style.left = `${Math.round(12.5 + (vw % 25 / 2)) + 1 + snakeGame.apple.X}px`;
    }
}

//dynamically sizes the browser so the internal box is a square with factors of 25 on both sides with outer border of at least 25px.
//I later realized theres a calc function in css but I already had this done
function sizeBrowser() {
    vw = Math.max(document.documentElement.clientWidth, window.innerWidth);
    vh = Math.max(document.documentElement.clientHeight, window.innerHeight);
    main.style.width = `${vw}px`;
    main.style.height = `${vh}px`;
    playArea.style.width = `${vw - (25 + (vw % 25))}px`;
    playArea.style.height = `${vh - (25 + (vh % 25))}px`;
    playArea.style.margin = `${Math.round(12.5 + (vh % 25 / 2))}px ${Math.round(12.5 + (vw % 25 / 2))}px ${Math.round(12.5 + (vh % 25 / 2)) - 1}px ${Math.round(12.5 + (vw % 25 / 2))}px`;
    if (snakeGame && snakeGame.isActive) {
        snakeGame.isActive = false
    }
    showStart();
    if (vw < 450 || vh < 450) {
        startText.innerHTML = "Please increase your screen size to play this game";
        startButton.style.display = "none";
    } else {
        startText.innerHTML = "Use the below button to start the game. Use the arrow keys or wasd to play";
        startButton.style.display = "block";
    }
}
function hideStart() {
    start.style.display = "none";
}
function showStart() {
    start.style.display = "flex";
}