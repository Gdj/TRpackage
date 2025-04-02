/*
 * Base			    : jQuery JavaScript Library v1.12.1
 * trPackage	  :   
 * trpLayout	  : v0.27
 * release date : 2025.04.01
 * author	      : http://turfrain.tistory.com/
 * Copyright 2025. turfrain all rights reserved.
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
      bottomTar   : 0  ,                   // 타겟 하단으로 부터 여백 
      bottomStop  : 100 ,                  // 타겟 하단기준 멈춰야할 위치
  };
  settings = jQuery.extend(settings, options || {});
  
  var _bottomSpace = (settings.bottomTar + settings.heightTar);   // 스크롤 시 하단 간격 + 타겟높이
  var _bottomStop  = (settings.bottomStop - settings.bottomTar);  // 멈출 위치 
  
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
      $(settings.positionTar).css({ position: 'fixed', top : "auto" , bottom: settings.bottomTar });

      // width hold
      var _left = settings.maxWidth - _this.width() - ( $(window).scrollLeft() );
      
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
    setBottomTar : function($num){
      settings.bottomTar = $num;
    },
    setBottomStop : function($num){
      settings.bottomStop = $num;
      _bottomStop  = (settings.bottomStop - settings.bottomTar); 
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
      widthTar    : $(_this).innerWidth()  ,    // 스크롤 타켓 넓이
      heightTar   : $(_this).innerHeight() ,    // 스크롤 타켓 높이값  
      topStart    : wH  ,                  // 타켓 상단으로 부터 시작할 위치
      topMagin    : 0 ,                    // 타겟 상단으로 부터 여백 
      topGap      : 0 ,                    // hold 되는 위치컨테이너와의 차이
      bottomStop  : 300 ,                  // 타겟 하단기준 멈춰야할 위치
      bottomTar   : 0  ,                   // 타겟 하단으로 부터 여백 
  };
  settings = jQuery.extend(settings, options || {});
    
  var _stop_switch = true;
  var _stop_h = 0;
  $(window).on("scroll resize", function($e){
    scrollResizeSyncWatch();
  });
  function scrollResizeSyncWatch(){
    ///console.log($(_this).height())
    var _bottomStop  = (settings.bottomStop - settings.bottomTar);  // 멈출 위치 
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
      _stop_h = docH - (_bottomStop + settings.heightTar + settings.topMagin ) + settings.topGap;
      
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
    settopGap : function($num){
      settings.topGap = $num;
    },
    setBottomTar : function($num){
      settings.bottomTar = $num;
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
* trpScrollPositionClass   : 스크롤타겟위치에서 타겟클래스변경
* @param	$scrollTar			 : 기준 타겟 위치 선택자
* @param	$show_per	       : 컨테이너 크기대비 보여질 위치 (.5)
* @param	$addTar				   : 적용 타겟 선택자
* @param	$addTarClass	   : 적용 타겟 class 이름
* @method setTarModi       : 기준 타겟 위치 가감 수치(px)
*/
jQuery.fn.trpScrollPositionClass = function($scrollTar, $show_per, $addTarClass, $instantB ) {
  var _wrap = this;
  var _scrollTarModi = 0; 
  var instantB = $instantB ? true : false;
  // 선텍자 체크
  if( $scrollTar != "" && $($scrollTar).length > 0  ){ _scrolTag = $($scrollTar).offset().top;  }  
  
  // 숫자 체크
  if( isNaN($show_per) == false)    { _scrolTag = _scrolTag + ($show_per); }  
  
  $(_wrap).on("scroll resize", function($e){
    scrollResizeClassWatch();
  });
  function scrollResizeClassWatch(){
    var _wrapH = _wrap.innerHeight();
    var _wrapT = _wrap.scrollTop();
    $($scrollTar).each(function() {
      var _t = $(this).offset().top + (_wrapH * $show_per) - _scrollTarModi;
      //console.log("targ: " , _wrapT, _wrapH,  _t) 
      if ( (_wrapT) >= _t) {
        $(this).addClass($addTarClass);
      } else {
        if(instantB){
          $(this).removeClass($addTarClass);
        }else if($(this).offset().top - _wrapH >= _wrapT){
          $(this).removeClass($addTarClass);
          console.log("여기")
        }
      }
    })
  }
  scrollResizeClassWatch();
  
  return {
    /* 기준 타겟 위치 가감 수치 변경 */
    setTarModi : function($tarModi){
      _scrollTarModi = $tarModi;
    }
  }
};




