
// GameBoard code below
/*
function distance(a, b) {
    var difX = a.x - b.x;
    var difY = a.y - b.y;
    return Math.sqrt(difX * difX + difY * difY);
};



//Note that division in javascript is "real" division meaning that 5/2 = 2.5
function getFraction(a,b) {
    if (a > b) {
        //console.log("took in " + a + ", " + b + " and returned " + (1 - (b/a)));
        return 1 - b/a;

    } else if (b > a) {
        return 1 + a/b;
    } else {
        return 1;
    }

}




function Circle(game) {
    this.player = 1;
    this.radius = 20;
    this.colors = ["Red", "Purple", "Gold"];
    this.color = 3;
    Entity.call(this, game, this.radius + Math.random() * (800 - this.radius * 2), this.radius + Math.random() * (800 - this.radius * 2));
    this.velocity = { x: Math.random() * 100, y: Math.random() * 100 };
    //console.log(this.velocity);
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
    return ((distance(this, other) < this.radius + other.radius));
};

Circle.prototype.update = function () {
    Entity.prototype.update.call(this);

    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * this.game.clockTick;

    if (this.collideLeft()) {
        this.velocity.x = -this.velocity.x;

    }

    if (this.collideRight()) {
        this.velocity.x = -this.velocity.x;

    }

    if (this.collideTop()) {
        this.velocity.y = -this.velocity.y;

    }

    if (this.collideBottom()) {
        this.velocity.y = -this.velocity.y;

    }


    var collideWith; //1 if this is bigger, 0 if equal, -1 if this is smaller.
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if (this != ent && this.collide(ent)) {


            //var temp = this.velocity;
            //temp.x *= getFraction(this.radius, ent.radius);
            //temp.y *= getFraction(this.radius, ent.radius);
            // if (this.color == ent.color) {
            //     //this.velocity = ent.velocity;
            // } else {
            //var temp = this.velocity;
            this.velocity = ent.velocity;
            //ent.velocity = temp;

/*
            if (this.velocity.x == ent.velocity.x && this.velocity.y == ent.velocity.y) {
                if (this.x > ent.x) {
                    this.velocity.x +=1;
                } else {
                    this.velocity.x -=1;
                }
            }*/

/*
            if (this.radius < ent.radius) {
                collideWith = -1;
            } else if (this.radius == ent.radius) {
                collideWith = 0;
            } else {
                collideWith = 1;
            }*/

            //}
            //ent.velocity = temp;
            //this.velocity.x *= getFraction(this.radius, ent.radius);
            //this.velocity.y *= getFraction(this.radius, ent.radius);

/*
        };
    };
*/
/*
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

/*
    if (collideWith < 0) {
        this.velocity.x *= 1.5;
        this.velocity.y *= 1.5;
    } else if (collideWith > 0) {
        this.velocity.x *= .5;
        this.velocity.y *= .5
    }


    //this.velocity.y -= (1 - gravity) * this.game.clockTick * this.velocity.y;




}

Circle.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.colors[this.color];
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
}

var friction = 1;
var acceleration = 3000;
var maxSpeed = 2000;
var gravity = 1.1;

// the "main" code begins here

/*
var ar = {x:5, y:6};
console.log(ar);
console.log(ar.y); //prints 6


var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var circle = new Circle(gameEngine);

    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 0;
        circle.radius = 10;
        gameEngine.addEntity(circle);
    };

    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 1;
        circle.radius = 20;
        gameEngine.addEntity(circle);
    };


    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 2;
        circle.radius = 30;
        gameEngine.addEntity(circle);
    };



    gameEngine.init(ctx);
    gameEngine.start();
});


*/

//////




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

var friction = 1;
var acceleration = 100;
var maxSpeed = 200;

// the "main" code begins here

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./img/960px-Blank_Go_board.png");
ASSET_MANAGER.queueDownload("./img/black.png");
ASSET_MANAGER.queueDownload("./img/white.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var circle = new Circle(gameEngine);

    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 0;
        circle.radius = 10;
        gameEngine.addEntity(circle);
    };

    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 1;
        circle.radius = 20;
        gameEngine.addEntity(circle);
    };


    for (var i = 0; i < 4; i++) {
        circle = new Circle(gameEngine);
        circle.color = 2;
        circle.radius = 30;
        gameEngine.addEntity(circle);
    };

    gameEngine.init(ctx);
    gameEngine.start();
});
