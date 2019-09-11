(function() {
    // 大地类
    var Land = window.Land = function() {
        // 自己的背景
        this.image = game.R.land;
        // 自己的y 0.75 是假定天空到达分界线的高度与屏高的比值 这里让降低点儿
        this.y =  0.78*game.canvas.height;
        this.x = 0
        // 图片自身宽高
        this.w = 336;
        this.h = 112;
        // 背景移动速度 一般大于背景移动速度 因为离得近，肉眼判断其角速度大，所以感觉上速度快
        this.speed = 2;
    }

    // 更新
    Land.prototype.update = function () {
        // this.x -= this.speed;
        // if (this.x < -this.w){
        //     this.x = 0
        // }
        this.x = this.x < -this.w ? 0 : this.x-this.speed;
    }

    // 渲染
    Land.prototype.render = function () {
        // console.log(this.y)
        // 渲染图片
        game.ctx.drawImage(this.image, this.x, this.y);
        game.ctx.drawImage(this.image, this.x + this.w, this.y);
        game.ctx.drawImage(this.image, this.x + this.w * 2, this.y);

        // 渲染 大地空缺位置
        game.ctx.fillStyle = '#DED895';
        game.ctx.fillRect(0, this.y + this.h, game.canvas.width, game.canvas.height - this.y - this.h)
    }












})()