/** 
* @param	$motion_items         : 모션 들어갈 아이템 선택자
* @param	$add_class            : 추가 삭제될 클래스 
* @param	$show_per             : 시작위치  (0: 보일때, .2: 20% 올라왔을때)
* @param	$under_b              : 못미쳤을때 초기화 여부 (default:false)
* @param	$pass_b               : 지나갔을때 초기화 여부 (default:false)
* @method setTarModi($tarModi)  : 가감수치 변경
*/
jQuery.fn.trpScrollActive = function( $add_class, $show_per, $under_b, $pass_b ){
  var _tarGet   = this
  var _addClass = $add_class;
  var _show_per = $show_per;
  var _scrollTarModi = 0;
  var _under_b = ($under_b)? $under_b : false;
  var _pass_b  = ($pass_b)? $pass_b : false;
  var _last_scrollTop = 0; 
 

  function scrollActiveFn() { 
    var _wH  = window.innerHeight; 
    var _wS  = $(window).scrollTop();
    var _wHS = (_wH + _wS);
    var _sdB = true;
    /* ------------------------------- scroll up & down */
    var _tmp =  _wS;            //$(this).scrollTop();
    if (_tmp >= _last_scrollTop) { console.log(">>>>>>>>>>>>>>>>> down");
      _sdB = true;
    } else {                       console.log(">>>>>>>>>>>>>>>>> up");
      _sdB = false;
    }
    _last_scrollTop = _tmp;
    /* -------------------------------  */

    
    $(_tarGet).each(function($i) { 			
      var _t  = ($(this).offset().top + _scrollTarModi) +  (_wH * _show_per);    // 이벤트 시작
      var _ts = ($(this).offset().top + _scrollTarModi) +  (_wH * 0);            // 보이기 시작
      var _th = ($(this).offset().top + _scrollTarModi) + $(this).innerHeight(); // pass
     
      if (_wS >= _th) { 
        if(_pass_b){
          $(this).removeClass(_addClass); 
        }else{
          $(this).addClass(_addClass);
        }                                                  // pass
      } else if (_wHS >= _t) { 
        $(this).addClass(_addClass);                       // over
      } else {                                             // under
        if(_under_b){ 
          $(this).removeClass(_addClass); 
        }    
      } 	

      /* show & pass */
      $(this).removeClass("show pass under"); 
      if (_wS >= _th) {                                     // pass
        $(this).attr("state", "pass");
      } else if (_wHS >= _ts) {                             // show
        $(this).attr("state", "show");

        if(!_sdB &&  $(this).hasClass(_addClass) ){
          $(this).addClass(_addClass);
        }
      } else {
        $(this).attr("state", "under");

        $(this).removeClass(_addClass); 
      }

    }); 
  }
  $(window).on('scroll resize', scrollActiveFn);
  $(window).trigger('resize');

  return {
    /* 기준 타겟 위치 가감 수치 변경 */
    setTarModi : function($tarModi){
      _scrollTarModi = $tarModi;
    }
  }
}


