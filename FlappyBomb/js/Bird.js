(function () {

    var Bird = window.Bird = function(){
        // 随机小鸟颜色 ，三种颜色的小鸟
        this.color = parseInt(Math.random() * 3);
        //this.color 对应所上图 每种颜色小鸟有3种翅膀状态
        //放置在 render中 可以使得每次 小鸟的颜色发生变化
        // this.imageArr = [
        //     game.R[`bird${this.color}_0`],
        //     game.R[`bird${this.color}_1`],
        //     game.R[`bird${this.color}_2`]
        // ];

        // 翅膀状态
        this.wingStep = 0;

        // 小鸟位置(注意,这个位置是真实物理位置)
        // 图片大小是48X48
        this.x = game.canvas.width * (1-0.618) - 24
        this.y = 100; //这个随意，不要太低，因为要掉落的

        // 鸟自己的帧，用于下落、上升算法
        this.fno = 0;

        // 小鸟旋转
        this.d = 0;

        // 是否拥有能量
        this.hasEnergy = false;
    }

    Bird.prototype.update = function(){

        // 翅膀状态 每隔固定帧拍打一次
        this.wing();

        // 掉落算法
        if(this.hasEnergy){
            // 获得能量
            this.y -= (20-this.fno) * 0.41;

            // 20帧后，能量耗完
            if(this.fno > 20){
                this.hasEnergy = false;
                this.fno = 0
            }
        } else {
            // 没有能量
            this.y += this.fno * 0.33;
        }
        this.d += 0.03;
        this.fno++;


        // 计算自己的四个碰撞检测值
        this.T = this.y + 13;
        this.R = this.x + 40;
        this.B = this.y + 37;
        this.L = this.x + 6;

        // 验收 小鸟的真实顶部是this.T
        if(this.T < 0) {//this.y + 13 < 0
            this.y = -13;
        }

        // 验证是否落地
        if (this.B >= game.sm.land.y) {
            // game.sm.birdIsLand = true;
            this.fno = 0;
            // clearInterval(game.timer) 死亡就去场景4
            game.sm.enter(4);
        }
// // 验证是否落地   放在此处，触底有问题
//         if (this.B > game.land.y) {
//             clearInterval(game.timer)
//         }
    }

    Bird.prototype.render = function(){
        this.imageArr = [
            game.R[`bird${this.color}_0`],
            game.R[`bird${this.color}_1`],
            game.R[`bird${this.color}_2`]
        ];
        game.ctx.save();
        game.ctx.translate(this.x+24,this.y+24);
        // game.ctx.fillRect(-18,-12,34,24); 画的AABB盒 情况
        game.ctx.rotate(this.d);
        game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24);
        // game.ctx.fillText(this.fno, -24, -24);
        game.ctx.restore();

    }

    // 获能
    Bird.prototype.charge = function() {
        this.hasEnergy = true;
        this.d = -0.6;
        this.fno = 0;
    }

     // 拍打翅膀
     Bird.prototype.wing = function () {
        game.fno % 5 ==0 && this.wingStep ++
        if (this.wingStep == 3) {
            this.wingStep = 0
        };
     }








})()