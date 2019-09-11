(function() {

    var SceneManager = window.SceneManager = function () {
        // 场景1--游戏欢迎界面 2--游戏教程界面 3--游戏内容界面 4--Gameover&&爆炸效果 5--奖牌界面
        this.sceneNumber = 1;

        // 场景管理器负责实例化东西
        this.bg = new Background();
        game.bird = new Bird();
        this.land = new Land();

        // 初始游戏标题纵向位置
        this.logoY = -50;
        // 初始开始游戏按钮纵向位置
        this.btn_playY = game.canvas.height;
        this.btn_playX = game.canvas.width/2 - 58;


        // 监听
        this.bindEvent();
    }

    SceneManager.prototype.update = function() {
        switch(this.sceneNumber) {
            case 1 :
                // this.bg.update();
                this.logoY = this.logoY >= 120 ? 120 : this.logoY + 10;
                this.btn_playY = this.btn_playY <= game.canvas.height/2 ? game.canvas.height/2 : this.btn_playY - 15;


                break;
            case 2 :
                // 小鸟扑打翅膀
                game.bird.wing();


// if (this.tutorialOpacity < 0){
                //     this.tutorialOpacityisDown = false;
                // }
                // else if(this.tutorialOpacity > 1){
                //     this.tutorialOpacityisDown = true;
// }
                this.tutorialOpacity -= this.tutorialOpacityisDown ? 0.02 : -0.02;
                if(this.tutorialOpacity < 0+0.02 || this.tutorialOpacity > 1-0.02){
                    this.tutorialOpacityisDown = !this.tutorialOpacityisDown;
                }
                // console.log(this.tutorialOpacity, this.tutorialOpacityisDown);
                 break;

            case 3 :
                // 背景更新
                this.bg.update();
                // 大地更新
                this.land.update();
                // 复原游戏状态使得小鸟位置
                game.bird.x -= 20
                if (game.bird.x <= game.canvas.width * (1-0.618) - 24){
                    game.bird.x = game.canvas.width * (1-0.618) - 24
                };
                // 小鸟更新
                game.bird.update();

                // 管子实例化
                game.fno % 150 == 0 && (new Pipe());
                // 渲染、更新管子数组
                for(var i in game.pipeArr){
                    game.pipeArr[i] && game.pipeArr[i].update();
                    // game.pipeArr[i] && game.pipeArr[i].render();//放在这里也可以
                }

                break;
            case 4 :
                // 死亡闪白 mark层闪现后透明度逐渐降低
                // console.log(this.markOpacity)
                this.markOpacity -= 0.1;

                // if (this.markOpacity <=0) {
                //     this.markOpacity = 0
                // } 等价写法↓
                this.markOpacity <= 0 && (this.markOpacity = 0);

                if (game.bird.y >= this.land.y - 37) {
                    this.birdIsLand = true
                }

                if(!this.birdIsLand){
                    game.bird.fno ++
                    game.bird.y += game.bird.fno * 0.6;
                    if (game.bird.y >= this.land.y - 37){
                         game.bird.y = this.land.y -37
                         this.birdIsLand = true;
                         game.bird.fno = 0;
                    }
                }else {
                    // 渲染爆炸特效，写在render中
                    // clearInterval(game.timer)
                }
                break;
        }
    }

    SceneManager.prototype.render = function() {
        // 根据当前是第几个场景，来决定做什么
        switch(this.sceneNumber) {
            case 1 :
                // 渲染背景
                this.bg.render();
                // 渲染大地
                this.land.render();
                // 渲染游戏logo
                game.ctx.drawImage(game.R["title"], game.canvas.width/2 - 89, this.logoY);
                // 渲染小鸟
                game.bird.render();
                game.bird.x = game.canvas.width / 2 - 24;
                game.bird.y = 240

                // 画开始按钮
                game.ctx.drawImage(game.R["button_play"], this.btn_playX, this.btn_playY)

                break;

            case 2 :
                // 渲染背景
                this.bg.render();
                // 渲染大地
                this.land.render();
                // 渲染小鸟
                game.bird.render();

                // 画教程图
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity;
                game.ctx.drawImage(game.R["tutorial"], game.canvas.width/2 - 57, 280);
                game.ctx.restore();
                break;
            case 3 :
                // 渲染背景
                this.bg.render();
                // 渲染大地
                this.land.render();
                // 渲染小鸟
                game.bird.render();

                for(var i in game.pipeArr){
                    // game.pipeArr[i] && game.pipeArr[i].update();
                    game.pipeArr[i] && game.pipeArr[i].render();//放在这里也可以
                }

                var scoreLen = game.score.toString().length;
                // 循环语句去设置图片的显示，有一个基准位置
                for (var i = 0; i < scoreLen; i++) {
                    game.ctx.drawImage(game.R["num"+ game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLen / 2 * 34 + 34 * i + 5, 100);
                }
                break;
            case 4 :
                // 渲染背景
                this.bg.render();
                // 渲染大地
                this.land.render();
                // 渲染小鸟
                if(!this.birdIsLand){
                    game.bird.render();
                }


                for(var i in game.pipeArr){
                    // game.pipeArr[i] && game.pipeArr[i].update();
                    game.pipeArr[i] && game.pipeArr[i].render();//放在这里也可以
                }


                //分开使得，爆炸在管子上也不会被遮挡
                // 渲染爆炸特效
                // console.log(this.birdIsLand,game.bird.fno)
                if(this.birdIsLand){
                    // console.log(game.bird.fno);
                    // if(game.bird.fno==0){
                    //     game.bird.render();
                    // } 可以不加这段←

                    // 爆炸序列 (之前用直接game.bird.fno 作为图片序列号，过程太快，用爆炸序列可以把爆炸过程更好地展示出来)
                    game.fno % 4 == 0 && this.bz_fno ++;
                    // if (game.bird.fno <= 6) {
                    //     game.ctx.drawImage(game.R["bz"+game.bird.fno], game.bird.x, game.bird.y, 48, 48)
                    // } 等价下面这种写法↓
                    this.bz_fno <= 6 && game.ctx.drawImage(game.R["bz"+ this.bz_fno], game.bird.x, game.bird.y, 48, 48)
                    this.bz_fno > 6 && this.enter(5)
                    // console.log(game.bird.fno);
                }


                // 分数
                var scoreLen = game.score.toString().length;
                // 循环语句去设置图片的显示，有一个基准位置
                for (var i = 0; i < scoreLen; i++) {
                    game.ctx.drawImage(game.R["num"+ game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLen / 2 * 34 + 34 * i + 5, 100);
                }

                // // 渲染闪白 第一种写法
                // game.ctx.save();
                // game.ctx.globalAlpha = this.markOpacity;
                // game.ctx.fillStyle = '#fff';
                // game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
                // game.ctx.restore();
                // // 渲染闪白 第二种写法
                game.ctx.fillStyle = 'rgba(255, 255, 255,' + this.markOpacity + ')';
                game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
                break;
            case 5 :
                // 渲染背景
                this.bg.render();
                // 渲染大地
                this.land.render();

                for(var i in game.pipeArr){
                    // game.pipeArr[i] && game.pipeArr[i].update();
                    game.pipeArr[i] && game.pipeArr[i].render();//放在这里也可以
                }

                // 分数
                var scoreLen = game.score.toString().length;
                // 循环语句去设置图片的显示，有一个基准位置
                for (var i = 0; i < scoreLen; i++) {
                    game.ctx.drawImage(game.R["num"+ game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLen / 2 * 34 + 34 * i + 5, 100);
                }

                // 渲染 游戏结束重新再来
                game.ctx.drawImage(game.R["text_game_over"], game.canvas.width / 2 - 102, game.canvas.height * (1 - 0.618) - 27);
                break;
            default:;
        }
    }
    // 进入某个场景
    SceneManager.prototype.enter = function(num) {
        this.sceneNumber = num;
        switch(this.sceneNumber) {
            case 1 :
                // 复原title纵向位置
                this.logoY = -50;
                // 复位初始开始游戏按钮纵向位置
                this.btn_playY = game.canvas.height;
                // 复位小鸟 旋转角度
                game.bird.d = 0;
                // 复位小鸟颜色
                // console.log('1:'+game.bird.color)
                game.bird.color = parseInt(Math.random() * 3);
                // console.log('2:'+game.bird.color)
                break;

            case 2 :
                game.bird.y = 150;
                // tutorial透明度0~1
                this.tutorialOpacity = 1;
                this.tutorialOpacityisDown = true;
                break;
            case 3 :
                // 处理管子， 将管子数组放置在game身上
                game.pipeArr = new Array();
                // 小鸟是否已触底
                this.birdIsLand = false;
                break;

            case 4 :
                // 死亡瞬间，屏幕闪白
                this.markOpacity = 1
                this.bz_fno = 0;
                break;
            case 5 :
                // 复位小鸟的 旋转角 和 颜色 （与case1 中 只放置其一即可）
                // game.bird.d = 0;
                // console.log('3:'+game.bird.color)
                // // game.bird.color = parseInt(Math.random() * 3);
                // console.log('4:'+game.bird.color)

                // 更简单的是 case1 中 加入
                // game.bird = new Bird;
                break;
            default:;
        }
    }

    // 事件监听
    SceneManager.prototype.bindEvent = function () {
        var self = this;
        // 注意不必switch套事件，采用事件套switch
        // game.canvas.onclick = function (event) {
        //     console.log(111+'鼠标操作')
        //     clickHandler(event.clientX, event.clientY);
        // }
        game.canvas.addEventListener('touchstart',function(){
            // console.log(222+'触摸操作')
            var finger = event.touches[0];
            clickHandler(finger.clientX,finger.clientY);
        }, true)
        function clickHandler(mouseX, mouseY) {
            // 点击时，根据场景作出响应
            switch(self.sceneNumber){
                case 1 :
                    if (mouseX > self.btn_playX && mouseX < self.btn_playX + 116 && mouseY > self.btn_playY && mouseY < self.btn_playY + 70){
                        self.enter(2)   // 去到场景2
                        // console.log(self.sceneNumber)
                        // console.log(mouseX,mouseY)
                    }
                    break;
                case 2 :
                    self.enter(3); // 去到场景3
                    break;
                case 3 :
                    game.bird.charge(); // 此时，点击屏幕，小鸟获能
                    break;
                case 5 :
                    self.enter(1);
                    break;
                default:;
            }
        }
    }



})()