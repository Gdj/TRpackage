/**
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.74
 * release date : 2020.05.18
 * author		: http://turfrain.tistory.com/
 * Copyright 2020. turfrain all rights reserved.
 */


'use strict';




/* ie브라우저 검사 */
jQuery.browser={};(function(){jQuery.browser.msie=false;jQuery.browser.version=0;if(navigator.userAgent.match(/MSIE ([0-9]+)\./)){jQuery.browser.msie=true;jQuery.browser.version=RegExp.$1;}})();



/**
 * trpScrollTop		: 
 * @param $tar   	: 타켓위치로 이동   (필수)
 * @param $add      : 타겟위치에서 가감 (선택)
 */
function trpScrollTop($selector, $add){
  var _position = $($selector).offset();
  var _val; 
  if( $add ){_val = $add;}else{ _val = 0; }
  $( 'html, body' ).animate( { scrollTop: (_position.top + _val) }, 500 );
};


/**
 * date : 20141105
 * trpBrowser		: 브라우저 정보를 리턴함.
 * @method name		: 브라우저 이름
 * @method version	: 브라우저 버젼
*/ 
var trpBrowser = (function() {
	var s = navigator.userAgent.toLowerCase();
	var match
		match =	  /(opr)[ \/]([\w.]+)/.exec(s) || 					// 오페라
				  /(chrome)[ \/]([\w.]+)/.exec(s) || 				// 크롬
				  /(version)[ \/]([\w.]+)/.exec(s) ||				// 사파리					
				  /(msie) ([\w.]+)/.exec(s) ||						// ie  
				  /(appleWebKit)[ \/](\w.]+)/.exec(s) ||			// 웹킷
				  /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||		// 모질라(파이어폭스)
				 [];
	// *ie11버젼 	"msie" 없어짐.
	if(navigator.msManipulationViewsEnabled) {     match[1]= "msie"; };
	// *사파리
	if(match[1]== "version") {     match[1]= "safari"; };

  return { name: match[1] || "", version: match[2] || "0" };
}());



/**
*  trpClassBubbleCheck : 클릭 이벤트로 타겟 대상의 부모클래스가 있는지를 체크
*  @param	{String}   $classNmae	
*  @param	{function} $activeFn(boolean)
*/
function trpClassBubbleCheck( $className, $activeFn){     
   
	$(document).on("click", function ($e) {
        var _true_false = false;
        if($($e.target).closest($className).length){
                _true_false = true;
        }else{
                _true_false = false;
        }
        $activeFn(_true_false);
	});   
}



/** 
 * trpUtilityChangeOnceFN	: 값이 달라질때 1번만 실행함수   ===> jQuery.fn.trpUtilityChangeOnceFn
 * @param	$value			: 변동되는 값		
 * @param	$activeFn		: 실행할 함수
*/
var trpUtilityChangeOnce_newVal;
var trpUtilityChangeOnce_oldVal = "";
function trpUtilityChangeOnceFN($value, $activeFn){
    trpUtilityChangeOnce_newVal = $value;
    //console.log( trpUtilityChangeOnce_newVal + " :  " + trpUtilityChangeOnce_oldVal)
    if(trpUtilityChangeOnce_newVal == trpUtilityChangeOnce_oldVal){ return;}
    $activeFn(trpUtilityChangeOnce_newVal);
    trpUtilityChangeOnce_oldVal = trpUtilityChangeOnce_newVal;
}// end fn





/**
*  trpUtilityChangeOnceFn  	    : 함수 한번만 실행
* @param	$functionTrue	    : 실행되는 함수
* @method   setChange(boolean)	: true, false 값넘기기
* ex)
* var onceFn = $("body").trpUtilityChangeOnceFn(function(){console.log("aaa")}, function(){ console.log("bbb")})
* onceFn.setChange(true);
*/
jQuery.fn.trpUtilityChangeOnceFn = function($functionChange) {
	var _oldChang = undefined;
	var _change   = "";
    function onceFn($change) { 
		$functionChange();   // console.log("true" , $change);
		_oldChang = $change;
	}
	return {
		/*  setChange 
			* @param	$change	 
		*/
		setChange: function($change) { 
			if(_oldChang != $change){ onceFn($change); }
		}
	}
}



/**
*  trpUtilityChangeOnceFnFn	    : 함수 한번만 실행
* @param	$functionTrue	    : true 일때 실행되는 함수
* @param	$functionFalse	    : false 일대 실행되는 함수
* @method   setBoolean(boolean)	: true, false 값넘기기
* ex)
* var onceFn = $("body").trpUtilityChangeOnceFn(function(){console.log("aaa")}, function(){ console.log("bbb")})
* onceFn.setBoolean(true);
*/
jQuery.fn.trpUtilityChangeOnceFnFn = function($functionTrue, $functionFalse) {
    var _onlyFnB = undefined;
    var _firstB  = true;
    function onceFn($boolean) { 
        if ($boolean) {            // true 실행;
            if (_onlyFnB) {        // 1번실행;
                $functionTrue();   // console.log("true" , _onlyFnB);
                _onlyFnB = false;
            }
        } else {                   // flase 실핼;
            if (!_onlyFnB) {       // 1번실행;
                $functionFalse();  // console.log("false" , _onlyFnB);
                _onlyFnB = true;
            }
        }
    }
    return {
			/*  setBoolean 
				* @param	$boolean	 
			*/
        setBoolean: function($boolean) { 
            if(_firstB){
                _onlyFnB = $boolean;
                _firstB = false;
            }
            onceFn($boolean);
        }
    }
}



/*
* trpRemoveClassPrefix          : 특정문자열로 시작되는 클래스 삭제
* @param	$prefix			    : 특정문자열
*/
jQuery.fn.trpRemoveClassPrefix = function($prefix) {
    this.each(function(i, el) {
        var classes = el.className.split(" ").filter(function(c) {
            return c.lastIndexOf($prefix, 0) !== 0;
        });
        el.className = $.trim(classes.join(" "));
    });
    return this;
};





