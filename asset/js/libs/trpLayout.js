/*
 * Base			    : jQuery JavaScript Library v1.12.1
 * trPackage	  :   
 * trpLayout	  : v0.24
 * release date : 2022.07.11
 * author	      : http://turfrain.tistory.com/
 * Copyright 2020. turfrain all rights reserved.
 *
 */




/**
* trpScrollSync           : 스크롤 움직임에 따라 타겟 높이 값을 변경하여 따라다니게 한다.
* @option	positionTar		  : 적용할 타겟 선택자            (기본값 : this)
* @option	widthTar			  : 적용할 타켓 넓이값            (기본값 : this.width)
* @option	heightTar			  : 적용할 타켓 높이값            (기본값 : this.height)
* @option	showHeight			: 적용할 타켓 상단으로 부터 보여질 위치  (기본값 : window.height)
* @option	bottonTar		    : 적용할 타겟 하단으로 부터 여백         (기본값 : 50)
* @option	bottomStop		  : 적용할 타겟 하단기준 멈춰야할 위치 (기본값 : 100)
*/
jQuery.fn.trpScrollSync = function( options ){
  var _this = this;
  var wH    = $(window).height();
  var winST = $(window).scrollTop();
  var docH  = $(document).height();
  var settings = {
      positionTar : _this  ,               // 타겟 선택자  
      widthTar    : _this.width  ,         // 스크롤 타켓 넓이
      heightTar   : _this.height  ,        // 스크롤 타켓 높이값  
      showHeight  : wH  ,                  // 타켓 상단으로 부터 보여질 위치
      bottonTar   : 0  ,                   // 타겟 하단으로 부터 여백 
      bottomStop  : 100 ,                  // 타겟 하단기준 멈춰야할 위치
  };
  settings = jQuery.extend(settings, options || {});
  
  var _bottomSpace = (settings.bottonTar + settings.heightTar);   // 스크롤 시 하단 간격 + 타겟높이
  var _bottomStop  = (settings.bottomStop - settings.bottonTar);  // 멈출 위치 
  
  $(window).on("scroll resize", function($e){
    scrollResizeSyncWatch();
  });
  function scrollResizeSyncWatch(){
    wH    = $(window).height();
    winST = $(window).scrollTop();
    docH  = $(document).height();
    
    // scroll_top view
    if( winST < settings.showHeight ){   // winST < wH
        $(settings.positionTar).fadeOut();
    } else {
        $(settings.positionTar).fadeIn();
    }
    
    // scroll top botton hold
    //console.log( wH, docH, _bottomStop);
    if( (winST + wH)  > (docH - _bottomStop) ){ 
      //console.log( "바닥")
      var temp1 = (docH - _bottomStop - _bottomSpace);
      $(settings.positionTar).css({ position: 'absolute', top : "auto" , bottom: settings.bottomStop });
      $(settings.positionTar).css({ left: "auto" });
    } else {
      var temp2 = (wH - _bottomSpace) + winST;
      $(settings.positionTar).css({ position: 'fixed', top : "auto" , bottom: settings.bottonTar });

      // width hold
      var _left = settings.maxWidth - _this.width() - ( $(window).scrollLeft() );
      console.log(_left);
      if(  window.innerWidth  < settings.maxWidth ){
        $(settings.positionTar).css({ left: _left });
      }else {
        $(settings.positionTar).css({ left: "auto" });
      }
    }

  }
  scrollResizeSyncWatch();

  return {
    setWidthTar : function($num){
      settings.widthTar = $num;
    },
    setHeightTar : function($num){
      settings.heightTar = $num;
    },
    setShowHeight : function($num){
      settings.showHeight = $num;
    },
    setBottonTar : function($num){
      settings.bottonTar = $num;
    },
    setBottomStop : function($num){
      settings.bottomStop = $num;
    },
  }

}





