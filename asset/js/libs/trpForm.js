/*
 * Base			  : jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.9.3
 * release date : 2024.07.26
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */


$(document).ready(function(){ 
	/*
		placeholder 
		ie7 에서도 사용가능한 placeholder 입니다.
		아래코드는 "placeholder" 인식 안하는 경우에만 작동합니다.
	*/
	/*  placeholder 유효한지 체크	*/ 
	   if ((isInputSupported = 'placeholder' in document.createElement('input')) !== true) {
		   
		$('input[placeholder]').each(function () {			
			if ($(this).val() == ''){ 							// 값이없을때는 "placeholder"로대체 	
				var l_h = $(this).css('line-height');
 				var _add_style = "style='position:absolute; display:inline-block; width:"+$(this).width()+"px; height:"+$(this).height()+"px;  font-size:"+$(this).css('font-size')+"; color:"+$(this).css('color')+"; line-height:"+$(this).css('line-height')+"; z-index:1; '"  ;
				var _inputWarp = "style='position:relative; display:inline-block; width:"+$(this).width()+"px; height:"+$(this).height()+"px;  top:"+$(this).css("top")+"px; left:"+$(this).css("left")+"px; margin-top:"+$(this).css('margin-top')+"; margin-right:"+$(this).css('margin-right')+"; margin-bottom:"+$(this).css('margin-bottom')+"; margin-left:"+$(this).css('margin-left')+"; padding-top:"+$(this).css('padding-top')+"; padding-right:"+$(this).css('padding-right')+"; padding-bottom:"+$(this).css('padding-bottom')+"; padding-left:"+$(this).css('padding-left')+"; vertical-align:" +$(this).css('vertical-align') +";'"  ;
				var _input = { top:0, left:0, margin:0 };
				$(this).css(_input);

				var _add_html = "<span class='trp_placeholder' "+ _add_style +" >"+ $(this).attr('placeholder') +"</span>";
				
				$(this).css({ "position":"absolute", "z-index":2 , "background-color":"transparent" });
				
				$(this).wrap("<span class='trp_inputWarp' "+ _inputWarp +" ></span>");
				$(this).before(_add_html);
				
			}
		});
	
		$('input[placeholder]').focus(function () {				
			if (  $(this).val() == ""  )	$(this).parent().find(".trp_placeholder").hide();	
		});

		$('input[placeholder]').blur(function () {
			if (  $(this).val() == ""  )	$(this).parent().find(".trp_placeholder").show();
		});	
		
			
	} ;
	/* //placeholder */
	

	/* textarea placeholder 유효한지 체크	*/ 
	   if ((isTextareaSupported = 'placeholder' in document.createElement('textarea')) !== true) {
		
		$('textarea[placeholder]').each(function () {
			
			if ($(this).val() == ''){ 							// 값이없을때는 "placeholder"로대체 	
				
				var l_h = $(this).css('line-height');
 				var _add_style = "style='position:absolute; width:"+$(this).width() +"; height:"+$(this).height() +";display:block; top:"+$(this).css("top") +"; left:"+$(this).css("left") +"; margin:5px; font-size:12px; line-height: "+$(this).css('line-height')+"; color:#a9a9a9'; z-index:1;"  ;

				var _add_html = "<span class='trp_placeholder' "+ _add_style +" >"+ $(this).attr('placeholder') +"</span>";

				$(this).css({ "position":"absolute", "z-index":2 , "background-color":"transparent" });
				$(this).wrap("<div class='trp_inputWarp' style='position:relative ;height:25px; '></div>");
				$(this).before(_add_html);
			}
		});
	
		$('textarea[placeholder]').focus(function () {				
			if (  $(this).val() == ""  )	$(this).parent().find(".trp_placeholder").hide();	
		});

		$('textarea[placeholder]').blur(function () {
			if (  $(this).val() == ""  )	$(this).parent().find(".trp_placeholder").show();
		});	
	
	} ;
	/* //placeholder */
	
	

	
});



