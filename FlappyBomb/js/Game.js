// (function(){
//     ...
// })()

(function() {
	var Game = window.Game = function(obj) {
		// 资源R.json地址
		this.RjsonUrl = obj.RjsonUrl
		// this.tip = 'game.js'
		// 得到画布
		// 将画布作为Game的一个属性来用  可以将id作为参数传入，也可直接写，反正页面上只有一个canvas
		this.canvas = document.getElementById(obj.id);

		// 上下文
		this.ctx = this.canvas.getContext("2d");

		//设置canvas宽高
		this.init();

		// 设置帧编号
		this.fno = 0;

		// 分数
		this.score = 0;

		// 读取资源
		// 读取资源是一个异步函数。所以我们不知道什么时候执行完毕，但是其他的事情必须等到它执行完毕之后再执行，必须用回调函数。
		var self = this;
		this.loadAllResource(function(){
			// console.log("这个函数是异步的你不知道啥时候结束，所以把在它完成后，接下来要执行的函数放在回调的结果里边");
			// 我们封装的回调函数，这里表示全部资源加载完毕
			self.start();

			// 绑定监听
			// self.bindEvent();
		})
	}
	// 初始化 设置canvas宽高
	Game.prototype.init = function() {
		// 读取视口大小
		var winWidth = document.documentElement.clientWidth;
		var winHeight = document.documentElement.clientHeight;
		// 验收宽高
		if ( winWidth > 414 ){
			winWidth = 414
		}else if ( winWidth < 320 ){
			winWidth = 320
		}
		if ( winHeight > 812 ){
			winHeight = 812
		}else if ( winHeight < 500 ){
			winHeight = 500
		}
		// canvas画布大小匹配视口
		this.canvas.width = winWidth;
		this.canvas.height = winHeight;
		// this.canvas.width = winWidth > 414 ? 414 : winWidth;
		// this.canvas.height = winHeight > 736 ? 736 : winHeight;
	}
	// 读取资源
	Game.prototype.loadAllResource = function(callback) {
		// 准备一个R对象
		this.R = {};
		var self = this; // 备份
		// 发出请求， 请求R.json文件
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				var R_obj = JSON.parse(xhr.responseText);
				// console.log(Robj.images.length);
				// 遍历数组
				var len = R_obj.images.length;
				// 计数器
				var allreadyLoadNumber = 0
				for( var i in R_obj.images) {
					// console.log(R_obj.images[i].name)
                    // 创建R对象中的对应的键，键的名字就是数组中项目的name属性
					self.R[R_obj.images[i].name] = new Image();

					// 发出HTTP请求
                    self.R[R_obj.images[i].name].src = R_obj.images[i].url;

                    // 添加监听
                    self.R[R_obj.images[i].name].onload = function () {
                    	allreadyLoadNumber ++;
                    	// 清屏
                    	self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height)
                    	// 提示文字
                    	var txt = "正在加载资源 "+ allreadyLoadNumber +"/"+ len +" 请稍后";
                    	// 放置居中位置， 黄金分割点上
                    	self.ctx.font = '20px 苹方';
                    	self.ctx.textAlign = 'center';
                    	self.ctx.fillText(txt, self.canvas.width/2, self.canvas.height*(1-0.618));
                    	// 判断是否加载完毕
                    	if (allreadyLoadNumber == len) {
                    		// callback.call(self); //以自己正确的上下文来执行
                    		callback();
                    	}
                    }
				}
			}
		}
		// xhr.open("get",'R.json',true);
		xhr.open("get",this.RjsonUrl,true);
		xhr.send(null)
	}
	// 开始游戏
	Game.prototype.start = function () {
		// 实例化自己的场景管理器
		this.sm = new SceneManager()

		var self = this



		// 设置定时器
		this.timer = setInterval(function() {
			// 清屏
			self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

			// 场景管理器的渲染&更新
			self.sm.render();
			self.sm.update();

			// 帧编号
			self.fno++;
			// 打印帧编号
			self.ctx.font = "20px consolas";
			self.ctx.textAlign = 'left';
			self.ctx.fillStyle = '#111';
			self.ctx.fillText('FNO:' + self.fno, 10, 20);
			// 打印当前场景号
			self.ctx.fillText('场景号:' + self.sm.sceneNumber, 100, 20)


		},20)
	}


})()