/**
* trpScrollSyncTop           : 스크롤 움직임에 따라 타겟 높이 값을 변경하여 따라다니게 한다.
* @option	positionTar		  : 적용할 타겟 선택자            (기본값 : this)
* @option	maxWidth   		  : 컨테이너 넓이                 (기본값 : 윈도우 넓이)
* @option	widthTar			  : 적용할 타켓 넓이값            (기본값 : this.width)
* @option	heightTar			  : 적용할 타켓 높이값            (기본값 : this.height)
* @option	topStart  			: 타켓 상단으로 부터 시작할 위치(기본값 : window.height)
* @option	topMagin  			: 타겟 상단으로 부터 여백       (기본값 : 0)
* @option	bottomStop		  : 적용할 타겟 하단기준 멈춰야할 위치 (기본값 : 100)
*/
jQuery.fn.trpScrollSyncTop = function( options ){
  var _this = this;
  var wH    = $(window).height();
  var winST = $(window).scrollTop();
  var docH  = $(document).height();
  var _getPositon = {
    top: 0, 
    bottom : 0,
  };
  var settings = {
      positionTar : _this  ,               // 타겟 선택자  
      maxWidth    : window.innerWidth,     // 컨테이너 넓이
      widthTar    : $(_this).width()  ,    // 스크롤 타켓 넓이
      heightTar   : $(_this).height()  ,   // 스크롤 타켓 높이값  
      topStart    : wH  ,                  // 타켓 상단으로 부터 시작할 위치
      topMagin    : 0 ,                    // 타겟 상단으로 부터 여백 
      bottomStop  : 300 ,                  // 타겟 하단기준 멈춰야할 위치
  };
  settings = jQuery.extend(settings, options || {});
     
    
  var _stop_switch = true;
  var _stop_h = 0;
  $(window).on("scroll resize", function($e){
    scrollResizeSyncWatch();
  
  });
  function scrollResizeSyncWatch(){
    ///console.log($(_this).height())
    var _bottomStop  = (settings.bottomStop - settings.bottonTar);  // 멈출 위치 
    wH    = $(window).height();
    winST = $(window).scrollTop();
    docH  = $(document).height();
    
    // scroll_top view
    if( winST < settings.topStart ){   // winST < wH
      $(settings.positionTar).removeClass("hold_start");
      $(settings.positionTar).css({ position: 'relative', top: "auto", bottom: "auto"  });
    } else {
      $(settings.positionTar).addClass("hold_start");
      $(settings.positionTar).css({ position: 'fixed', top: settings.topMagin,  bottom: "auto"});
      _getPositon.top = settings.topMagin;   
    }
    
    
    // scroll top botton hold    
    /* 컨텐츠 하단까지 길이 > (도듀먼트에서 하단높이) */
    if( (winST + settings.heightTar + settings.topMagin)  > (docH - _bottomStop) ){ 
      _stop_h = (docH - _bottomStop ) - (settings.topStart + settings.topMagin + settings.heightTar);
      
      $(settings.positionTar).css({ position: 'absolute', top : (_stop_h) , bottom:  "auto" });
      $(settings.positionTar).css({ left: "auto" });
      $(settings.positionTar).addClass("hold_stop");
      _getPositon.top = _stop_h;   
    } else {
      $(settings.positionTar).removeClass("hold_stop");
      _stop_switch = true;
    } 

  }
  scrollResizeSyncWatch();

  return {
    setMaxWidth : function($num){
      settings.maxWidth = $num;
    },
    setWidthTar : function($num){
      settings.widthTar = $num;
    },
    setHeightTar : function($num){
      settings.heightTar = $num;
    },
    setTopStart : function($num){
      settings.topStart = $num;
    },
    settopMagin : function($num){
      settings.topMagin = $num;
    },
    setBottomStop : function($num){
      settings.bottomStop = $num;
    },
    getPosition : function(){
      return _getPositon;
    },
  }

}





/**
* trpScrollPositionClass     : 스크롤타겟위치에서 타겟클래스변경
* @param	$scrollTar			 : 기준 타겟 위치 선택자
* @param	$scrollTarModi	 : 기준 타겟 위치 가감 수치
* @param	$addTar				   : 적용 타겟 선택자
* @param	$addTarClass	   : 적용 타겟 class 이름
*/
jQuery.fn.trpScrollPositionClass = function($scrollTar, $scrollTarModi, $addTar, $addTarClass) {
  var _scrolTar = $(this);
  var _scrolWin = _scrolTar.scrollTop();
  var _scrolTag = 0;
  var _only = "defaul"; // over, under
  
  // 선텍자 체크
  if( $scrollTar != "" && $($scrollTar).length > 0  ){ _scrolTag = $($scrollTar).offset().top;  }  
  
  // 숫자 체크
  if( isNaN($scrollTarModi) == false)    { _scrolTag = _scrolTag + ($scrollTarModi); }  
  
  $(window).on("scroll resize", function($e){
      scrollResizeClassWatch()
  });
  function scrollResizeClassWatch(){
    _scrolWin = _scrolTar.scrollTop();
    if (_scrolWin >= _scrolTag) {
        if (_only != "over") { $($addTar).addClass($addTarClass); }
        _only = "over";
    } else {
        if (_only != "under") { $($addTar).removeClass($addTarClass); }
        _only = "under";
    }
  }
  scrollResizeClassWatch();
};











