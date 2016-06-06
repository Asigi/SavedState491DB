
// GameBoard code below

function distance(a, b) {
    var difX = a.x - b.x;
    var difY = a.y - b.y;
    return Math.sqrt(difX * difX + difY * difY);
};

function Circle(game) {
    this.player = 1;
    this.radius = 20;
    this.colors = ["Red", "Green", "Blue", "White"];
    this.color = 3;
    Entity.call(this, game, this.radius + Math.random() * (800 - this.radius * 2), this.radius + Math.random() * (800 - this.radius * 2));
    this.velocity = { x: Math.random() * 100, y: Math.random() * 100 };
    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (speed > maxSpeed) {
        var ratio = maxSpeed / speed;
        this.velocity.x *= ratio;
        this.velocity.y *= ratio;
    };
}

Circle.prototype = new Entity();
Circle.prototype.constructor = Circle;

Circle.prototype.collideRight = function () {
    return this.x + this.radius > 800;
};
Circle.prototype.collideLeft = function () {
    return this.x - this.radius < 0;
};
Circle.prototype.collideBottom = function () {
    return this.y + this.radius > 800;
};
Circle.prototype.collideTop = function () {
    return this.y - this.radius < 0;
};

Circle.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Circle.prototype.update = function () {
    Entity.prototype.update.call(this);

    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * this.game.clockTick;

    if (this.collideLeft() || this.collideRight()) {
        this.velocity.x = -this.velocity.x;
    }
    if (this.collideTop() || this.collideBottom()) {
        this.velocity.y = -this.velocity.y;
    }

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && this.collide(ent)) {
            //var temp = this.velocity;
            ent.velocity = this.velocity;
            //ent.velocity = temp;
        };
    };

    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent) {
            var dist = distance(this, ent);
            var difX = (ent.x - this.x) / dist;
            var difY = (ent.y - this.y) / dist;
            this.velocity.x += difX / (dist * dist) * acceleration;
            this.velocity.y += difY / (dist * dist) * acceleration;

            var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
            if (speed > maxSpeed) {
                var ratio = maxSpeed / speed;
                this.velocity.x *= ratio;
                this.velocity.y *= ratio;
            };
        };
    }

    this.velocity.x -= (1 - friction) * this.game.clockTick * this.velocity.x;
    this.velocity.y -= (1 - friction) * this.game.clockTick * this.velocity.y;

}

Circle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.colors[this.color];
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}


// the "main" code begins here
console.log("main");
var friction = 1;
var acceleration = 100;
var maxSpeed = 200;

var ASSET_MANAGER = new AssetManager();
var gameEngine = new GameEngine();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");
ASSET_MANAGER.downloadAll(function () {

    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var circle = new Circle(gameEngine);

    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 0;
        circle.radius = 10;
        circle.idNum=gameEngine.entities.length;
        console.log("length of entities was " + gameEngine.entities.length + " before adding ball." );
        gameEngine.addEntity(circle);
    };

    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 1;
        circle.radius = 20;
        circle.idNum=gameEngine.entities.length;
        console.log("length of entities was " + gameEngine.entities.length + " before adding ball." );
        gameEngine.addEntity(circle);
    };


    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 2;
        circle.radius = 30;
        circle.idNum=gameEngine.entities.length;
        console.log("length of entities was " + gameEngine.entities.length + " before adding ball." );
        gameEngine.addEntity(circle);
    };

    gameEngine.init(ctx);
    gameEngine.start();
});



var socket = io.connect("http://76.28.150.193:8888");


function myLoadFunction() {
    document.getElementById("LoadButton").style.color = "red";
    console.log("Loading");

    var x = socket.emit("load", { studentname: "Arshdeep Singh", statename: "allBallInfo"});
}


socket.on("load", function (data) {
    for(var i = 0; i < gameEngine.entities.length; i++) {
        gameEngine.entities[i].id=data.data.idArray[i];
        gameEngine.entities[i].radius=data.data.radiusArray[i];
        gameEngine.entities[i].color=data.data.colorArray[i];
        gameEngine.entities[i].velocity.x=data.data.xVelArray[i];
        gameEngine.entities[i].velocity.y=data.data.yVelArray[i];
        gameEngine.entities[i].x=data.data.xPosArray[i];
        gameEngine.entities[i].y=data.data.yPosArray[i];
    }
});




function mySaveFunction() {
    console.log("Saving");
    document.getElementById("LoadButton").style.color = "blue";

    var idArray=[];
    var radiusArray=[];
    var colorArray=[];
    var xVelArray=[];
    var yVelArray=[];
    var xPosArray=[];
    var yPosArray=[];

    //traverse throught the entities array and seperate out the important values.
    for (var i = 0; i < gameEngine.entities.length; i++) {
        idArray.push(gameEngine.entities[i].idNum);
        radiusArray.push(gameEngine.entities[i].radius);
        colorArray.push(gameEngine.entities[i].color);
        xVelArray.push(gameEngine.entities[i].velocity.x);
        yVelArray.push(gameEngine.entities[i].velocity.y);
        xPosArray.push(gameEngine.entities[i].x);
        yPosArray.push(gameEngine.entities[i].y);
    }

    socket.emit("save", { studentname: "Arshdeep Singh", statename: "allBallInfo", data: {idArray: idArray, radiusArray: radiusArray,
                                                                colorArray: colorArray, xVelArray: xVelArray, yVelArray, yVelArray,
                                                                xPosArray: xPosArray, yPosArray: yPosArray}
                                                            });
}