/* input type="file" 이미지로 변경 */
(function($) {    
  $.fn.trpFilestyle = function(options) {
      var self = this;       
      /* TODO: override CSS. */
      var settings = {            
          textClass: 'trp_fileName',
    textWidth: "auto",
    textHeight: "auto",
    buttonClass: "trp_fileButton",
    buttonText: '파일선택',
    buttonImage: "",			
    buttonWidth: "auto",
    buttonHeight: "auto"
      };

      // 옵녓값 합침        
      if(options) {
          $.extend(settings, options);
      };

      return this.each(function() {
        var self = this;
      var browser = navigator.userAgent;		// 브라우저

      // 생성되는 input type="text"
      var _text_html = $("<input type='text' title='file name' readonly='readonly' />").addClass(settings.textClass);	
      _text_html.css({
           "width": settings.textWidth ,
           "height": settings.textHeight ,
           "margin":"2px",
           "display":"inline"
      })

      // 생성되는 div 버튼 wrap
      var _button_html = $("<div>").addClass(settings.buttonClass);
      _button_html.css({
        "position": "absolute",
        "display": "inline",		
        "width" :			settings.buttonWidth ,
        "height" :		settings.buttonHeight ,
        "background" :	(settings.buttonImage != "")? "url("+settings.buttonImage+") 0 0 no-repeat" : "none" ,
        "overflow": "hidden"				  
      });
      // 이미지가 없을때 글자로 변경	 "buttonText"속성 사용
      if(settings.buttonImage == ""){ 
        _button_html.prepend(settings.buttonText)
      }

      // 속성 적용
      $(self).before(_text_html);
      $(self).wrap(_button_html);
      $(self).css({
        "position": "absolute",
        "top": "0",
        "left": "0",
        opacity: 0, 
        height:	 settings.buttonHeight,
        "margin-left": (/chrome/i.test(browser))? "-75px" : "-160px",		// 크롬일때 / 크롬이 아닐때
        "overflow":"hidden", 
        "cursor": "pointer" 
      });
      // 파일 경로 값넣기
      $(self).on("change", function(){ 
        var _val = $(self).val();
        $(self).parent().siblings(".trp_fileName").attr("value" , _val);
      });

        // 접근성 아웃라인 넣기				
      $(self).on("focus",function(){
        if (/chrome/i.test(browser))
        {	// 크롬
            $(self).parent(".trp_fileButton").css( {"outline" : " 2px auto #4d90fe"  });
        }else{	$(self).parent(".trp_fileButton").css( {"outline" : "1px dotted #000" });
        }
      });
      $(self).on("blur",function(){
        $(self).parent(".trp_fileButton").css( {"outline" : "none" });
      });


      });	// return


  };
})(jQuery);




/*  trpCheckBoxAllsImg      : 전체 선택 체크 박스
    @param	$checkAll			  : 전체 체크박스 선택자
    @param	$checkItem			: 개별 체크박스 선택자
    @param	$itemParent			: 아이템 부모
*/
jQuery.fn.trpCheckBoxAllsImg = function($checkAll, $checkItem, $itemParent){
	var _wrap = this;										// 컨테이너
  var _itemParent = ".checkbox-box";
  if ( $itemParent ) { _itemParent = $itemParent }

  /* 전체 선택 */
  $(_wrap).on("change", $checkAll , function(){ 
      if($(_wrap).find($checkAll).prop( "checked" )){
          $(_wrap).find($checkItem).prop('checked', true);
          $(_wrap).find($checkAll).parent().addClass("on");
          $(_wrap).find($checkItem).parent().addClass("on");
      }else{
          $(_wrap).find($checkItem).prop('checked', false);
          $(_wrap).find($checkAll).parent().removeClass("on");
          $(_wrap).find($checkItem).parent().removeClass("on");
      }
  });

  /* 개별 선택 */
  $(_wrap).on("change", $checkItem, function(){
      var n = $(_wrap).find($checkItem + ":checked").length;
      
      // all
      if ( n >= $(_wrap).find($checkItem).length ){
          $(_wrap).find($checkAll).prop('checked', true);
          $(_wrap).find($checkAll).parent().addClass("on");
      }else{
          $(_wrap).find($checkAll).prop('checked', false);
          $(_wrap).find($checkAll).parent().removeClass("on");
      }
      // item
      //if ( !$(this).parent().hasClass("on") ){
      if ( $(this).prop( "checked" ) ){
          $(this).closest(_itemParent).addClass("on");
      }else{
          $(this).closest(_itemParent).removeClass("on");
      }

  });
}
/* //전체 선택 체크 박스 */