/**
* trpScrollPositionWindowClass    : 스크롤타겟위치에서 윈도우높이 절반 타겟클래스변경
* @param	$scrollTar			        : 기준 타겟 위치 선택자
* @param	$scrollTarModi		      : 기준 타겟 위치 가감 수치
* @param	$addTar				          : 적용 타겟 선택자
* @param	$addTarClass		        : 적용 타겟 class 이름
*/
jQuery.fn.trpScrollPositionWindowClass = function($scrollTar, $scrollTarModi, $addTar, $addTarClass) {
var _scrolWin = $(window).scrollTop();
var _scrolTag = 0;
var _only = "defaul"; // over, under

// 선텍자 체크
if( $scrollTar != "" && $($scrollTar).length > 0  ){ _scrolTag = $($scrollTar).offset().top;  }  

// 숫자 체크
if( isNaN($scrollTarModi) == false)    { 
    _scrolTag = _scrolTag + ( $(window).height() / 2 ) + ($scrollTarModi); 
}  

$(window).on("scroll resize", function($e){
    scrollResizeClassWatch()
});
function scrollResizeClassWatch(){
    _scrolWin = $(window).scrollTop();
    if (_scrolWin >= _scrolTag) {
        if (_only != "over") { $($addTar).addClass($addTarClass); }
        _only = "over";
    } else {
        if (_only != "under") { $($addTar).removeClass($addTarClass); }
        _only = "under";
    }
}
scrollResizeClassWatch();

};


/** 
* @param	$motion_items      : 모션 들어갈 아이템 선택자
* @param	$add_class         : 추가 삭제될 클래스 
* @param	$show_per          : 시작위치  (0: 보일때, .2: 20% 올라왔을때)
* @method setTarModi($tarModi) : 가감수치 변경
*/
jQuery.fn.trpScrollActive = function( $add_class, $show_per ){
  var _tarGet   = this
  var _addClass = $add_class;
  var _show_per = $show_per;
  var _scrollTarModi = 0;
  function trpScrollActiveFn() { 
    var _wH  = window.innerHeight; 
    var _wS  = $(window).scrollTop();
    var _wHS = (_wH + _wS);
    $(_tarGet).each(function($i) { 			
      var _t  = ($(this).offset().top + _scrollTarModi) +  (_wH * _show_per); 
      var _th = ($(this).offset().top + _scrollTarModi) + $(this).innerHeight(); 
      if (_wS > _th) { 
          $(this).removeClass(_addClass);     // pass 
      } else if (_wHS > _t) { 
          $(this).addClass(_addClass);        // over
      } else {
          $(this).removeClass(_addClass);     // under
      } 	
    }); 
  }
  $(window).on('scroll resize', trpScrollActiveFn);
  $(window).trigger('scroll resize');


  return {
    /* 기준 타겟 위치 가감 수치 변경 */
    setTarModi : function($tarModi){
      _scrollTarModi = $tarModi;
    }
  }
}



