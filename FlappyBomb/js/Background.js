(function() {
    // 背景类
    var Background = window.Background = function() {
        // 自己的背景
        this.image = game.R.bg_day;
        // 自己的y 0.75 是假定天空到达分界线的高度与屏高的比值
        this.y = 0.75*game.canvas.height - 396;
        this.x = 0
        // 图片自身宽高
        this.w = 288;
        this.h = 512;
        // 背景移动速度
        this.speed = 1;
    }

    // 更新
    Background.prototype.update = function () {
        // this.x -= this.speed;
        // if (this.x < -this.w){
        //     this.x = 0
        // }
        this.x = this.x < -this.w ? 0 : this.x-this.speed;
    }

    // 渲染
    Background.prototype.render = function () {
        // 渲染图片
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);
        // console.log(this.y)
        // 渲染 天空空余位置
        game.ctx.fillStyle = '#4EC0CA';
        game.ctx.fillRect(0, 0, game.canvas.width,this.y + 10)
        // // 渲染 草地空缺位置
        // game.ctx.fillStyle = '#5EE270';
        // game.ctx.fillRect(0, this.y + this.h, game.canvas.width, game.canvas.height - this.y - this.h)
    }














})()