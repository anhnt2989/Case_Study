const tankimg = document.getElementById("tank");
const sawimg = document.getElementById("saw");
let mineimg = document.getElementById("mine");
let gameoverimg = document.getElementById("gameover");
let gateimg = document.getElementById("gate");
let intro = document.getElementById("intro");
let stage1 = document.getElementById("stage1");
let stage2 = document.getElementById("stage2");


let vY = 7;
let vY1 = 7;
let vY2 = 7;
let vX = 7;
let vX1 = 7;


let myMusic;
let mineSound;
let sawSound;
let shotSound;

let gate;
let saw;
let saw1;
let saw2;
let saw3;
let saw4;
let saw5;
let saw6;
let saw7;
let saw8;


let mine1;
let mine2;
let mine3;
let mine4;
let mine5;
let mine6;
let mine7;
let mine8;
let mine9;
let mine10;
let mine11;
let mine12;

let tank;

function startGame() {

    intro.style = "display: none";
    stage2.style = "display:none";
    mine1 = new Mine(40,40,20,200);
    mine2 = new Mine(40,40,55,200);
    mine3 = new Mine(40,40,90,200);
    mine4 = new Mine(40,40,1110,200);
    mine5 = new Mine(40,40,1145,200);
    mine6 = new Mine(40,40,1180,200);
    mine7 = new Mine(40,40,230,200);
    mine8 = new Mine(40,40,380,200);
    mine9 = new Mine(40,40,530,200);
    mine10 = new Mine(40,40,680,200);
    mine11 = new Mine(40,40,830,200);
    mine12 = new Mine(40,40,980,200);

    gate = new Gate(250,188,620,80);

    saw = new SawBlade(65,65,150,200);
    saw1 = new SawBlade(65,65,1050,200);
    saw2 = new SawBlade(65,65,450,200);
    saw3 = new SawBlade(65,65,750,200);
    saw4 = new SawBlade(65,65,300,400);
    saw5 = new SawBlade(65,65,600,400);
    saw6 = new SawBlade(65,65,900,400);
    saw7 = new SawBlade(65,65,50,300);
    saw8 = new SawBlade(65,65,1150,500);

    tank = new Tank(50,50,600,655);

    mineSound = new Sound("mineSound.mp3");
    myMusic = new Sound("gameMusic.mp3");
    sawSound = new Sound("sawSound.mp3");
    shotSound = new Sound("shot (mp3cut.net).mp3");
    myMusic.play();
    Stage1.start();
}
let Stage1 = {
    canvas : stage1,
    start : function () {
        this.canvas.width = 1200;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        // this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            Stage1.keys = (Stage1.keys || []);
            Stage1.keys[e.keyCode] = (e.type === "keydown");
        });
        window.addEventListener('keyup', function (e) {
            Stage1.keys[e.keyCode] = (e.type === "keydown");
        });
    },
    stop : function () {
        clearInterval(this.interval);
    },
    clear : function () {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
};

let Gate = function (width,height,x,y) {
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = Stage1.context;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.drawImage(gateimg,-gateimg.width/6 - this.width / 3, -gateimg.height/6 - this.height / 3);
        ctx.restore();
    }
};

let SawBlade = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = Stage1.context;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(sawimg,-sawimg.width/6 - this.width / 3, -sawimg.height/6 - this.height / 3);
        ctx.restore();
    }
};

let Mine = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = Stage1.context;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.drawImage(mineimg, -mineimg.width/4 - this.width / 3, -mineimg.height/4 - this.height / 3);
        ctx.restore();
    }
};

let Tank = function (width, height, x, y) {
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.shot = function (bullet) {
        shotSound.play();
    };
    // this.reach = function (gate) {
    //     let myleft = this.x;
    //     let myright = this.x + (this.width);
    //     let mytop = this.y;
    //     let mybot = this.y + (this.height);
    //     let gateleft = gates.x;
    //     let gateright = gates.x + (gates.width);
    //     let gatetop = gates.y;
    //     let gatebot = gates.y + (gates.height);
    //     let reach = true;
    //     if ((mybot < gatetop/2) || (mytop > gatebot/2) || (myright < gateleft/2) || (myleft > gateright/2)) {
    //         reach = false;
    //     }
    //     return reach;
    // };
    this.crashWith = function (others) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybot = this.y + (this.height);
        let otherleft = others.x;
        let otherright = others.x + (others.width);
        let othertop = others.y;
        let otherbot = others.y + (others.height);
        let crash = true;
        if ((mybot < othertop) || (mytop > otherbot) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
    this.update = function() {
        ctx = Stage1.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(tankimg, -tankimg.width / 3.5 - this.width / 3, -tankimg.height / 3.5 - this.height / 3 );
        ctx.restore();
    };
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
};

function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    }
}




