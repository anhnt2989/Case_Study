let Boss = function () {
  this.x = x;
  this.y = y;
  this.update = function () {
      ctx = myGameArea.context;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.drawImage(bossimg, -bossimg.width/4 - this.width / 3, -bossimg.height/4 - this.height / 3);
      ctx.restore();
  };
};