/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.82
 * release date : 2018.08.29
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */


/* 브라우저 검사 */
jQuery.browser={};(function(){jQuery.browser.msie=false;jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();
/*  jquery-1.11.1.js로 테스트 된버젼입니다. */


/* =============== 아래 부터는 레이어 팝업 관련 ===============  */
/**
 * trpLayerPopup			: 레이어 팝업띄움
 * @param  options		: popupTarget(팝업타겟), popupWarp(팝업 타겟 감싸는 컨테이너)
 * @method  align		: 팝업 컨텐츠 정열
 * @method  bgDim		: 배경 어둡데 하기
 * @method  open		: 팝업 띄우기
 * @method  close		: 팝업 닫기
 */
jQuery.fn.trpLayerPopup = function( options ){
	var _this			= this;				// 팝업열기		버튼
	var _alignCenterB = true;				// 중앙정열 옵션 여부
	var _alignO		= { top: 0 , left:0};	// 위치 옵션
	var _alignD		= { top: 0 , left:0};	// 위치 위치 값 적용
	var _bgDimB		  = false;			    // 배경딘드 여부
	var _bgDimD;						    // 배경딘드 옵션
	var _self;							    // 팝업닫을대 돌아갈타겟
	var settings = {
		popupTarget:	".tr_popup",		// 팝업 타겟
		popupWarp:		""				    // 팝업 wrapper
    };
	if( options ) { $.extend(settings, options) }else{ var options="" };  // 빈값을넣어 비교시오류 막음

	// 팝업 열기
	function popupOpen($this){
		if(options.popupWarp == undefined){
			settings.popupWarp =  $($this).attr('href');
		} // 타겟값이 없다면 a태그로 인식해서 href적용

		_self = $this;
		$(settings.popupWarp).show();

		function align(){
			// 중앙정렬
			if(_alignCenterB){
				// 중앙정열
				$(settings.popupWarp).find(settings.popupTarget).trpAlignCenter();
				setTimeout( $(settings.popupWarp).find(settings.popupTarget).trpAlignCenter(),  50)
				$(settings.popupWarp).find(settings.popupTarget).attr('tabindex', '0').focus();		// 포커스 이동
			}else{
				$(this).css({'position':'absolute'});
				if(_alignO.top  == "center"){ _alignD.top	= $(settings.popupWarp).find(settings.popupTarget).trpAlignCenterH() };
				if(_alignO.left == "center"){ _alignD.left	= $(settings.popupWarp).find(settings.popupTarget).trpAlignCenterW(settings.popupWarp) };

				$(settings.popupWarp).find(settings.popupTarget).css({ "position": "absolute", "top":_alignD.top , "left":_alignD.left });
				$(settings.popupWarp).find(settings.popupTarget).attr('tabindex', '0').focus();
			}
		}

		if(_alignCenterB){ // 위치 값이 있으면  리사이징 안함 중앙정열 안함
			$(window).on("resize",function(){
				// 배경 중앙정렬
				if(settings.bgDimB){
					$(_bgDimD.target).trpBgDim(_bgDimD.opacity,_bgDimD.bgColor )
				}
				// 컨텐츠 중앙정렬

				align();
			})
		}else{ //console.log( _alignO.top, _alignO.left )
			$(window).on("resize",function(){
				if(_alignO.top == "center" || _alignO.left == "center" ){
					align();
				}
			})
		}

		// 컨텐츠 정렬
		align();

		// 배경 딤드
		if(_bgDimB){
			$(_bgDimD.target).trpBgDim(_bgDimD.opacity, _bgDimD.bgColor )
		}

		return false;

	}// 팝업 열기/

	function popupClose($cookieName){
		$(settings.popupWarp).hide();
		$(_self).focus();

		if($cookieName){
			var _cookieName = $cookieName;
			if(_cookieName){trpSetCookie(_cookieName,'true','1');}									// 오늘하루 안열기
		}
		return false;
	}

	return { align: function( $top, $left){
			_alignCenterB = false;
			_alignO ={ top:$top, left:$left };
			_alignD ={ top:$top, left:$left };
		},bgDim:function($target, $opacity, $bgColor){
			_bgDimB = true;
			_bgDimD ={ target:$target , opacity:$opacity, bgColor:$bgColor}
		},open:function($this, $cookieName){			// 팝업 열기

				var isShow = trpGetCookie($cookieName)=='true'?true:false;
				if (!isShow ){						// false 값일때 열림
					popupOpen($this);
				}

		},close:function($cookieName){				// 팝업 닫기
			popupClose($cookieName);
		}

	}; // return//

}// trpLayerPopup/


/*
 * trpLayerPopupFile		: 레이어 팝업띄움
 * @param  options		: popupTarget(팝업타겟), popupWarp(팝업 타겟 감싸는 컨테이너)
 * @method  align		: 팝업 컨텐츠 정열
 * @method  bgDim		: 배경 어둡데 하기
 * @method  open		: 팝업 띄우기
 * @method  close		: 팝업 닫기
 */
jQuery.fn.trpLayerPopupFile = function( options ){
	var _this			= this;				// 팝업열기		버튼

	var _alignCenterB = true;				// 중앙정열 옵션 여부
	var _alignD		= { top: 0 , left:0};	// 위치 옵션

	var _bgDimB		  = false;			// 배경딘드 여부
	var _bgDimD;						// 배경딘드 옵션
	var _self;							// 팝업닫을대 돌아갈타겟

	var settings = {
		popupUrl:	"",				// 팝업 url
		popupTarget:	"",			// 팝업타겟
		popupWarp:	""				// 팝업 wrapper
    };
	if( options ) {
        $.extend(settings, options);
    }



	// 팝업 열기
	function popupOpen($this){

		if(!options.popupWarp){
			settings.popupWarp =  $($this).attr('href');
		} // 타겟값이 없다면 a태그로 인식해서 href적용

		_self = $this;
		$(settings.popupWarp).show();
		$(settings.popupWarp).load( settings.popupUrl , startFn );

		function startFn(){
			// 컨텐츠 정렬
			align();

			// 배경 딤드
			if(_bgDimB){
				$(_bgDimD.target).trpBgDim(_bgDimD.opacity, _bgDimD.bgColor );
			}
		}

		// 컨텐츠 정렬
		function align(){
			// 중앙정렬
			if(_alignCenterB){ 	  //console.log("popupTarget :  "+ settings.popupTarget)
				// 중앙정열
				$(settings.popupWarp).find(settings.popupTarget).trpAlignCenter();
				$(settings.popupWarp).find(settings.popupTarget).attr('tabindex', '0').focus();		// 포커스 이동
			}else{
				$(this).css({'position':'absolute'});
				if(_alignD.top  == "center"){ _alignD.top	= $(settings.popupWarp).find(settings.popupTarget).trpAlignCenterH(); }
				if(_alignD.left == "center"){ _alignD.left	= $(settings.popupWarp).find(settings.popupTarget).trpAlignCenterW(); }

				$(settings.popupWarp).find(settings.popupTarget).css({ "position": "absolute", "top":_alignD.top , "left":_alignD.left });
				$(settings.popupWarp).find(settings.popupTarget).attr('tabindex', '0').focus();
			}
		}
			//console.log("클릭")

		$(window).on("resize",function(){
			// 배경 중앙정렬
			if(settings.bgDimB){
				$(_bgDimD.target).trpBgDim(_bgDimD.opacity,_bgDimD.bgColor );
			}
			// 컨텐츠 정렬
			align();
		});

		return false;

	}// 팝업 열기/

	function popupClose($cookieName){
		//console.log("닫기");
		$(settings.popupWarp).find(".dim , .popup").remove();
		$(settings.popupWarp).hide();

		$(_self).focus();


		if($cookieName){
			var _cookieName = $cookieName;
			if(_cookieName){trpSetCookie(_cookieName,'true','1');}									// 오늘하루 안열기
		}

		return false;
	}

	return { align: function( $top, $left){
			_alignCenterB = false;
			_alignD ={ top:$top, left:$left };
		},bgDim:function($target, $opacity, $bgColor){
			_bgDimB = true;
			_bgDimD = { target:$target , opacity:$opacity, bgColor:$bgColor};
		},open:function($this, $cookieName){			// 팝업 열기

				var isShow = trpGetCookie($cookieName)=='true'?true:false;
				//console.log(isShow)
				if (!isShow ){						// false 값일때 열림
					popupOpen($this);
				}

		},close:function($cookieName){				// 팝업 닫기
			popupClose($cookieName);
		}

	}; // return//

};// trpLayerPopupFile/


/*
 * trpLayerFixedPopup		: 레이어 팝업띄움
 * @param  $tarPopup		: $tarPopup(팝업타겟)
 * @method  open		    : 팝업 띄우기
 * @method  close		    : 팝업 닫기
 * @method  getBtn		    : 팝업 버튼
 */
var trpLayerFixedPopupScroll_top = 0;
jQuery.fn.trpLayerFixedPopup = function( $tarPopup ){
    var _self       = this;             // 팝업열기버튼 & 팝업닫을대 돌아갈타겟
    var _selfOff    = true;				// 오픈시 포커스 사용안함.
    var _isShow     = false;			// 팝업 열려 있는지 상태.
    //var trpLayerFixedPopupScroll_top = $(window).scrollTop();
    var _tarPopup   = ( $tarPopup )?_tarPopup=$tarPopup : _tarPopup="" ;
    var _dim = $('<div class="popup-dim"></div>');
    var _dim_class = "";
 

    // 팝업 열기
    function popupOpen($this){           //console.log(">>>  : " + $this);
        if( $this ){_self = $this; }else{ _selfOff = false; }
        if(_tarPopup == ""){ _tarPopup =  $(_self).attr('href'); } // 타겟값이 없다면 a태그로 인식해서 href적용
        
        _dim_class = _tarPopup.replace(/\#/g,'')
        _dim.addClass(_dim_class).css({ display:"none" });
        $(_tarPopup).before(_dim);
        _dim.fadeIn(300);
        //$(_tarPopup).fadeIn(300);
      	
				$(_tarPopup).show();
				$(_tarPopup).find(".popup-layer").hide().fadeIn(300);
        
        if( $(".popupfixed-wrap").filter(":visible").length == 1){
            trpLayerFixedPopupScroll_top = $(window).scrollTop();
            $("html, body").scrollTop(0);
            $(".wrapper").css({ position:"fixed",     top: (trpLayerFixedPopupScroll_top * -1) });
            $(".wrapper").attr("data-pop", "on");
            //$("html, body").css({ overflow : "hidden"});
        }
        
        return false;
    }


    // 팝업 닫기
    function popupClose($completeFn){
        if( $(".popupfixed-wrap").filter(":visible").length == 0){ return false; }

        $(_dim).fadeOut(300, function(){
            _dim.remove();            
        });
        $(_tarPopup).fadeOut(300 ,function(){
            if( $(".popupfixed-wrap").filter(":visible").length == 0){
                $(".wrapper").css({ position:"relative",  top:"0" });
                $("html, body").scrollTop(trpLayerFixedPopupScroll_top);
                $(".wrapper").attr("data-pop", "off");
                //$("html, body").css({ overflow : "initial"});
            }
			if(_selfOff)$(_self).focus(); 
			if ( $completeFn != undefined && typeof $completeFn == 'function') { // 함수인지 체크해서 호출
				$completeFn();  
			}
        });
        return $(_tarPopup); 
    }

    return { open:function($this){            // 팝업 열기
            if (!_isShow ){                   // false 값일때 열림
                _isShow = true;
                popupOpen($this);
            }

        },close:function($completeFn){                     // 팝업 닫기
            _isShow = false;
            return popupClose($completeFn);
        },getBtn: _self

    }; // return//

};// trpLayerFixedPopup




/*
 * trpLayerFixedPopupFile	: 파일 레이어 팝업
 * @param  $popupUrl		: $popupUrl(팝업파일 [선택자])
 * @param  $tarPopup		: $tarPopup(팝업타겟)
 * @method  open			: 팝업 띄우기
 * @method  close			: 팝업 닫기
 * @method  getBtn			: 팝업 버튼
 */
jQuery.fn.trpLayerFixedPopupFile = function( $popupUrl, $tarPopup ){
    var _self       = this;             // 팝업열기버튼 & 팝업닫을대 돌아갈타겟
    var _selfOff    = true;
    var _isShow     = false;
    var _scroll_top = $(window).scrollTop();
    var _tarPopup   = ( $tarPopup )?_tarPopup=$tarPopup : _tarPopup="" ;

    // 팝업 열기
    function popupOpen($this){           //console.log(">>>  : " + $this);
        if( $this ){_self = $this; }else{ _selfOff = false; }
        if(_tarPopup == ""){ _tarPopup =  $(_self).attr('href'); } // 타겟값이 없다면 a태그로 인식해서 href적용

        _scroll_top = $(window).scrollTop();
        $(".wrapper").css({ position:"fixed",     top: (_scroll_top * -1) });

        if($.browser.msie==true){
            if($.browser.version <= 7.0){
                $(_tarPopup).css({ display:"block"});
            }else{
                $(_tarPopup).css({ display:"table"});
            }
        }else{
            $(_tarPopup).css({ display:"table"});
        }
		$(_tarPopup).load( $popupUrl );

        $("html, body").scrollTop(0);
        return false;
    }

    // 팝업 닫기
    function popupClose(){
        //$(settings.popupWarp).hide();
        $(".wrapper").css({ position:"static",  top:"0" });
        $(_tarPopup).css({ display:"none" });
        $("html, body").scrollTop(_scroll_top);
        if(_selfOff)$(_self).focus();
        return false;
    }

    return { open:function($this){            // 팝업 열기
            if (!_isShow ){                   // false 값일때 열림
                _isShow = true;
                popupOpen($this);
            }

        },close:function(){                   // 팝업 닫기
            _isShow = false;
            popupClose();
        },getBtn: _self

    }; // return//

};// trpLayerFixedPopupFile



/**
 * trpAlignCenter	: 팝업중앙 띄우기
 * @param $width	: 팝업창 가로크기
 * @param $height	: 팝업창 세로크기
 * #popup_wrap { display: none; position: absolute;  top: 129px; left: 0; z-index: 9999; width: 100%; height: 100%; text-align: center; }
 * #popup_wrap .popup_con   { display: inline-block; *display:inline; zoom:1; position: relative;  }
 */
jQuery.fn.trpAlignCenter = function($width, $height){
	var _width,_height ,_x , _y;

	_width  = ($width)?  $width  : $(this).outerWidth() ;
	_height = ($height)? $height : $(this).outerHeight();
	//console.log(_width , _height);
	$(this).css({'position':'absolute'});
	_x = (( $( window ).width() - _width) /2 ) + $(window).scrollLeft();
	_y = (( $( window ).height() - _height) /2 ) + $(window).scrollTop();

	if (_x <=0 ) { _x=0; }
	if (_y <=0 ) { _y=0; }
	$(this).css("left", _x  );
	$(this).css("top", _y  );
	//console.log(_x+" : "+_y);
	return false;
};

/**
 * trpAlignCenterW	: 팝업 가로 중앙 띄우기
 * @param $x		: 중앙에서 $x 만큼더한다
 */
jQuery.fn.trpAlignCenterW = function($o,$x){
	var _width, _x, _moveX;
	_moveX = ($x)?  $x  : 0 ;
	_width  = $(this).outerWidth() ;
	$(this).css({'position':'absolute'});
	//_x = (( $( window ).width() - _width) /2 ) + $(window).scrollLeft();
	_x = (( $( $o ).outerWidth(true) - _width) /2 ) + $(window).scrollLeft();
	if (_x <=0 ) { _x=0; }
	return (_x+_moveX);
};

/**
 * trpAlignCenterH	: 팝업 세로 중앙 띄우기
 * @param $y		: 중앙에서 $y 만큼더한다
 */
jQuery.fn.trpAlignCenterH = function($y){
	var _height, _y, _moveY;
	_moveY = ($y)?  $y  : 0 ;
	_height = $(this).outerHeight();
	$(this).css({'position':'absolute'});
	_y = (( $( window ).height() - _height) /2 ) + $(window).scrollTop();
	if (_y <=0 ) { _y=0; }
	return (_y+_moveY);
};


/**
 * trpBgDim			: 딤드 전체 영역, 투명도, 색상
 * @param $opacity  : 투명도(0.3)
 * @param $bgColor  : 배경색(#000)
 * #opacity  : #popup_dim {position: fixed; top: 0; left: 0; width:100%; height:100%; background: #000; opacity: .7; filter: alpha(opacity=70);  z-index:9990;}
 */
jQuery.fn.trpBgDim = function($opacity,$bgColor){
	//console.log($(this))
	var _docW,_docH, _opacityO , _opacityE, _bgColor;
	//_docW=$(document).width(); 		// dim 크기
	//_docH=$(document).height();		// dim 크기
	_docW="100%";
	_docH="100%";

	_opacityO = ($opacity)? $opacity : 0.7 ;	 // 투명도
	_opacityE = _opacityO *100;					 // ie 투명도
	_bgColor  = ($bgColor)?  $bgColor : "#000" ; // 색상
	$(this).css({ "position":"fixed", top:0, left:0 ,"width":_docW, "height":_docH , opacity:_opacityO, "background-color": _bgColor ,
		"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity="+ _opacityE +") !important", "filter": "alpha(opacity="+ _opacityE +") !important"
	});
};

/* =============== 아래 부터는 윈도우 팝업 관련 ===============  */

	/**
	*	trpWindowPopup : 윈도우팝업 열기
	*	$url		: 팝업 경로
	*	$top		: 팝업 상단 위치
	*	$left		: 팝업 좌측 위치
	*	$width		: 팝업 가로 크기
	*	$height		: 팝업 세로 크기
	*/
	jQuery.fn.trpWindowPopup = function($url , $width, $height, $top, $left  ){
		var _popupName="winPopup";
		$(this).on("click", function(){
			windowOpen();
		});

		function windowOpen(){ // 가로세로 값이없으면 위치값이 의미가없음
			var winP;
			if( $top && $left ){

				winP = window.open($url , _popupName , 'toolbar=no,location=no, directories=no, status=no, toolbar=no, menubar=no, scrollbars=no, resizable=no, top='+ $top +', left='+ $left +', width='+ $width +', height='+ $height );
			}else{
				winP = window.open($url , _popupName , 'toolbar=no,location=no, directories=no, status=no, toolbar=no, menubar=no, scrollbars=no, resizable=no,  width='+ $width +', height='+ $height );

			}
		}


		return {
			oneDay: function($cookieName) {
				_popupName = $cookieName;
				var isShow = trpGetCookie($cookieName)=='true'?true:false;
				if (!isShow){						// false 값일때 열림
					windowOpen();
				}
			}
		};

	};

	/**
	*	trpWindowClose		: 윈도우팝업 닫기
	*	@method  parentLink : 부모창에서 열릴 링크
	*	@method  selfLink	: 현재창에서 열릴 링크
	*	@method  blankLink	: 새창에서 열릴 링크
	*	@method  oneDay		: 오늘하루 안열기
	*/
	jQuery.fn.trpWindowClose = function(){
		var _parentUrl;
		var _selfUrl;
		var _blankUrl;
		var _cookieName	=0;
		$(this).on("click", function(){
			if(_parentUrl){ window.opener.document.location.href	=	_parentUrl; }				// 무모창으로 링크
			if(_selfUrl){	self.location.href						=	_selfUrl; return false; }	// 현제창 링크
			if(_blankUrl){	window.open( _blankUrl ); }												// 새창 링크												// 새창 으로 링크
			if(_cookieName){trpSetCookie(_cookieName,'true','1');}									// 오늘하루 안열기
			self.close();																			// 현재창 닫기	( windown.close(); )
		});

		return {
			parentLink: function($url) {
				if (window.opener && !window.opener.closed){		// 부모창이있고 && 닫혀있지 않을때
					_parentUrl = $url;
				}
			},
			selfLink: function($url) {
					_selfUrl = $url;
			},
			blankLink: function($url) {
					_blankUrl = $url;
			},
			oneDay: function($cookieName) {
					_cookieName = $cookieName;
			}
		};
	};


	/**
	*  trpWindowPopupResize : 컨테이너 크기로 윈도우크기 변환
	*/
	jQuery.fn.trpWindowPopupResize = function(){
		  var _targetWrap = this;
		  var _strWidth;
		  var _strHeight;

		 // 최신 브라우저 체크
		  function browserCheck(){
			  //	innerWidth / innerHeight / outerWidth / outerHeight 지원 브라우저
			  if ( window.innerWidth && window.innerHeight && window.outerWidth && window.outerHeight ) {
				_strWidth	= $(_targetWrap).outerWidth()	+ (window.outerWidth - window.innerWidth);
				_strHeight	= $(_targetWrap).outerHeight()	+ (window.outerHeight - window.innerHeight);
			  }else { // ie8 이하 브라우저는 지원하지 않음 (window.innerWidth && window.innerHeight && window.outerWidth && window.outerHeight)
				var strDocumentWidth = $(document).outerWidth();
				var strDocumentHeight = $(document).outerHeight();
				window.resizeTo ( strDocumentWidth, strDocumentHeight );

				var strMenuWidth = strDocumentWidth - $(window).width();
				var strMenuHeight = strDocumentHeight - $(window).height();
				_strWidth	= $(_targetWrap).outerWidth() + strMenuWidth;
				_strHeight	= $(_targetWrap).outerHeight() + strMenuHeight;
			  }
		  }


		  //resize
		  resizeFn();
		  //console.log(_strWidth +" : "+ _strHeight)

		  setTimeout( resizeFn, 100 );
		  setTimeout( resizeFn, 200 );
		  setTimeout( resizeFn, 3000 );
		  function resizeFn(){
			 browserCheck();
			 window.resizeTo( _strWidth, _strHeight );
		  }

	};//  trpWindowPopupResize




/** ==================== 쿠키관련 ==================== **/
	/**
	*	trpSetCookie : 쿠키세팅
	*	cName		: 쿠키이름
	*	cValue		: 쿠키값
	*	cDay		: 날짜 1일단위
	*/
	function trpSetCookie($cName, $cValue, $cDay){
		var expire = new Date();

		expire.setDate(expire.getDate() + $cDay);				// 현재 날짜+팝업을 안열을 일수
		cookies = $cName + '=' + escape($cValue) + '; path=/ ';	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
		if(typeof $cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';  // 쿠키 지속시간 설정( toUTCString )
		document.cookie = cookies;
	}


	/**
	*	trpGetCookie : 쿠키값 가져오기
	*	cName		: 쿠키이름
	*	return		: 쿠키값
	*/
	function trpGetCookie($cName) {
		$cName = $cName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf($cName);
		var cValue = '';
		if(start != -1){
			start += $cName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cValue = cookieData.substring(start, end);
		}

		return unescape(cValue);
	}
/** //==================== 쿠키관련 ==================== **/