/** 
* @param	$motion_items      : 모션 들어갈 아이템 선택자
* @param	$add_class         : 추가 삭제될 클래스 
* @param	$show_per          : 시작위치  (0: 보일때, .2: 20% 올라왔을때)
* @method setTarModi($tarModi) : 가감수치 변경
*/
jQuery.fn.trpScrollActivePer = function( $add_class, $show_per ){
  var _tarGet   = this
  var _addClass = $add_class;
  var _show_per = $show_per;
  var _scrollTarModi = 0;
  function trpScrollActiveFn() { 
    var _wH  = window.innerHeight; 
    var _wS  = $(window).scrollTop();
    var _wHS = (_wH + _wS);
    
    $(_tarGet).each(function($i) { 			
      var _tarT    = $(this).offset().top;                              // 타겟 위치
      var _tarTmd  = ( _tarT + _scrollTarModi) +  (_wH * _show_per);    // 타겟 가감위치
      var _th      = ( _tarT + _scrollTarModi) + $(this).innerHeight(); // 타겟 끝
      var _th_full = ( _th + _wH );                                     // 타겟 + 브라우져 끝

      if (_wS > _th) {                         // pass 
        $(this).removeClass(_addClass);    
        $(this).attr("data-per",  100 );
      } else if (_wHS > _tarTmd) {             // over
        var _per = trpRangeRatioFn(_tarTmd , _th_full, _wHS, 0, 100 );
        $(this).addClass(_addClass);       
        $(this).attr("data-per",  _per );
      } else {                                 // under
        $(this).removeClass(_addClass);    
        $(this).attr("data-per",  0 );
      } 	

      /* 변화 있을때 만 이벤트 발생 */
      if( $(this).data("oldper") !=  $(this).attr("data-per") ){
        $(this).trigger('data-per-changed');
        $(this).data("oldper", $(this).attr("data-per") )
      }

    }); 
  }
  $(window).on('scroll resize', trpScrollActiveFn);
  $(window).trigger('scroll resize');

  function trpRangeRatioFn($rMin, $rMax, $ref, $tMin, $tMax ){

    var rMin 	= 0;					// Refer 참고 최소 값		
    var rMax	= $rMax - $rMin;		// Refer 참고 최대 값	
    var ref 	= $ref  - $rMin;		// Refer 참고 변화 값
    var rPer;							// Refer 참고 변화 퍼센트
    var tMin 	= 0;					// target타겟 최소값
    var tMax	= $tMax - $tMin;		// target타겟 최대값 
    
    //rPer = Math.abs(rTar) / rMax  // 퍼센테지	== 100% => 1.0
    rPer = ref / rMax				// 퍼센테지	== 100% => 1.0
          
    return (tMax * rPer)+ $tMin;	// 참고 비례 타겟값
  }
  


  return {
    /* 기준 타겟 위치 가감 수치 변경 */
    setTarModi : function($tarModi){
      _scrollTarModi = $tarModi;
    }
  }
}





/**
* trpScrollPositionFn            : 스크롤타겟위치에서 타겟클래스변경
* @param	$scrollTar	           : 기준 타겟 위치 선택자
* @param	$scrollTarModi	       : 기준 타겟 위치 가감 수치
* @param	$function              : ( over:true | under:false )	: 함수
* @method setTarModi(가감수치)   : 타겟 가감 수치 변경
*/
jQuery.fn.trpScrollPositionFn = function($scrollTar, $scrollTarModi, $functionChange) {
var _scrolTar = $(this);
var _scrollTarModi = $scrollTarModi;
var _scrolWin = _scrolTar.scrollTop();
var _scrolTag = 0;
var _only  = "defaul"; // over, under  : over:true | under:false

// 선텍자 체크
if( $scrollTar != "" && $($scrollTar).length > 0  ){ _scrolTag = $($scrollTar).offset().top;  }  

// 숫자 체크
if( isNaN(_scrollTarModi) == false)    { _scrolTag = _scrolTag + (_scrollTarModi); }  

$(window).on("scroll resize", function($e){
  scrollResizeClassWatch()
});
function scrollResizeClassWatch(){
  if( $scrollTar != "" && $($scrollTar).length == 0  ){ return false }  
  if( isNaN(_scrollTarModi) == false) { _scrolTag = $($scrollTar).offset().top + (_scrollTarModi); }  
  _scrolWin = _scrolTar.scrollTop();
  if (_scrolWin >= _scrolTag) {
      if (_only != "over") { $functionChange(true) }
      _only = "over";
  } else {
      if (_only != "under") { $functionChange(false); }
      _only = "under";
  }
}
scrollResizeClassWatch();

return {
  /* 기준 타겟 위치 가감 수치 변경 */
  setTarModi : function($tarModi){
    _scrollTarModi = $tarModi;
  }
}
};






/*
* trpColH         : 같은 col 아이템 높이를 같게
* @param	$col	  : col 아이템 겟수
*/
jQuery.fn.trpColH = function( $col ){
var _arr = [], _arr_temps = [], _arr_col=[];
var _items  = $(this);
var _colNum = $col;
var _max_temp = [];

function each_set(){
  _items.css({ "min-height": "auto"});
  if(_colNum == 1){ return; }

  _arr_temps = [];
  _max_temp  = [];
  _items.each( function($i){
    _arr_temps.push( $(this).height() );
    $(this).css({ "min-height": 0 });
    if( ($i+1) % _colNum != 0 ){          // 줄에 첫번째부터 마지막전
      _arr.push( $(this).height() );
      _arr_col.push( $(this) );
     if ( $i+1 == _items.length ){        // 마지막줄 마지막 아이템
        _max_temp.push(height_max(_arr_col, _arr));
        _arr = []; _arr_col=[];
      }
    }else{	                           // 줄에 마지막 아이템			
      _arr.push( $(this).height() );
      _arr_col.push( $(this) );
      _max_temp.push(height_max(_arr_col, _arr));
      _arr = []; _arr_col=[];
    }
    
  });

  //$(".js-text1").text(_arr_temps);
  return _arr_temps;
};


function height_max($coltimes, $arr){
  var _max = Math.max.apply(null, $arr);
  for( var i=0; i < $coltimes.length ; i++){
    $coltimes[i].css({ "min-height":  (Math.round(_max)) });
  }
  return _max;
}
each_set();

return {
  setCol: function($col) { 
    _colNum = $col;
    each_set();
  }, 
  getHeight : function(){
    return each_set();
  }, getMaxHeight : function(){
    return _max_temp;
  } 
}

};

