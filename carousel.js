$(document).ready(function(){
	//事件绑定兼容
	//获取所有需要的元素
	var curindex=0,
		width=$('.big_pics ul li').eq(0).width();
		oul=$('.big_pics ul'),
	    spics=$('.small_pics ul li'),
	    circles=$('.cirs ul li');

	/*实现圆圈索引控制动画*/
	circles.mouseover(function(){
		var str=$(this).attr("id");
		var index=str.slice(str.length-1);
		$(this).addClass("current").siblings().removeClass("current");
		$(spics[index-1]).addClass("current").siblings().removeClass("current");
		//控制动画滑动
		curindex=index-1;
		ani();
	})

	/*实现缩略图控制动画*/
	spics.mouseover(function(){
		var str=$(this).attr("id");
		var index=str.slice(str.length-1);
		$(this).addClass("current").siblings().removeClass("current");
		$(circles[index-1]).addClass("current").siblings().removeClass("current");
		//控制动画滑动
		curindex=index-1;
		ani();
	})

	/*向左滑动动画*/
	$('#prev').click(function(){
	  if(curindex>=1){
	  	curindex--;
	  }else{
	  	curindex=circles.length-1;
	  }
	  $(spics[curindex]).addClass("current").siblings().removeClass("current");
	  $(circles[curindex]).addClass("current").siblings().removeClass("current");
		ani();
	})
	/*向右滑动动画*/
	$('#next').click(function(){
	 if(curindex==circles.length-1){
	 	curindex=0;
	 }else{
	 	curindex++;
	 }

	 $(spics[curindex]).addClass("current").siblings().removeClass("current");
	 $(circles[curindex]).addClass("current").siblings().removeClass("current");
		ani();
		});
	/*动画函数*/
	function ani(){
		$(spics[curindex]).addClass("current").siblings().removeClass("current");
		$(circles[curindex]).addClass("current").siblings().removeClass("current");
		oul.stop(true,false).animate({'left':-width*curindex},500);
	}

	/*自动轮播*/
	var _interval=setInterval(showTime,2500);
	function showTime(){
		if(curindex==circles.length-1){
			curindex=0;
		}else{
			curindex++;
		}
		ani();
	}
	 //鼠标停留在画面时停止自动动画，离开恢复
	    $(".big_pics ul").mouseover(function(){
	        clearInterval(_interval);
	    });
	    $(".big_pics ul").mouseout(function(){
	        _interval=setInterval(showTime,2500);
	    });

})