/*  trpCheckBoxAlls             : 전체 선택 체크 박스
    @param	$checkAll			: 전체 체크박스 선택자
    @param	$checkItem			: 개별 체크박스 선택자
*/
jQuery.fn.trpCheckBoxAlls = function($checkAll, $checkItem){
	var _wrap = this;										// 컨테이너

    /* 전체 선택 */
    $(_wrap).on("click", $checkAll , function(){
        if($(_wrap).find($checkAll).prop( "checked" )){
            $(_wrap).find($checkItem).prop('checked', true);
        }else{
            $(_wrap).find($checkItem).prop('checked', false);
        }
    });

    /* 개별 선택 */
    $(_wrap).on("click", $checkItem, function(){
        var n = $(_wrap).find($checkItem + ":checked").length;
        if ( n >= $(_wrap).find($checkItem).length ){
            $(_wrap).find($checkAll).prop('checked', true);
        }else{
            $(_wrap).find($checkAll).prop('checked', false);
        }
    });
}
/* //전체 선택 체크 박스 */



/*  trpLimitText                    : 전체 선택 체크 박스
    @options	:maxByte			: 최대 바이트
    @options	:currentEle			: 현재 값표시 테그선택자
    @options	:totalEle			: 현재 전체표시 테그선택자
    @options	:onMaxReturn($max)  : 초과시 호출함수
*/
jQuery.fn.trpLimitText = function( options ){
    var _this = this,
        strValue  = $(_this).val(),         // 문자열값
        len       = 0,                      // 문자길이 카운트
        oneChar   = "",                     // 국,영 한글자      
        str2      = "",                     // 잘라낸 문자열
        totalByte =  0;                     // 현제 합산 바이트
    var strLen    = strValue.length;        // 문자열길이

    var settings = {
        maxByte   :  0,                     // (필수)max 길이
        currentEle: "",                     // (필수)현재 값표시 테그선택자
        totalEle  : "",                     // (필수)현재 전체표시 테그선택자
        onMaxReturn:function(){ return true;} // 초과시 호출함수
    };
    settings = jQuery.extend(settings, options || {});


    function count_text(){
        for (var i = 0; i < strLen; i++) {
            oneChar = strValue.charAt(i);
            if (escape(oneChar).length > 4) {
                totalByte += 2;
            } else {
                totalByte++;
            }

            // 입력한 문자 길이보다 크면 잘라내기 위해 길이저장
            if (totalByte <= settings.maxByte) {
                len = i + 1;
            }
        }
        if(settings.currentEle == undefined || settings.totalEle == undefined ) { return; }
        // 넘어가는 글자를 자른다.
        if (totalByte > settings.maxByte) {
            str2 = strValue.substr(0, len);
            strValue = str2;
            $(_this).val(strValue);
            // 자른상태로 다시 보기      
            
            settings.onMaxReturn(totalByte);
            return;
        }

        $(settings.currentEle).text(totalByte );
        $(settings.totalEle).text(settings.maxByte);
    };
    count_text();

    return {}; // return//

};



    
/*  trpDropdown         : TRP 드롭다운
    @options	list			: 보여질 리스트
    @options	area			: 아이템 영역
*/
$.fn.trpDropdown = function(options){
  var _this = this,
      _thisArea = "",
      list ="",       // 보여질 리스트
      area ="";       // 아이템 영역 ( Dropdwon 중복되지 않은는 부모 영역 )
  var settings = {
      list : ".trp-dropdown_list-box",   // (필수) 보여질 리스트
      area : ".trp-dropdown-area",       // (필수) 아이템 영역 ( Dropdwon 중복되지 않은는 부모 영역 )
    };
    settings = jQuery.extend(settings, options || {});

    
    $(_this).on("click", function($e){   
      if( $(this).hasClass("active") ){        
          $(this).removeClass("active");
      }else{ 
          _thisArea = $(this).closest(settings.area);          
          $(this).addClass("active");
          $(settings.list, _thisArea).show();
          setTimeout(closeEvent, 100);
      }
    }) 
    function closeEvent() { 
      $('html > *').on("click", function ($e) {
          $e.preventDefault();
          var _close_list = $(settings.list).attr("data-trp-focusid");
          var _tarGet_list = $($e.target).closest(settings.list).attr("data-trp-focusid");
          //console.log(_close_list, _tarGet_list)
          if ( _close_list != _tarGet_list ){
              $(_this).removeClass("active");
              $(settings.list, settings.area).hide();
              $('html > *').off("click");
          }
      });
    }
    return {
		getOpen: function($index) {
            $(_this).on("trigger");
        },
		getClose: function($index) {
            console.log(_this)
		    $(_this).removeClass("active");
            $(settings.list, settings.area).hide();
            $('html > *').off("click");
		}
	} 
}




