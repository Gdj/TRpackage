/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.1
 * release date : 2020.12.22
 * author		: http://turfrain.tistory.com/
 * Copyright 2020. turfrain all rights reserved.
 *
 */


/*
* ie 11 이상  콤마 넣기 
  Number(3000.98329832).toLocaleString('en');
*/

/**
* trpNumCommas			: 숫사 컴마 숫자를 넣으면 3자리수마다 "," 있는 문자열을 리턴
* @param {String} $x	: 문자 값변수   (필수)
*/
function trpNumCommas($num) {
    return $num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/**
* trpNumberFormat		: 숫자를 넣으면 3자리수마다 "," 있는 문자열을 리턴
*  @param {String} $num	: 문자 값변수   (필수)
*/
function trpNumberFormat($num) {
  var arr = $num.toString().split("."); 
  return arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (arr[1] ? "." + arr[1] : "");
}



/** 
 * trpRangeRatio			:  참고값을 비레해 타겟값을 추출
 *			                   $rMin 값과 $rMax 값의 $ref 위치를 비율을    
                               $tMin 값과 $tMax 값의 에서 같은 비율로 찾아줍니다.
 * 			
 * @param	$rMin			: Refer 참고 최소 값		
 * @param	$rMax			: Refer 참고 최대 값	
 * @param	$ref			: Refer 참고 변화 값
 * @param	$tMin			: target타겟 최소값
 * @param	$tMax			: target타겟 최대값 
 * @return					: 참고값을 비레해 타겟값을 추출; 
 */
function trpRangeRatio($rMin, $rMax, $ref, $tMin, $tMax ){

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














/**
 * trpNumReturn($val, $default)	    : 숫자 값인지를 체크해서 값이 없으면 기본값(0)을 리턴
 * @param {Number}  [$val=0]		: 숫자 값변수	   (필수)
 * @param {Number}  $default        : 값이 없을때 리턴값 (선택)
 * @returns {Number}                : 가본값을 던지면 기본값으로, 
 */
function trpNumReturn($val, $default){
	if ($val == undefined){
		$val = 0;
		if ($default){$val = $default;}
	}
	return $val;
}


/**
 * trpStrReturn		           : 문자 값이 있는지를 판단하여 값이없으면 기본값("")을 리턴한다.
 * @param   {string} $val	   : 문자 값변수   (필수)
 * @param   {string} $default  : 값이 없을때 리턴값 (선택)
 * @returns {string}           : 가본값을 던지면 기본값으로, 
 */
function trpStrReturn($val, $default){
	if ($val == undefined){
		$val = "";
		if ($default){$val = $default;}
	}
	return $val;
}