/** 
* @param	$motion_items        : 모션 들어갈 아이템 선택자
* @param	$function            : 함수
* @param	$show_per            : 시작위치  (0: 보일때, .2: 20% 올라왔을때)
* @method setTarModi($tarModi) : 가감수치 변경
*/
jQuery.fn.trpScrollActiveFn = function( $function, $show_per, $options ){
  var _tarGet   = this
  var _show_per = $show_per;
  var _scrollTarModi = 0;
  var _last_scrollTop = 0;
  var _State = "under";
  var settings = {
    upHold : false,               // 타겟 선택자  
  };
  settings = jQuery.extend(settings, $options || {});

  /* --- 상태 변경 --- */
  function scrollActiveReSetFn($this, $state){
    /* 상태 변화가 있을때만 변경 */
    if( $state != $($this).data("state") ){
      $($this).data("state", $state); 
      $($this).removeClass("under over pass")
      $($this).addClass($state);
      $function($this, $state);
    }
  }

  /* --- 스크롤 & 리싸이즈 --- */
  function scrollActiveFn() { 
    var _wH  = window.innerHeight; 
    var _wS  = $(window).scrollTop();
    var _wHS = (_wH + _wS);           // 윈도우 높이 + 스크롤 높이 show
    /// console.log("=================== trigger ================");
    function scrollDown(){
      $(_tarGet).each(function($i) { 			
        var _s  = ($(this).offset().top) - _wH                          /* 타겟 show   */     
        var _t  = ($(this).offset().top + _scrollTarModi ) - (_wH * _show_per);           /* 타겟 active */
        var _th = ($(this).offset().top) + $(this).innerHeight();       /* 타겟 pass   */  
        var _state = $(this).data("state");

        if (_wS >= _th) { 
          _state = "pass";      // pass 
        } else if (_wS >= _t) { 
          _state = "over";      // over
        } else {
          if (settings.upHold) {
            ($(this).data("state") == "over")? _state == "over" : _state = "under"; // under
          }else{ 
            _state = "under";
          }
        } 
        /* 스크롤 , show, 대상, pass,  */
        ///console.log("scrollDown : ", "_wS", _wS , "   _s",_s, "   _t", _t, "   _wHS", _wHS, "   _th",_th, _state);

        /* 상태 초기화 및 변경 */
        scrollActiveReSetFn(this, _state);
      }); 
    }

    function scrollUp(){
      $(_tarGet).each(function($i) { 			
        var _s  = ($(this).offset().top) - _wH                         /* 타겟 show */
        var _t  = ($(this).offset().top + _scrollTarModi) - (_wH * _show_per);          /* 타겟 시작 */
        var _th = ($(this).offset().top) + $(this).innerHeight();      /* 타겟 hide : pass */
        var _state = $(this).data("state");

        if ( _wS > _s && _wS < _th ) {    // over 
          if( _wS >= _t ) { 
            _state = "over";
          }else{
            ( _state == "over")? _state == "over" : _state = "under"; // over & under
          }
        }else if( _wS >= _th ) {          // pass
          _state = "pass";
        }else {
          _state = "under";               // under
        }
   
        /* 스크롤 , show, 대상, pass,  */
        ///console.log("scrollUp : ", "_wS", _wS , "   _s",_s, "   _t", _t, "   _wHS", _wHS, "   _th",_th, _state);

        /* 상태 초기화 및 변경 */
        scrollActiveReSetFn(this, _state);
      }); 
    }

    /* ------------------------------- scroll up & down */
    var _tmp =  _wS;            //$(this).scrollTop();
    if (_tmp >= _last_scrollTop) { /// console.log(">>>>>>>>>>>>>>>>> down")
      scrollDown();
    } else {                       /// console.log(">>>>>>>>>>>>>>>>> up")
      (settings.upHold)? scrollUp() : scrollDown();
    }
    _last_scrollTop = _tmp;
    /* -------------------------------  */
  }

  scrollActiveReSetFn(this, _State);
  $(window).on('scroll resize', scrollActiveFn);
  $(window).trigger('resize');

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
* @param	$start_per         : 시작위치  (0: 보일때, .2: 20% 하단기준)
* @param	$end_per           : 종료위치  (0: 숨겨질, .2: 20% 상단기준)
* @method setTarModi($tarModi) : 가감수치 변경
*/
jQuery.fn.trpScrollActivePer = function( $add_class, $start_per, $end_per ){
  var _tarGet   = this
  var _addClass = $add_class;
  var _start_per = $start_per;
  var _end_per = 1 - $end_per;
  var _scrollTarModi = 0;
  function scrollActiveFn() { 
    var _wH  = window.innerHeight; 
    var _wS  = $(window).scrollTop();
    var _wHS = (_wH + _wS);
    
    $(_tarGet).each(function($i) { 			
      var _tarT    = $(this).offset().top;     // 타겟 위치      
      var _tarH    = $(this).innerHeight();     // 타겟 높이
      var _tarStart = ( _tarT + _scrollTarModi) +  (_wH * _start_per);     // 타겟 가감위치
      var _tarEnd   = ( _tarT + _tarH + _scrollTarModi) + (_wH * _end_per) // 타겟 + 브라우져 끝
      var _tarShow = ( _tarT + _scrollTarModi) ;           // Show
      var _tarHiden   = ( _tarT + _tarH + _scrollTarModi)  // Hiden

      $("#start_bar").css({ top: ($start_per * 100) + "%"  })
      $("#end_bar").css({ top: ($end_per * 100) + "%" })

      if (_wHS > _tarEnd) {                   // pass 
        $(this).attr("data-per",  100 );
      } else if (_wHS >= _tarStart) {             // over
        var _per = trpRangeRatioFn(_tarStart , _tarEnd, _wHS, 0, 100 );
        _per = (_per >= 100)? 100 : _per;
        $(this).addClass(_addClass);       
        $(this).attr("data-per",  _per );
      } else {                                 // under
        $(this).removeClass(_addClass);    
        $(this).attr("data-per",  0 );
      } 	

      if (_wS > _tarHiden) {                    // pass 
        $(this).attr("data-trstate", "trPass");    
        $(this).attr("data-per",  100 );
      } else if (_wHS >= _tarShow) {             // over
        $(this).attr("data-trstate", "trOver");    
      } else {                                 // under
        $(this).attr("data-trstate", "trUnder");    
      }

      /* 변화 있을때 만 이벤트 발생 */
      if( $(this).data("oldper") !=  $(this).attr("data-per") ){
        $(this).trigger('data-per-changed');
        $(this).data("oldper", $(this).attr("data-per") )
      }

    }); 
  }
  $(window).on('scroll resize', scrollActiveFn);
  $(window).trigger('scroll resize');

  function trpRangeRatioFn($rMin, $rMax, $ref, $tMin, $tMax ){
    var rMin 	= 0;					       // Refer 참고 최소 값		
    var rMax	= $rMax - $rMin;		// Refer 참고 최대 값	
    var ref 	= $ref  - $rMin;		// Refer 참고 변화 값
    var rPer;							        // Refer 참고 변화 퍼센트
    var tMin 	= 0;					      // target타겟 최소값
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
* @param	$function              : ( under | over | pass , scrollTar ) 	: 함수
* @method setTarModi(가감수치)   : 타겟 가감 수치 변경
*/
jQuery.fn.trpScrollPositionFn = function($scrollTar, $scrollTarModi, $functionChange) {
  var _scrolTar = $(this);
  var _scrollTarModi = $scrollTarModi;        // 타겟 가감
  var _scrolWin = _scrolTar.scrollTop();    
  var _scrolTag = 0;
  var _scrolPassTag = 0;
  var _only  = "defaul"; // over, under  : over:true | under:false
  $($scrollTar).each(function() {
    $(this).data("only", "under");
    $functionChange("under", this);
  })

  $(window).on("scroll resize", function($e){
    scrollResizeClassWatch()
  });
  function scrollResizeClassWatch(){
    $($scrollTar).each(function() {
      // 선텍자 체크
      if( $scrollTar != "" && $($scrollTar).length > 0  ){ _scrolTag = $(this).offset().top;  }  

      // 숫자 체크
      if( isNaN(_scrollTarModi) == false)    { _scrolTag = _scrolTag + (_scrollTarModi); }  

      
      if( this != "" && $(this).length == 0  ){ return false }  
      if( isNaN(_scrollTarModi) == false) { 
        _scrolTag     = $(this).offset().top + (_scrollTarModi); 
        _scrolPassTag = $(this).offset().top + (_scrollTarModi) + $(this).innerHeight(); 
      }  
      _scrolWin = _scrolTar.scrollTop();
      if (_scrolWin >= _scrolPassTag) {
        if ($(this).data("only") != "pass") { $functionChange("pass", this); }
        $(this).data("only", "pass"); 
      } else if (_scrolWin >= _scrolTag) {
        if ($(this).data("only") != "over") { $functionChange("over", this) }
        $(this).data("only", "over"); 
      } else {
        if ($(this).data("only") != "under") { $functionChange("under", this); }
        $(this).data("only", "under"); 
      }
      
    });
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
    _arr_temps = [];
    _max_temp  = [];
    _arr = []; _arr_col=[];
    
    _items.each( function($i){
      var _trackings = $(this);
      var _targets   = $(this);
      if ($tra != undefined ){ _trackings = $($tra , this) }; 
      if ($tar != undefined ){ _targets   = $($tar , this) }; 
      
      _arr_temps.push( _trackings.innerHeight() );
      _targets.css({ "min-height": 0 });
        
      if( ($i+1) % _colNum != 0 ){          // 줄에 첫번째부터 마지막전
        _arr.push( _trackings.innerHeight() );
        _arr_col.push( _targets );
        if ( $i+1 == _items.length ){       // 마지막줄 마지막 아이템
          _max_temp.push(height_max(_arr_col, _arr));
          _arr = []; _arr_col=[];
        }
      }else{                                // 줄에 마지막 아이템
        _arr.push( _trackings.innerHeight() );   
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
    if(_colNum == 1){ return Math.round(_max); }
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
    }, 
    getMaxHeight : function(){
      return _max_temp;
    } 
  }

};


/*
* trpColTimeHW       : 같은 col 아이템 높이를 같게 및 컬럼 Width % 조정
* @param	$col       : col 아이템 겟수
*/
jQuery.fn.trpColItemHW = function ($col) {
  var _arr = [],
    _arr_temps = [],
    _arr_col = [],
    _col_w = "";
  var _items = $(this);
  var _colNum = $col;

  function each_set() {
    _col_w = (100 / _colNum) + "%";
    _items.css({
      "min-height": 0,
      "width": _col_w
    });

    _arr_temps = [];
    _items.each(function ($i) {
      _arr_temps.push($(this).height());
      $(this).css({
        "min-height": 0
      });
      if ($i % _colNum == 0) {
        height_max(_arr_col, _arr);
        _arr = [];
        _arr_col = [];
        _arr.push($(this).height());
        _arr_col.push($(this));
      } else {
        _arr.push($(this).height());
        _arr_col.push($(this));
      }
    });

  };


  function height_max($coltimes, $arr) {
    var _max = Math.max.apply(null, $arr);
    for (var i = 0; i < $coltimes.length; i++) {
      $coltimes[i].css({
        "min-height": (Math.round(_max))
      });
    }
  }
  each_set();

  return {
    setCol: function ($col) {
      _colNum = $col;
      each_set();
    }
  }
};









/**
 * trpTabScrollMenu(parameter)             : 텝 스크롤 메뉴 활성화 메뉴
 * @param {string}    $tabBtn              : 텝버튼 선택자
 * @param {string}    $setctionSelector    : 섹션선택자 
 * @param {Array}     $sectionIDArr        : 섹션 아이디 배열
 * @param {function}  $activeCallbackFn($index:Number, $state:String)    : 액티브 실행 함수 (인덱스, 상태옵션 문자열)
 * @returns 
 *    @method setScreenRatio($ratio)       : 메뉴 활성화 화면 비율; 
 *    @method setScreenOffset($ratio)      : 메뉴 활성화 화면 비율; 
 *    @method setGoScroll($ratio)          : 메뉴 활성화 화면 비율; 
 */
jQuery.fn.trpTabScrollMenu = function( $tabBtn , $setctionSelector, $sectionIDArr, $activeCallbackFn ){
  var _tabMenu = this;                          // 텝메뉴 컨테이너
  var _scrollY  = getNowScroll().Y;             // 스크롤 위치 (스크롤 & 리사이즈)  
  var _RESIZE_HEIGHT = $(window).height();      // 화면 높이
  var _ScreenRatio = .5;                        // 활성화 비율
  var _ScreenOffSet = 0;                        // 활성화 비율
  var _UnderScroll = true;                      // under:true 
  var _OverScroll = false;                      // over:true

  var _tabBtn           = $tabBtn;              // 텝메뉴 아이템
  var _setctionSelector = $setctionSelector;    // 섹션선택자
  var _sectionIDArr     = $sectionIDArr;        // 섹션 아이디 배열
  var _activeCallbackFn = $activeCallbackFn;    // 액티브 실행 함수
  $(_setctionSelector).attr("data-ones", "true");

  /* ================================ 텝메뉴 클릭 이벤트 */
  $(_tabMenu).on("click", _tabBtn, function($e) {
    $e.preventDefault();
    var _id  = $(this).attr("href");                // 섹션 아이디
    var _idx = $(this).closest("li").index();       // 섹션 인덱스
    scrollMove(_id);
    // _activeCallbackFn(_idx);  메뉴 활성화
  });
  /**
   * @function scrollMove
   * @param {String} $sectionID   : 움직일 섹션 ID
   */
  function scrollMove($sectionID){
    var scrollPosition = $($sectionID).offset().top - ( _ScreenOffSet );
    window.scroll({ top: scrollPosition, behavior: "smooth" });
  }


  
  /* data-shows  화면 활성화 여부  */
  function showSection($setctionID){    
    var _tarY     = $($setctionID).offset().top;              // 움직여야할 아이템(section) 위치
    var _tarH     = $($setctionID).innerHeight();             // 움직여야할 아이템(section) 크기
    /* start , end */
    if(  _scrollY >  (_tarY - _RESIZE_HEIGHT) &&  _scrollY < (_tarY + _tarH) ){
      $($setctionID).attr("data-shows", "true");
    }else{
      $($setctionID).attr("data-shows", "false");
    }
  }
  /* 현제 스크롤 위치 */
  function getNowScroll() {
    var de = document.documentElement;
    var b = document.body;
    var now = {};
    now.X = document.querySelectorAll("*") ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
    now.Y = document.querySelectorAll("*") ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
    now.TOTAL = $(document).height();
    return now;
  }
  /* [스크롤 & 리사이즈] 섹션ID 위치에따른 함수 호출 */
  function callBackMenuActive($sections, $setctionID, $offSet, $fn1, $fn2){  
    var _onesFalse = $($sections).filter("[data-ones='false']").length;
    var _onesTrue  = $($sections).filter("[data-ones='true']").length;
    var _TotoalItem = $($sections).length;                     // 움직여야할 아이템(section) 수
    var _tarY     = $($setctionID).offset().top;              // 움직여야할 아이템(section) 위치
    var _tarH     = $($setctionID).innerHeight();             // 움직여야할 아이템(section) 크기
    var _boolean  = $($setctionID).attr("data-ones");         // (순방향 ↓),  (역방향 ↑)
    showSection($setctionID);
    /* --- 스크롤 양 > 타겟 위치 --- */
    if(  _scrollY >= (_tarY - $offSet) ){
      if(_boolean === "true"){
        $($setctionID).attr("data-ones", "false");
        $fn1("");
        ///console.log(" ----------------------------  ↓")
      }else if( _onesFalse === _TotoalItem && $($sections).eq(_TotoalItem - 1).attr("data-shows") === "true" ){
        /* --- (_onesFalse all) && endSection false ---  */
        if(_OverScroll === false){
          $fn1("overIN");
          _OverScroll = true;
          ///console.log(" ---------------------------- ↓ over" )
        }
      }
    }else{
      if(_boolean === "false"){
        $($setctionID).attr("data-ones", "true");
        $fn2(""); 
        // console.log(" ----------------------------  ↑")
      }else if( _onesTrue === _TotoalItem && $($sections).eq(0).attr("data-shows") === "true" ){
        /* (_onesTrue all) && StartSection true  */
        if(_UnderScroll === false){
          $fn2("underIN");
          _UnderScroll = true;
          // console.log(" ---------------------------- ↑ under" )
        }
      }
    }

    /* under --- over */
    if( _onesTrue === _TotoalItem && $($sections).eq(0).attr("data-shows") === "false" ) { 
      if(_UnderScroll){
        ///console.log(" ---------------------------- under" )
        $fn2("under"); 
        _UnderScroll = false;   
      }
    }
    if( _onesFalse === _TotoalItem && $($sections).eq(_TotoalItem - 1).attr("data-shows") === "false" ) { 
      if(_OverScroll){
        //console.log(" ----------------------------  over" )
        $fn1("over"); 
        _OverScroll = false;   
      }
    } 
    return false;
  }


  /* ================================ [스크롤 & 리사이즈] FN */
  function scrollResize(){
    _RESIZE_HEIGHT = $(window).height();
    _scrollY  = getNowScroll().Y;             // 스크롤 위치
    var offSet = (_RESIZE_HEIGHT * _ScreenRatio); 

    for (var i = 0; i < _sectionIDArr.length; i++) {
      callBackMenuActive( _setctionSelector, "#"+_sectionIDArr[i], offSet,  function($state){
        ///console.log("fn1 ", i , $state);
        _activeCallbackFn(i, $state);      // 메뉴 활성화
      }, function($state){
        ///console.log("fn2 ", i - 1, $state);
        _activeCallbackFn(i - 1, $state);  // 메뉴 기본값
      })
    }
  }
  $(window).on("resize scroll", function(){  scrollResize(); });
  scrollResize(); 


  return {
    /**
     * setScreenRatio : 메뉴 활성화 스크린위치 비율값 : (0~1)
     * @param {Number} $ratio 
     */
    setScreenRatio: function($ratio) { 
      _ScreenRatio = $ratio;
    }, 
    /**
     * setScreenOffset : 스크린 움직임 가감수치
     * @param {Number} $offset 
     */
    setScreenOffset: function($offset) { 
      _ScreenOffSet = $offset;
    }, 
    /**
     * setGoScroll : 스크롤 이동
     * @param {String} $sectionID 
     */
    setGoScroll: function($sectionID) {
      scrollMove($sectionID);
    }
  }



}




/**
 * trpStickyTopEvent   : 스티키 상태 이벤트발생및 클래스 출력
 * @param {*} $stickyPoint : top 값
 */
jQuery.fn.trpStickyTopEvent = function( $stickyPoint, $parentClass ){
  var _stickyElement = $(this);
  var _scrollTop = $(window).scrollTop();
  var _stickyPoint = 0;
  var _parentClass = "";
  _stickyPoint = $stickyPoint ? $stickyPoint : 0;
  _parentClass = $parentClass ? $parentClass : "";
  
  /* 초기 세팅 */
  _stickyElement.each(function($idx, $stickyEl){ 
    $($stickyEl).data("isSticky", false);
  })

  /* 스크롤 & 리싸이즈 함수 */
  function resizeScrollFn() {
    _scrollTop = $(window).scrollTop();
    _stickyElement.each(function($idx, $stickyEl){ 
      var elementTop  = $($stickyEl).offset().top;      /// 스티키 대상위치
      var isSticky    = $($stickyEl).data("isSticky");  /// 스티키 여부

      ///console.log( "_scrollTop ", _scrollTop , (elementTop - _stickyPoint),  isSticky) ;
      // 스티키 상태 변경 감지 (스티키, over->스티키, 스티키over, 스티키under)
      if (_scrollTop == (elementTop - _stickyPoint) && !isSticky) {
        // under-> 스티키
        $($stickyEl).trigger('stickyOn', [_scrollTop]);
        $($stickyEl).data("isSticky", true);

        $($stickyEl).addClass('is-sticky');
        $($stickyEl).closest(_parentClass).addClass('is-parentSticky');
        $($stickyEl).removeClass('is-sticky_over');
      } 
      if (_scrollTop == (elementTop - _stickyPoint) && isSticky) {
        // over -> 스티키
        $($stickyEl).trigger('stickyOnIng', [_scrollTop]);

        $($stickyEl).removeClass('is-sticky_over');
      }
      else if (_scrollTop > (elementTop - _stickyPoint) ) {
        // 스티키over
        $($stickyEl).trigger('stickyOverIng', [_scrollTop]);

        $($stickyEl).addClass('is-sticky_over');
      }
      else if (_scrollTop < (elementTop - _stickyPoint) && isSticky) {
        // 스티키under
        $($stickyEl).trigger('stickyUnder', [_scrollTop]);
        $($stickyEl).data("isSticky", false);
        
        $($stickyEl).removeClass('is-sticky');
        $($stickyEl).closest(_parentClass).removeClass('is-parentSticky');
        $($stickyEl).removeClass('is-sticky_over');
      }
    });
  }

  /* 스크롤 & 리싸이즈 리스너 */
  $(window).on('resize scroll', function() { resizeScrollFn() });
  resizeScrollFn();

  return {
    /**
     * setScreenRatio : 메뉴 활성화 스크린위치 비율값 : (0~1)
     * @param {Number} $ratio 
     */
    setPoint: function($stickyPoint) { 
      _stickyPoint = $stickyPoint;
    }, 
  }
}



/**
 * trpStickyBottomEvent  : 스티키 상태 이벤트발생및 클래스 출력
 * @param {*} $stickyPoint : bottom 값
 */
jQuery.fn.trpStickyBottomEvent = function( $stickyPoint, $parentClass ){
  var _stickyElement = $(this);
  var _scrollBottom = $(window).scrollTop() +  $(window).height();
  var _stickyPoint = 0;
  var _parentClass = "";
  _stickyPoint = $stickyPoint ? $stickyPoint : 0;
  _parentClass = $parentClass ? $parentClass : "";

  /* 초기 세팅 */
  _stickyElement.each(function($idx, $stickyEl){ 
    $($stickyEl).data("isStickyB", false);
  })

  /* 스크롤 & 리싸이즈 함수 */
  function resizeScrollFn() {
    
    _scrollBottom = $(window).scrollTop() +  $(window).height();
    _stickyElement.each(function($idx, $stickyEl){ 
      var elementBottom  = $($stickyEl).offset().top + $($stickyEl).innerHeight(); /// 스티키 대상위치
      var isSticky       = $($stickyEl).data("isStickyB");                         /// 스티키 여부
    
      //console.log( "_scrollBottom ", _scrollBottom , (elementBottom + _stickyPoint),  isSticky) ;
      // 스티키 상태 변경 감지 (스티키, over->스티키, 스티키over, 스티키under)
      if (_scrollBottom == (elementBottom + _stickyPoint) && !isSticky  ) {
        // over -> 스티키
        $($stickyEl).trigger('stickyOn', [_scrollBottom]);
        $($stickyEl).data("isStickyB", true);

        $($stickyEl).addClass('is-sticky');
        $($stickyEl).closest(_parentClass).addClass('is-parentSticky');
        $($stickyEl).removeClass('is-sticky_over');
      }
      else if (_scrollBottom == (elementBottom + _stickyPoint) && isSticky  ) {
        // ounder -> 스티키
        $($stickyEl).trigger('stickyOnIng', [_scrollBottom]);

        $($stickyEl).removeClass('is-sticky_over');
      }
      else if (_scrollBottom < (elementBottom + _stickyPoint)  ) {
        // 스티키over ↑
        $($stickyEl).trigger('stickyOverIng', [_scrollBottom]);

        $($stickyEl).addClass('is-sticky_over');
      } 
      else if (_scrollBottom > (elementBottom + _stickyPoint) && isSticky ) {
        // 스티키under ↓
        $($stickyEl).trigger('stickyUnder', [_scrollBottom]);
        $($stickyEl).data("isStickyB", false);

        $($stickyEl).removeClass('is-sticky');
        $($stickyEl).closest(_parentClass).removeClass('is-parentSticky');
        $($stickyEl).removeClass('is-sticky_over');
      }
    
    });
  }

  /* 스크롤 & 리싸이즈 리스너 */
  $(window).on('resize scroll', function() { resizeScrollFn() });
  resizeScrollFn();

  return {
    /**
     * setScreenRatio : 메뉴 활성화 스크린위치 비율값 : (0~1)
     * @param {Number} $ratio 
     */
    setPoint: function($stickyPoint) { 
      _stickyPoint = $stickyPoint;
    }, 
  }
}