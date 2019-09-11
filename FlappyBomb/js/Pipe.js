(function() {
    // 管子类
    var Pipe = window.Pipe = function() {
        this.imageUp = game.R.pipe_down;
        this.imageDown = game.R.pipe_up;

        // 总高 = 上管高 + 间隙 + 下管高
        this.allHeight = game.canvas.height * 0.78;

        // 间隙
        this.gap = 150;
        this.w = 52;
        this.h = 320;


        // 随机上管高度 保证最小高度100
        this.upheight = parseInt(Math.random() * (this.h - 100)) + 100;
        // 此时 下管高度就已经确定了
        this.downheight = this.allHeight - this.upheight - this.gap;

        // 管子的位置
        this.x = game.canvas.width
        // 与大地同速
        this.speed = 2

        // 是否已经成功通过 （已经通过的不再进行比较加分）
        this.alreadyPass = false;

        // 将自己推入管子数组
        game.pipeArr.push(this)
    }

    // 更新
    Pipe. prototype.update = function () {
        this.x -= this.speed;

        // console.log(this.x)
        // 碰撞检测 ， 检查自己有没有撞到小鸟
        if (game.bird.R > this.x && game.bird.L < this.x + this.w){
            if (game.bird.T < this.upheight || game.bird.B > this.upheight + this.gap){
                // 撞到了
                // console.log('BOMB!')
                // clearInterval(game.timer) 死亡就进入场景4
                game.sm.birdIsLand = false;
                game.bird.fno = 0;
                game.sm.enter(4);

            }
        }

        // 加分
        if(game.bird.R > this.x + this.w && !this.alreadyPass){
            game.score ++;
            this.alreadyPass = true;
        }

         // 管子离开视口，可以从数组中删除这个管子
        if (this.x < - this.w){
            for (var i in game.pipeArr){
                if(game.pipeArr[i] === this){
                    game.pipeArr.splice(i,1);
                }
            }
        }

    }

    // 渲染
    Pipe.prototype.render = function () {
        game.ctx.drawImage(this.imageUp, 0, this.h - this.upheight, this.w, this.upheight, this.x, 0, this.w,this.upheight);

        game.ctx.drawImage(this.imageDown, 0, 0, this.w, this.downheight, this.x, this.allHeight - this.downheight, this.w, this.downheight)
        // game.ctx.fillText(this.gap, this.x, 500)

    }













})()