/*
  trpTip                    : 툴팁        
  @options	tipArea			: 툴팁 최상단 컨테이너
  @options	tipWrap			: 툴팁 pop 선택자
*/
$.fn.trpTip = function( options ){
  var _this			= this;				// 툴팁 열기		버튼
  var _upB          = false;            // 툴팁 위로갈때
  var settings = {
    tipArea : document,        		    // 툴팁 wrapper
    tipWrap : ".trp-tip-wrap",          // 툴팁 wrapper 선택자
  };
  if( options ) { $.extend(settings, options) }else{ var options="" };  // 빈값을넣어 비교시오류 막음


  // 도트 위치 , 툴팁 X
  function tipPosition_dot($tar){
    var _tar = $($tar).offset();            // $tar 위치
    _tar.width  = $($tar).outerWidth();     // $tar 크기
    _tar.height = $($tar).outerHeight();    // $tar 크기

    if( _upB ){
      $(settings.tipWrap).addClass("up");

      $(".trp-dot", settings.tipWrap).css({ top: (_tar.top), left: (_tar.left + (_tar.width / 2)) })
    }else {
      $(settings.tipWrap).removeClass("up");
      $(".trp-dot", settings.tipWrap).css({ top: (_tar.top + _tar.height), left: (_tar.left + (_tar.width / 2)) })
    }

  }


  // 툴팁위치 
  function tipPosition_tip($tar){    
    var _tar = $($tar).offset();            // $tar 위치
    _tar.width  = $($tar).outerWidth();     // $tar 크기
    _tar.height = $($tar).outerHeight();    // $tar 크기      

    var _tip = new Object();                                                        // 툴팁  위치 크기
    $(".trp-tip", settings.tipWrap).css({ left : "auto", right : "auto",  "max-width" : "none"});     // 초기화
    _tip.top    = _tar.top + _tar.height ;
    _tip.left   = _tar.left - ( $(".trp-tip", settings.tipWrap).outerWidth() / 2 ) + (_tar.width / 2);     // 중앙 정열 툴팁 : 타겟.left  - ( 툴팁.width / 2 ) + (타겟.width/2)
    _tip.right  = "auto";                                                     
    _tip.width  = "initial";                                                // 툴팁.width 
    _tip.height = $(".trp-tip", settings.tipWrap).outerHeight();            // 툴팁.height

    /* 툴팁 위로 올라갈경우 
      (if) 부모.height <= ( tip.top + tip.height ) 
    */
     console.log( $(settings.tipArea).height(), _tip.top , _tip.height );
    if( $(settings.tipArea).height() <= (_tip.top + _tip.height) ){
      console.log("upupup");
      _upB = true;
      $(settings.tipWrap).addClass("up");
      _tip.top = _tar.top - _tip.height;
    }else {
      _upB = false;
      $(settings.tipWrap).removeClass("up");
    }

    /* (if) 부모.width <= ( tip.lef + tip.width ) */
    if( $(settings.tipArea).width() <= ( _tip.left +  $(".trp-tip", settings.tipWrap).outerWidth() ) ){              // 
      /*console.log( "rrr");*/
      _tip.left   = "auto";
      _tip.right  = $(settings.tipArea).width() - (_tar.left + _tar.width);         // 부모크기 - (타겟.left + 타겟 width )
      _tip.width  = ( $(settings.tipArea).width() - _tip.left  - 10 ); 
    }else if( _tip.left <= 0 ){
      /*console.log( "lll");*/
      _tip.left   = _tar.left;
      _tip.right  = "auto";
      _tip.width  = ( $(settings.tipArea).width() - _tip.left  - 10 ); 
    }else{ /*console.log("ccc");*/ }

    $(".trp-tip", settings.tipWrap).css({"top":_tip.top , "left":_tip.left , "right":_tip.right , "max-width":_tip.width });
  }


  // 툴팁 열기
  function tipOpen($tar){        
    /* 툴팁 data 넣기 */
    if($($tar).data("tip")){
      // data-tip : text 
      $(".trp-tip .trp-tip_con", settings.tipWrap).remove();
      $(".trp-tip .con",  settings.tipWrap).text( $($tar).data("tip") );
    }else{ 
      // .trp-tip_con : container
      $(".trp-tip .con", settings.tipWrap).text("");
      $(".trp-tip_con" ,$tar).clone().appendTo( settings.tipWrap + ' .trp-tip .con' );                  ///////////////////////////
    }
    $(settings.tipWrap).show();  
    tipPosition_tip($tar);
    tipPosition_dot($tar);
  }

  // 툴팁 닫기
  function tipClose(){
    $(settings.tipWrap).hide();  
  }
  
  // hover 이벤트 생성
  $(_this).on("mouseover", function(){
    tipOpen(this);
  });
  $(_this).on("mouseout", function(){           
    tipClose();
  });
  
  

  return {
    open: function($this){
      tipOpen($this);
    },
    close: function(){
      tipClose();
    }, 
    position: function($tar){
      tipPosition_tip($tar);
      tipPosition_dot($tar);
    },
    resetEvent: function($this){
      // 이벤트가있을때 hover 이벤트 삭제 // mouseover mouseout / mouseenter mouseleave
      var checker = $._data($(_this)[0], "events");
      //console.log(checker);
      if(checker && checker.mouseover){
        $(_this).off("mouseover mouseout");
      }
      //console.log(checker);
    },
  }

}







