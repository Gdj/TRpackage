/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpUnit    : v0.1
 * release date : 2019.12.12
 * author		: http://turfrain.tistory.com/
 * Copyright 2019. turfrain all rights reserved.
 *
 */



(function($) {

/*  maxTri:640, minTri:320, maxTar:360,  minTar:180
*	trpRatioSize : 비레에 맞게 크기를 반환함
*   @options 	maxTri : 참조되는 타겟의 최대값  Tri Max W
*   @options 	minTri : 참조되는 타겟의 최소값  Tri Min W
*   @options 	maxTar : 변경될 타겟의 최대값	Tra Max H
*   @options 	minTar : 변경될 타겟의 최소값	Tra Min H
*   @options 	property : 변경될 속성값
*/
  $.fn.trpRatioSize = function(options) {

// Establish default settings/variables
// ====================================
  var settings = $.extend({        
      maxTri    : 9999,       // trigger
  minTri    : 1,					
      maxTar    : 9999,       // target
  minTar    : 1,					
      property  : "height"
  }, options),

// Do the magic math
// =================
    changes = function(el) {
      var $el		= $(el),
        elw		= $el.width(),
        width	= elw > settings.maxTri ? settings.maxTri : elw < settings.minTri ? settings.minTri : elw,
        size	= rangeRatio(settings.minTri, settings.maxTri, width, settings.minTar, settings.maxTar );
      $el.css( settings.property , size + 'px');		    
    },


    rangeRatio = function($rMin, $rMax, $rTar, $tMin, $tMax ){	
      var rMin 	= 0;					// Refer 참고 최소 값		
      var rMax	= $rMax - $rMin;		// Refer 참고 최대 값	
      var rTar 	= $rTar - $rMin;		// Refer 참고 변화 값
      var rPer;							// Refer 참고 변화 퍼센트
      var tMin 	= 0;					// target타겟 최소값
      var tMax	= $tMax - $tMin;		// target타겟 최대값 

      //rPer = Math.abs(rTar) / rMax  // 퍼센테지	== 100% => 1.0
      rPer = rTar / rMax				// 퍼센테지	== 100% => 1.0

      return (tMax * rPer)+ $tMin;	// 참고 비례 타겟값
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




  /* 
    trpNewsRolling							: 뉴스 롤링
    @param 	  $time  : rolling Tem 롤릴 지연시간 (default:3000)
*   @method 	next : 다음 슬라이드
*   @method 	prev : 이전 슬라이드
*   @method 	play : 플레이 시작 (timer start)
*   @method 	stop : 플레이 멈춤 (timer stop)
  */
  $.fn.trpNewsRolling = function($time) { 
    var _setInte="";
    var _height = $("li", this).height();
    var _this = this;
    var _time   = ( $time )?_tarPopup=$tarPopup : _tarPopup=3000 ;

    function play(){ 
      if(_setInte){return};                 
      next(); 
      _setInte = setInterval(function(){ next();}, 3000);
    }
    function stop(){  
      if( _setInte ){ 
        clearInterval(_setInte);
        _setInte=null;
      }
    }
    function next(){ 
      $(".trp-news-list", _this).stop().animate({"top":"-"+_height+"px"},"normal", function(){
        $(".trp-news-list", _this).css("top","0");
        $(".trp-news-list", _this).append( $(".trp-news-list li:first" , _this) );
      });
    }
    function prev(){
      $(".trp-news-list", _this).css("top","-"+_height+"px");
      $(".trp-news-list", _this).prepend( $(".trp-news-list li:last", _this) );
      $(".trp-news-list", _this).stop().animate({"top":0 },"normal", function(){});
    }
    play();

    return {
      next: function($index) {
        if(!$(".trp-news-list").is(":animated")) { next() };
      },
      prev: function($index) {
        if(!$(".trp-news-list").is(":animated")) { prev() };
      }, 
      play: function($index) {
        play();
      }, 
      stop: function($index) {
        stop();
      },

    }

  };

  
  
  
  
}(jQuery));
