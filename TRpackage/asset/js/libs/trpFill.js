/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.7
 * release date : 2017.02.17
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */

/* 
	trpFill							: 컨텐츠 크기 채우기 
	@options		targetWidth 	: 타겟 가로 크기
	@options		targetHeight 	: 타겟 세로 크기
	@options		triggerWidth    : width가 참조될 선택자
	@options		triggerHeight   : height가 참도될 선택자
*/
	(function($) {
	   $.fn.trpFill = function(options) {

	// Establish default settings/variables
	// ====================================
		var settings = $.extend({  
			targetWidth     : 0,       
			targetHeight 	: 0,
            triggerTarget   : null,
			triggerWidth    : null,
			triggerHeight   : null
		}, options),

	// Do the magic math
	// =================

	changes = function(el) {
		var $el		= $(el),
			rate, newwidth, newheight, newMl, newMt;
            
		if( options.triggerWidth && options.triggerHeight ){   
			settings.triggerWidth 	= $( options.triggerWidth ).width();	
			settings.triggerHeight  = $( options.triggerHeight ).height();          
		}else if(options.triggerTarget){ 
			settings.triggerWidth 	= $( options.triggerTarget ).width();	
			settings.triggerHeight  = $( options.triggerTarget ).height();
		}else{
            settings.triggerWidth 	=  window.innerWidth;		
			settings.triggerHeight  =  window.innerHeight;
        }
            
		rate = ( settings.targetWidth > settings.targetHeight )? settings.triggerHeight/settings.targetHeight : settings.triggerWidth/settings.targetWidth;
		rate = ( settings.triggerHeight > Math.round(settings.targetHeight*rate) )? settings.triggerHeight/settings.targetHeight : ( settings.triggerWidth > settings.targetWidth*rate )? settings.triggerWidth/settings.targetWidth : rate;

		newwidth = Math.max(settings.triggerWidth, Math.round(settings.targetWidth*rate));
		newheight = Math.max(settings.triggerHeight, Math.round(settings.targetHeight*rate));

		newMl = (settings.triggerWidth-newwidth)/2;
		newMt = (settings.triggerHeight-newheight)/2;

		$el.css({ width:newwidth, height:newheight, "margin-left":newMl, "margin-top" : newMt  })

	};

	// Make the magic visible
	// ======================
		  return this.each(function() {
		  // Context for resize callback
			 var that = this;  

		  // Make changes upon resize
			 $(window).resize(function(){changes(that);});
		  // Set changes on load
			 changes(this);
		  });
	   };


	}(jQuery));
/* 
	$(".wrap-img").trpFill({ 
	targetWidth:1920, targetHeight:1080, triggerTarget:"#id or .class"});	
*/




/* 
	trpFillFn						: 컨텐츠 크기 채우기 		
	@parameter		$target			: 타겟 컨텐츠
	@parameter		$targetWidth 	: 타겟 가로 크기
	@parameter		$targetHeight 	: 타겟 세로 크기
	@parameter		$triggerWidth      : width가 참조될 
	@parameter		$triggerHeight     : height가 참도될
*/
	function trpFillFn ($target, $targetWidth, $targetHeight, $triggerWidth, $triggerHeight ) {
		var rate, newwidth, newheight, newMl, newMt;

		rate = ( $targetWidth > $targetHeight )? $triggerHeight/$targetHeight : $triggerWidth/$targetWidth;
		rate = ( $triggerHeight > Math.round($targetHeight*rate) )? $triggerHeight/$targetHeight : ( $triggerWidth > $targetWidth*rate )? $triggerWidth/$targetWidth : rate;

		newwidth = Math.max($triggerWidth, Math.round($targetWidth*rate));
		newheight = Math.max($triggerHeight, Math.round($targetHeight*rate));

		newMl = ($triggerWidth-newwidth)/2;
		newMt = ($triggerHeight-newheight)/2;

		$($target).css({ width:newwidth, height:newheight, "margin-left":newMl, "margin-top" : newMt  })
		
	}
/*	function resize(){	
		// var _global = {w:0, h:0,scrollTop:0}
		// _global.w = $( window ).width();
		// _global.h = $( window ).height();
		trpFillFn(".trpFill img", 1280 , 720,  window.innerWidth ,  window.innerHeight  );
	}	
	$(window).resize(resize);*/





/* 
	trpFillLimitedFn					: 컨텐츠 크기 채우기 		
	@parameter		$container		: 타겟 컨테이너
	@parameter		$image			: 타겟 컨텐츠
	@parameter		$targetWidth 	: 타겟 가로 크기
	@parameter		$targetHeight 	: 타겟 세로 크기
	@parameter		$triggerWidth   : width가 참조될
	@parameter		$triggerHeight  : height가 참도될
	@parameter		$hearderHeight	: 제외될 상단 높이
	@parameter		$footerHeight   : 제외될 하단 높이
*/
	function trpFillLimitedFn($container, $image, $targetWidth, $targetHeight, $triggerWidth, $triggerHeight, $hearderHeight, $footerHeight ){
		var _sw =  $triggerWidth; 				// window.innerWidth;
		var _sh =  $triggerHeight; 				// window.innerHeight;
		var header_height = $hearderHeight; 	// 0;
		var footer_height = $footerHeight;  	// 0;        
		var imgWidth = $targetWidth; 			// 1280;
		var imgHeight = $targetHeight; 			// 720;
        var _ratio = 1- ( (header_height + footer_height)/ imgHeight );                   // 비율
		var mask_width = $($container).width();
		var mask_height = _sh - header_height - footer_height;
		var imgElement = $($image);
		var imgW = Math.floor((imgWidth*_ratio) * mask_height / ( imgHeight- (header_height + footer_height) )) ;
		var imgH = Math.floor(mask_height);
                
		if(imgW < mask_width){ 
			var imgW = Math.floor(mask_width);
			var imgH = Math.floor(imgHeight * mask_width / imgWidth);
		}

		var marginTop  = Math.floor(mask_height/2 - imgH/2);
		var marginLeft = Math.floor(mask_width/2 - imgW/2);
		if(imgElement){
			imgElement.css({"margin-top":marginTop, "margin-left":marginLeft, width:imgW, height:imgH });
		}
		$($container).css({"height":(mask_height),"margin-top":header_height, "margin-bottom":footer_height });
	}
	/*
	$(window).resize(function(){
		trpFillLimitedFn($(".contents-inner .section.visual"), $(".contents-inner .section.visual>img") );
})
*/