/* 카운트 UI  
<span class="ui-count">
	<input type="text" class="ui-countTxt" value="1" min="1" max="5">
</span>
$('.ui-count').uiCount();
*/
$.fn.uiCount = function(options){
	var settings = {
			initCount:0,
			onComplete:function(){ return true;}
	};
	settings = jQuery.extend(settings, options || {});
	function fill_num(num, count) {
	num = num + '';
	return num.length >= count ? num : new Array(count - num.length + 1).join('0') + num;
}
	return this.each(function() {
	var _this=  $(this),
		_wrap = $(this).closest(".ui-count"),
		countTxt = $('input.ui-countTxt',_this),
		_min, _max,
		_count;
		
	if( $(_this).find('input.ui-countTxt').attr("min") != undefined ){
		_min =  parseInt( $(_this).find('input.ui-countTxt').attr("min") );
	}else { _min = 0}
	if( $(_this).find('input.ui-countTxt').attr("max") != undefined ){
		_max = parseInt( $(_this).find('input.ui-countTxt').attr("max") );
	}else { _max = 9999; }

	function setLayout() {
		_this.append("<a href='#' class='arrow_up'><span class='blind'>up</span></a>");
		_this.append("<a href='#' class='arrow_down'><span class='blind'>down</span></a>");
		checkVal();
	}
	function checkVal() {
		_count = (countTxt.val().length) ? parseInt(countTxt.val()) : 0;
		_count = isNaN(_count) ? 0 : _count;
		if( _min == 00 ){ countTxt.val( fill_num(_count, 2) ); }else{ countTxt.val(_count); }
	}

	function upCount(){
		_count = parseInt(countTxt.val())+1;
		_count = (_count > _max) ? _max : _count;
		if( _min == 00 ){ countTxt.val( fill_num(_count, 2) ); }else{ countTxt.val(_count); }
	}
	function downCount(){
		_count = parseInt(countTxt.val())-1;
		_count = (_count > _min) ? _count : _min;
		if( _min == 00 ){ countTxt.val( fill_num(_count, 2) ); }else{ countTxt.val(_count); }
	}
	function addEvent(){			
		$(_wrap).on('click', '.arrow_up', function() {
			upCount(); //countTxt.focus();
			return false;
		});
		$(_wrap).on('click', '.arrow_down', function() {
			downCount(); //countTxt.focus();
			return false;
		});
		$(_wrap).on('mousewheel', function(e) {
			e.preventDefault();
							var E = e.originalEvent;
							delta = 0;
			if(E.detail) { delta = E.detail * -40; /* 파폭 */ }else{ delta = E.wheelDelta; };
			if( delta > 0){ upCount() }else{ downCount() };
					});
		countTxt.off().on('change', checkVal);
	}

	var init=function() { 
					// 테그가생성되었으면 다시 실행하지 않는다.  
					//$(_wrap).find(".arrow_down).click(function(){ alert("click");});
					if( $(_this).find("a").hasClass("arrow_down" ) ){
							return false; 
					}
		setLayout();
		addEvent();
	}();
});
}
/* //카운트 UI  */