/*
* trpColItemH       : 같은 col 아이템 높이를 같게
* @param	$col		  : col 아이템 겟수
* @param	$tra		  : col 최소크기 참조      _trackings
* @param	$tar		  : col 최소크기가 적용타겟 _targets
*/
jQuery.fn.trpColItemH = function( $col , $tra, $tar ){
var _arr = [], _arr_temps = [], _arr_col=[];
var _items     = $(this);  
var _target    = $(this);
var _colNum    = $col;
var _max_temp  = [];
if ($tar != undefined ){ _target   = $($tar , this) }; 


function each_set(){
  _target.css({ "min-height": "auto"});
  if(_colNum == 1){ return; }
  _arr_temps = [];
  _max_temp  = [];
  _arr = []; _arr_col=[];
  
  _items.each( function($i){      
    var _trackings = $(this);
    var _targets   = $(this);
    if ($tra != undefined ){ _trackings = $($tra , this) }; 
    if ($tar != undefined ){ _targets   = $($tar , this) }; 
    
    _arr_temps.push( _trackings.height() );
    _targets.css({ "min-height": 0 });
      
    if( ($i+1) % _colNum != 0 ){          // 줄에 첫번째부터 마지막전
      _arr.push( _trackings.height() );
      _arr_col.push( _targets );
      if ( $i+1 == _items.length ){       // 마지막줄 마지막 아이템
        _max_temp.push(height_max(_arr_col, _arr));
        _arr = []; _arr_col=[];
      }
    }else{                                // 줄에 마지막 아이템
      _arr.push( _trackings.height() );   
      _arr_col.push( _targets );
      _max_temp.push(height_max(_arr_col, _arr));
      _arr = []; _arr_col=[];
    }
    
  });

  //$(".js-text1").text(_arr_temps);
  return _arr_temps;
};


function height_max($colTargets, $arr){
  var _max = Math.max.apply(null, $arr);
  for( var i=0; i < $colTargets.length ; i++){
    $colTargets[i].css({ "min-height":  (Math.round(_max)) });
  }
  return _max;
}
each_set();

return {
  setCol: function($col) { 
    _colNum = $col;
    each_set();
  }, 
  getHeight : function(){
    return each_set();
  }, getMaxHeight : function(){
    return _max_temp;
  } 
}

};

/*
* trpColTimeHW       : 같은 col 아이템 높이를 같게 및 컬럼 Width % 조정
* @param	$col       : col 아이템 겟수
*/
jQuery.fn.trpColItemHW = function( $col ){
var _arr = [], _arr_temps = [], _arr_col=[], _col_w="";
var _items  = $(this);
var _colNum = $col;

function each_set(){
  _col_w = (100 / _colNum) + "%"; 
  _items.css({ "min-height": 0, "width":_col_w });
  
  _arr_temps = [];
  _items.each( function($i){
    _arr_temps.push( $(this).height() );
    $(this).css({ "min-height": 0 });
    if( $i % _colNum == 0 ){
      height_max(_arr_col, _arr);
      _arr = []; _arr_col=[];
      _arr.push( $(this).height() );
      _arr_col.push( $(this) );
    }else{				
      _arr.push( $(this).height() );
      _arr_col.push( $(this) );
    }
  });
  
  $(".js-text1").text(_arr_temps);
};


function height_max($coltimes, $arr){
  var _max = Math.max.apply(null, $arr);
  for( var i=0; i < $coltimes.length ; i++){
    $coltimes[i].css({ "min-height":  (Math.round(_max)) });
  }
}
each_set();

return {
  setCol: function($col) { 
    _colNum = $col;
    each_set();
  }
}
};
