# ImgCarousel
 
 使用jQuery插件封装的方式封装的轮播图插件

## 如何配置

1.确定轮播图的容器`#carouselBox`,对容器应用`carouselImages()`方法，传递一个设置选项的options参数。


    $('#carouselBox').carouselImages({
    
		box: '#carouselBox', // 轮播图容器
		
		imgBox: '#pictures', //大图容器(对ul设置id)
		
		thumBox: '#thumbnails', //缩略图容器(同上)
		
		currentIndex: 0, //开始默认显示的图片索引
		
		prev: '#prev', //大图向左移动箭头
		
		next: '#next', //大图向右移动箭头
		
		thumPrev: '#thumPrev', //缩略图向左箭头
		
		thumNext: '#thumNext', //缩略图向右箭头
		
		thumDisplayNums: 5, //缩略图一次性显示数量
		
		intervalTime: 5000, //自动播放时间间隔
		
		delayTime: 500,//大图切换延迟时间
		
		autoPlay: true //是否自动播放
	});
	
## 一些细节

 - 缩略图显示数量如果改变，应在相应的css文件改变包裹thumbnails的容器宽度。

## bug (**待解决**)

在手动切换的时候，会出现快速自动切换到手动切换后的下一张。我在思考问题是不是由定时器引起的。
如果要解决这个bug的话，应该手动切换的时候清除下定时器，手动切换动画完成后再重新设置下定时器。


 
