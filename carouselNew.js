//存放开发插件的代码
(function($){
	var pluginName="carouselImages";
	var defaults={
		//默认配置
	}

	//方法
	function Plugin(element,options){
		this.options=$.extend({},defaults,options);
		//缓存基本参数
		this.$box=$(this.options.box);
		this.$imgBox=$(this.options.imgBox);
		this.$thumBox=$(this.options.thumBox);
		this.imgLength=$(this.options.imgBox).find('img').length;
		this.thumbWidth=$(this.$thumBox).find('li').eq(0).outerWidth(true);
		this.init();
	}

	//初始化
	Plugin.prototype.init=function(){
		//this.$imgBox.find('li').eq(this.options.currentIndex).css('display','block');
		if (this.options.autoPlay) {
      		this.autoPlay();
    	}
		this.bindEvent();
	}

	//绑定事件
	Plugin.prototype.bindEvent=function(){
		var prev=this.options.prev;
		var next=this.options.next;
		var thumPrev=this.options.thumPrev;
		var thumNext=this.options.thumNext;
		var circles=this.circles;
		this.$box.on('click',prev,$.proxy(this.prevEvent,this));
		this.$box.on('click',next,$.proxy(this.nextEvent,this));
		this.$box.on('click',thumPrev,$.proxy(this.thumPrevEvent,this));
		this.$box.on('click',thumNext,$.proxy(this.thumNextEvent,this));
		this.$box.on('click',circles,$.proxy(this.circlesEvent,this));

	}

	//发生移动
	Plugin.prototype.imgTranslate=function(){
		var _this=this;
		
		_this.$imgBox.find('li').eq(_this.options.currentIndex).fadeIn(_this.options.delayTime);
		_this.$imgBox.find('li').eq(_this.options.currentIndex).css('display','block').siblings('li').css('display','none');
		_this.$thumBox.find('li').eq(_this.options.currentIndex).addClass('current').siblings('li').removeClass('current');
		if(_this.options.currentIndex>=(this.options.thumDisplayNums-1)&&_this.options.currentIndex<(_this.imgLength-1)){
			var _leftMove=(this.options.currentIndex-3)*_this.thumbWidth;
			_this.$thumBox.stop(true,false).animate({'left':-_leftMove},_this.options.delayTime);
		}else if(_this.options.currentIndex==(_this.imgLength-1)){
			//console.log(_this.options.currentIndex);
			var _leftMove=(_this.options.currentIndex-4)*_this.thumbWidth;
			_this.$thumBox.stop(true,false).animate({'left':-_leftMove},_this.options.delayTime);
		}else{
			_this.$thumBox.stop(true,false).animate({'left': 0},_this.options.delayTime);
		}
	}


	//下一张事件
	Plugin.prototype.nextEvent=function(){
		var _this=this;
		_this.$imgBox.find('li').eq(_this.options.currentIndex).fadeOut(_this.options.delayTime);
		_this.options.currentIndex++;
		if(_this.options.currentIndex == _this.imgLength){
			_this.options.currentIndex=0;
		}
		this.imgTranslate();		
	}

	//上一张事件
	Plugin.prototype.prevEvent=function(){
		var _this=this;
		_this.$imgBox.find('li').eq(_this.options.currentIndex).fadeOut(_this.options.delayTime);
		if(_this.options.currentIndex==0){
			_this.options.currentIndex=_this.imgLength-1;
		}else{
			_this.options.currentIndex--;
		}
		this.imgTranslate();
	}

	//缩略图上一张事件
	Plugin.prototype.thumPrevEvent=function(){
		var _this=this;
		_this.$imgBox.find('li').eq(_this.options.currentIndex).fadeOut(_this.options.delayTime);
		if(_this.options.currentIndex==0){
			_this.options.currentIndex=_this.imgLength-1;
		}else{
			_this.options.currentIndex--;
		}
		this.imgTranslate();
	}

	//缩略图下一张事件
	Plugin.prototype.thumNextEvent=function(){
		var _this=this;
		_this.$imgBox.find('li').eq(_this.options.currentIndex).fadeOut(_this.options.delayTime);
		_this.options.currentIndex++;
		if(_this.options.currentIndex == _this.imgLength){
			_this.options.currentIndex=0;
		}
		this.imgTranslate();
	}

	//自动轮播
	Plugin.prototype.autoPlay=function(){
		var _this=this;

		var _myInterval=setInterval(showTime,_this.options.intervalTime);
		function showTime(){
			_this.$imgBox.find('li').eq(_this.options.currentIndex).fadeOut(_this.options.delayTime);
			_this.options.currentIndex++;
			if(_this.options.currentIndex==_this.imgLength){
				_this.options.currentIndex=0;
			}
			_this.imgTranslate();
		};

		_this.$imgBox.hover(function(){
			clearInterval(_myInterval);

		},function(){
			_myInterval=setInterval(showTime,_this.options.intervalTime);
		})

		_this.$thumBox.find('li').click(function(){
			_this.options.currentIndex=_this.$thumBox.find('li').index(this);
			//console.log(_this.options.currentIndex);
			_this.imgTranslate();

		})
	}

	

	//暴露方法
	$.fn[pluginName]=function(options){
		var args=Array.prototype.slice.call(arguments,1);

		return this.each(function(){
			var $this=$(this),
			    data=$this.data('plugin_'+pluginName);

	        if(!data){
	        	$this.data('plugin_'+pluginName,(data=new Plugin(this,options)));
	        }

	        if(typeof options === 'string'){
	        	data[options].apply(data,args);
	        }
		});
	};

})(jQuery);