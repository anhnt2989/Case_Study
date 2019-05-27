//
// let getRandomHex = function(){
//     return Math.floor(Math.random()*255);
// };
//
// let getRandomColor = function () {
//     let red = getRandomHex();
//     let green = getRandomHex();
//     let blue = getRandomHex();
//     return "rgb(" + red + ',' + green + ',' + blue + ')';
// };
let randomXpos = Math.floor(Math.random() * 1200);
let randomYpos = Math.floor(Math.random() * (700 - 300) + 300);

let Bullet = function (x, y) {
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = Stage1.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(bulletimg, -bulletimg.width / 4 - this.width / 3, -bulletimg.height / 4 - this.height / 3);
        ctx.restore();
    };
};