function updateGameArea() {
    if (tank.crashWith(mine1) || tank.crashWith(mine2) || tank.crashWith(mine3)
        || tank.crashWith(mine4) || tank.crashWith(mine5) || tank.crashWith(mine6) ||
        tank.crashWith(mine7) || tank.crashWith(mine8) || tank.crashWith(mine9) || tank.crashWith(mine10)
        || tank.crashWith(mine11) || tank.crashWith(mine12)) {
        myMusic.stop();
        mineSound.play();
        Stage1.stop();
        gameoverimg.update = function () {
            ctx = Stage1.context;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(gameoverimg, 0, 0);
            ctx.restore();
        };
        gameoverimg.update();
        return;
    }
    if (tank.crashWith(saw) || tank.crashWith(saw1) || tank.crashWith(saw2) || tank.crashWith(saw3)
        || tank.crashWith(saw4) || tank.crashWith(saw5) || tank.crashWith(saw6) ||
        tank.crashWith(saw7) || tank.crashWith(saw8)) {
        myMusic.stop();
        sawSound.play();
        Stage1.stop();
        gameoverimg.update = function () {
            ctx = Stage1.context;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(gameoverimg, 0, 0);
            ctx.restore();
        };
        gameoverimg.update();
        return;
    }

    // if (tank.reach(gate)) {
    //     Stage1.stop();
    //     Stage1.clear();
    // }

    saw4.y += vY;
    if (saw4.y > 450) {
        vY = -vY;
    }
    if (saw4.y < 50) {
        vY = -vY;
    }
    saw5.y += vY1;
    if (saw5.y > 450) {
        vY1 = -vY1;
    }
    if (saw5.y < 50) {
        vY1 = -vY1;
    }
    saw6.y += vY2;
    if (saw6.y > 450) {
        vY2 = -vY2;
    }
    if (saw6.y < 50) {
        vY2 = -vY2;
    }
    saw7.x += vX;
    if (saw7.x > 1150) {
        vX = -vX;
    }
    if (saw7.x < 50) {
        vX = -vX;
    }
    saw8.x += vX1;
    if (saw8.x < 50) {
        vX1 = -vX1;
    }
    if (saw8.x > 1150) {
        vX1 = -vX1;
    }

    Stage1.clear();

    tank.moveAngle = 0;
    tank.speed = 0;
    if (Stage1.keys && Stage1.keys[65]) {
        tank.moveAngle = -4.5;
    }
    if (Stage1.keys && Stage1.keys[68]) {
        tank.moveAngle = 4.5;
    }
    if (Stage1.keys && Stage1.keys[87]) {
        tank.speed = 4.5;
    }
    if (Stage1.keys && Stage1.keys[83]) {
        tank.speed = -4.5;
    }
    if (Stage1.keys && Stage1.keys[75] ) {
        tank.shot();
    }
    tank.newPos();
    tank.update();

    mine1.update();
    mine2.update();
    mine3.update();
    mine4.update();
    mine5.update();
    mine6.update();
    mine7.update();
    mine8.update();
    mine9.update();
    mine10.update();
    mine11.update();
    mine12.update();

    gate.update();

    saw8.angle += 15 * Math.PI / 180;
    saw8.update();
    saw7.angle += 15 * Math.PI / 180;
    saw7.update();
    saw6.angle += 10 * Math.PI / 180;
    saw6.update();
    saw5.angle += 10 * Math.PI / 180;
    saw5.update();
    saw4.angle += 10 * Math.PI / 180;
    saw4.update();
    saw3.angle += 6 * Math.PI / 180;
    saw3.update();
    saw2.angle += 6 * Math.PI / 180;
    saw2.update();
    saw1.angle += 6 * Math.PI / 180;
    saw1.update();
    saw.angle += 6 * Math.PI / 180;
    saw.update();
}