/* trpTimepicker */
$.fn.trpTimepicker = function(options){
var _this = this, _hours, _minute, _ampm;
var _timeEL = 
_timeEL = '<div class="trp-timepicker am" >';
_timeEL += '<span class="ui-count">';
_timeEL += '<input type="text" class="ui-countTxt hours" readonly value="1" min="1" max="12" title="mouse wheel">';
_timeEL += '</span>';
_timeEL += '<span class="ui-count" minute>';
_timeEL += '<input type="text" class="ui-countTxt minute" readonly value="00" min="00" max="59" title="mouse wheel">';
_timeEL += '</span>';
_timeEL += '<button class="btn ui-ampm" data-ampm="AM" ><span>AM</span></button>';
_timeEL += '</div>';
$(_this).append(_timeEL);

function upDate_time(){ 
	_hours  = $(".trp-timepicker .hours", _this ).val();
	_minute = $(".trp-timepicker .minute", _this ).val();
	_ampm   = $(".trp-timepicker .ui-ampm", _this ).attr("data-ampm");
	$(".timepicker-box input", _this ).val( _hours + " : "+ _minute+ " : " + _ampm);
}

$(".timepicker-box", _this ).on("click", function($e){		
	$(".trp-timepicker", _this ).addClass("on").show();		
});

$(document).on("click", function (t) { 
	if ( $(".trp-timepicker", _this ).hasClass("on") ){
		var n = $(t.target);
		upDate_time();
		if (!n.parents().hasClass("timepicker-area")){
			$(".trp-timepicker", _this ).removeClass("on").hide();
		} 
	}
});


$('.ui-count').uiCount();  
$(".trp-timepicker", _this).on("click", ".ui-ampm", function() { 		
	$(".trp-timepicker").toggleClass("am");
	$(".trp-timepicker").hasClass("am")? $(this).attr("data-ampm", "AM").find("span").text("AM"): $(this).attr("data-ampm", "PM").find("span").text("PM");
});
$(".trp-timepicker .ui-count a", _this ).on("click", function(){
	setTimeout( upDate_time , 10);
} );
$(".trp-timepicker .ui-count", _this).on('mousewheel',  upDate_time );
}

