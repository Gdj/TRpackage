/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpUnit    : v0.1
 * release date : 2021.10.29
 * author		: http://turfrain.tistory.com/
 * Copyright 2021. turfrain all rights reserved.
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
  * @method 	next : 다음 슬라이드
  * @method 	prev : 이전 슬라이드
  * @method 	play : 플레이 시작 (timer start)
  * @method 	stop : 플레이 멈춤 (timer stop)
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

  
  /* 
    trpCounter							              : 총값 안에서 루프 카운트를 한디.
    @param 	  $total                      : rolling Tem 롤릴 지연시간 (default:3000)
    @param 	  $callFn($total, $index)    : 콜백 
  * @method 	next  : 다음 
  * @method 	nrev  : 이전 
  * @method 	setIndex : 인덱스 위치로 가기
  * @method 	getTC    : .total, .index 리턴
  */
  $.fn.trpCounter = function($total, $callFn){
    var _total    = $total;   // 총 
    var _index    = 0;        // 시작
    var _countItem = new Object();
    if( _total <= _index ){ console.log("Error") } 
    
    var _count    = 0;
    function nextFn(){
      _count += 1; 
      if( _count >= _total ){ _count = 0; }
      activeFn(_count);
    }
    function prevFn(){
      _count -= 1; 
      if( _count < 0 ){ _count = _total-1; }
      activeFn(_count);
    }
    function activeFn($index){
      _index = _count = $index;
      $callFn(_index);
    }
    return {
      prev: function() { prevFn(); },
      next: function() { nextFn(); }, 
      setIndex: function($index) { activeFn($index); },
      getTC: function() {
        _countItem.total = _total;
        _countItem.index = _index;
        return _countItem; 
      }
    }

  }



  /* 
  *  trpTimeProgress               : 시간을 분율로 바꾸어준다. 
  *  @param   $options             : 설정 옴션 (setInterval, )
  *  @param   $fractionCall($per)  : call back 함수(프로그레스)
  *  @method 	play                 : 플레이 시작     (timer start)
  *  @method 	stop                 : 플레이 초기화   (timer stop)
  *  @method 	pause                : 플레이 일시멈춤 (timer pause)
  */
  $.fn.trpTimeProgress = function($options, $fractionCall){
    var settings = $.extend({ 
      interval     : 5000,
      call         : 100
    }, $options);

    var _this        = this;   // 현컨텐츠
    var _setTimer    = "";     // 타이머
    var _setInterval = settings.interval   //5000;   // 카운트 인터벌
    var _setCall     = settings.call       //100;    // 율 인터벌
    var _setProgress = 0; 
     
    function trpTimer_start(){
      if(_setTimer == "") {
        _setTimer =  setInterval(trpActive, _setCall);
      }
    }
    function trpTimer_pause(){
      console.log("trpTimer_pause");
      if(_setTimer != null) {
        clearInterval(_setTimer);
        _setTimer = "";
      }
    }
    function trpTimer_stop(){
      console.log("trpTimer_stop");
      if(_setTimer != null) {
        clearInterval(_setTimer);
        _setTimer = "";
        _setProgress = 0;
        $fractionCall(_setProgress);
      }
    }
		function trpActive(){
      _setProgress += (_setCall/_setInterval) * 100;  // 100%; 
      if( _setProgress >= 100){
        _setProgress = 100;
        trpTimer_stop();	
        trpTimer_end();
        $fractionCall(_setProgress);
      }
      $fractionCall(_setProgress);
    }
    function trpTimer_end(){
      $(_this).trigger("event_trpTimer_end");
    }
    $(_this).on("event_trpTimer_end", function(event) {
      console.log("========= >><< end Call in");
    });

    return {
      play: function() {
        trpTimer_start();
      }, 
      pause: function() {
        trpTimer_pause();
      }, 
      stop: function() {
        trpTimer_stop();
      }
    }

  }
  
  
  
}(jQuery));
