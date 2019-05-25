
let getRandomHex = function(){
    return Math.floor(Math.random()*255);
};

let getRandomColor = function () {
    let red = getRandomHex();
    let green = getRandomHex();
    let blue = getRandomHex();
    return "rgb(" + red + ',' + green + ',' + blue + ')';
};

let Bullet = function() {
    let color = getRandomColor();
    this.width = 1;
    this.height = 8;
    this.speed = speed;
    this.color = color;
    this.update = function () {
        ctx = Stage1.context;
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rect(this.x, this.y, 1,8);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    };
};