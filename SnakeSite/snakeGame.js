let active = false;
let lastKeyPress = null;
let snake = null;
let frameDelay = 70; //in ms


class Square {
    constructor(x, y) {
        this.x_ = x;
        this.y_ = y;
    }
    get X() {
        return this.x_;
    }
    setX(x) {
        this.x_ = x;
    }
    setY(y) {
        this.y_ = y;
    }
    get Y() {
        return this.y_;
    }
}

class SnakeGame {
    constructor(width, height, squareSize) {
        this.headX_ = Math.floor(Math.random() * width / squareSize) * squareSize;
        this.headY_ = Math.floor(Math.random() * height / squareSize) * squareSize;
        this.width = width;
        this.height = height;
        this.sideLength = squareSize;
        this.headVelocity = null;
        this.isActive = true;
        this.snakeArray = [new Square(this.headX_, this.headY_)];
        this.newApple();
        this.gameUpdate();
    }
    getHeadPosition() {return [this.headX_, this.headY_]}
    changeVelocity(direction) {
        //Doesn't allow for backwards suicides
        if (this.snakeArray.length == 1) {
            this.headVelocity = direction
        } else if (((this.snakeArray[1].X > this.snakeArray[0].X) && direction != 'right') || ((this.snakeArray[1].X < this.snakeArray[0].X) && direction !='left') || ((this.snakeArray[1].Y < this.snakeArray[0].Y) && direction != 'up') || ((this.snakeArray[1].Y > this.snakeArray[0].Y) && direction!='down') || ! this.headVelocity) {
            this.headVelocity = direction;
        }
    }
    XCheck(x) {
        if (x >= this.width || x <= - this.sideLength) {
            this.end();
            return 0;
        }
        return x;
    }
    YCheck(y) {
        if (y >= this.height|| y <= - this.sideLength) {
            this.end();
            return 0;
        }
        return y;
    }

    moveSnake() {
        if (this.isActive) {
            if (this.headVelocity == null) {
                return false;
            }

            //moves every element other than the head in the list to where the one previously in front of it was
            for (let i = this.snakeArray.length - 1; i >= 1; i--) {
                this.snakeArray[i].setX(this.snakeArray[i - 1].X);
                this.snakeArray[i].setY(this.snakeArray[i - 1].Y);
            }
            //change the head of the snake
            if (this.headVelocity == 'left') {
                this.snakeArray[0].setX(this.XCheck(this.snakeArray[0].X - this.sideLength));
            } else if (this.headVelocity == 'right') {
                this.snakeArray[0].setX(this.XCheck(this.snakeArray[0].X + this.sideLength));
            } else if (this.headVelocity == 'up') {
                this.snakeArray[0].setY(this.YCheck(this.snakeArray[0].Y - this.sideLength));
            } else if (this.headVelocity == 'down') {
                this.snakeArray[0].setY(this.YCheck(this.snakeArray[0].Y + this.sideLength));
            }
            return true;
        }
    }
    gameUpdate() {
        if (this.isActive) {
            this.moveSnake();
            updateSnakeHTML(); //this order is important so that it doesn't look like you lost early. You can see losing before it registers it
            this.hitSelf();
            this.metGoal();
            setTimeout(() => {this.gameUpdate()}, frameDelay)
        }
    }
    hitSelf() {
        for (let i = 1; i < this.snakeArray.length; i++) {
            if (this.snakeArray[0].X == this.snakeArray[i].X && this.snakeArray[0].Y == this.snakeArray[i].Y) {
                this.end();
                return true;
            }
        }
        return false;
    }

    increaseSize(addedSquares) {
        let lastSquare = this.snakeArray[this.snakeArray.length - 1];
        for (let i = 0; i <= addedSquares; i++) {
            this.snakeArray.push(new Square(lastSquare.X, lastSquare.Y));
            
        }
    }
    getRandomCoordinate() {
        return [Math.floor(Math.random() * this.width / this.sideLength) * this.sideLength, Math.floor(Math.random() * this.height / this.sideLength) * this.sideLength];
    }
    get snake() {
        return this.snakeArray;
    }
    end() {
        this.isActive = false;
        updateSnakeHTML();
        sizeBrowser();
    }
    metGoal() {
        if(this.snakeArray[0].X == this.apple.X && this.snakeArray[0].Y == this.apple.Y) {
            this.increaseSize(3);
            this.newApple();
        }
    }
    newApple() {
        let use = false;
        let coords = this.getRandomCoordinate();
        let changed = false;
        let testApple = new Square(coords[0], coords[1]);
        //I originally had used recursion for this then made the loop after having some issues with that.
        while (!use) {
            for (let i = 0; i < this.snakeArray.length; i++) {
                if (testApple.X == this.snakeArray[i].X && testApple.Y == this.snakeArray[i].Y) {
                    coords = this.getRandomCoordinate();
                    testApple.setX(coords[0]);
                    testApple.setY(coords[1]);
                    changed = true;
                    break;
                }
            }
            if (!changed) {
                use = true;
            }
            changed = false;
        }
        this.apple = testApple;
    }
}
