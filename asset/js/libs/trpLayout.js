/*
 * Base			    : jQuery JavaScript Library v1.12.1
 * trPackage	  :   
 * trpLayout	  : v0.22
 * release date : 2022.03.22
 * author	      : http://turfrain.tistory.com/
 * Copyright 2020. turfrain all rights reserved.
 *
 */




/**
* trpScrollSync             : 스크롤 움직임에 따라 타겟 높이 값을 변경하여 따라다니게 한다.
* @option	maxWidth   		  : 컨테이너 넓이                (기본값 : 윈도우 넓이)
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
      maxWidth   : window.innerWidth,      // 컨테이너 넓이
      positionTar : _this  ,               //  타겟 선택자  
      widthTar    : _this.width  ,         // 스크롤 타켓 넓이
      heightTar   : _this.height  ,        // 타켓 높이값  
      showHeight  : wH  ,                  // 타켓 상단으로 부터 보여질 위치
      bottonTar   : 50  ,                  // 타겟 하단으로 부터 여백 
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
        $(".scroll_top").fadeIn();
    }
    
    // scroll top botton hold
    //console.log( wH, docH, _bottomStop);
    if( (winST + wH)  > (docH - _bottomStop) ){
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



/**  trpScrollActiveFn	       : 스크롤에따라 컨텐츠 도달하면 (ms_active)클래스 추가 */
function trpScrollActiveFn() { 
var _wH  = window.innerHeight; 
var _wS  = $(window).scrollTop();
var _wHS = (_wH + _wS);
$('.js-msitem').each(function($i) { 			
  var _t  = $(this).offset().top +  (_wH * .2); 
  var _th = $(this).offset().top + $(this).innerHeight(); 
  if (_wS > _th) { 
      $(this).removeClass("ms_active");     // pass 
  } else if (_wHS > _t) { 
      $(this).addClass("ms_active");        // over
  } else {
      $(this).removeClass("ms_active");     // under
  } 	
}); 
}
//$(window).on('scroll resize', scroll_motionActive);
//$(window).trigger('scroll resize');







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
