/*
 * Base			        : jQuery JavaScript Library v1.12.1
 * trPackage	        :
 * trpArrayUtitlsFn	    : v0.1
 * release date         : 2020.12.22
 * author		        : http://turfrain.tistory.com/
 * Copyright 2020. turfrain all rights reserved.
 */



/**
* trpShuffle		: 배열을 넘기면 랜덤하게 섞어서 리턴
* @param $arr		: 배열   (필수)
* @returns [Array]  : 석인 배열
*/
function trpShuffle($arr){
	var j, x, i, re_arr=JSON.parse(JSON.stringify( $arr ));;
    for (i = re_arr.length; i; i -= 1) {
      j = Math.floor(Math.random() * i);
      x = re_arr[i - 1];
      re_arr[i - 1] = re_arr[j];
      re_arr[j] = x;
    }
  return re_arr;
}


/* 
* trpArrTper        : 배열의 최대값으로 각각의 백분율 퍼센트배열 리턴 (소숫접 2재짜리까지)
* @param $arr		: 숫자 배열   (필수)
* @returns [Array]  : 100분율 배열값 
*/
/* var aa = [345,5674,243,876,45,678]; */
function trpArrTper($arr){
  var _max = $arr.reduce( function (previous, current) { 
   return previous > current ? previous:current;
   // min : return previous > current ? current:previous;
 });
 var _reArr = [];
 for( var i=1 ; i <= $arr.length ; i++ ){
   _reArr.push( Math.floor($arr[i-1]/_max * 10000)/100 ); 
 }
 return _reArr;
}


/* 
* trpMaxTper        : 최대 값으로 비교해 각가의 퍼센티지계산
* @param $arr		: 숫자 배열   (필수)
* @param $max		: 최대값 숫자 (필수)
* @returns [Array]  : 100분율 배열  
*/
function trpMaxTper($arr, $max){
  var _reArr = [];
 for( var i=1 ; i <= $arr.length ; i++ ){
   _reArr.push( Math.floor($arr[i-1]/$max * 10000)/100 ); 
 }
 return _reArr;
}


/* 
* trpArrMax         : 배열중 최대값 리턴
* @param $arr		: 숫자 배열 (필수)
* @returns Number   : 최대값
*/
function trpArrMax($arr){
  var _max = $arr.reduce( function (previous, current) { 
    return previous > current ? previous:current;
    // min : return previous > current ? current:previous;
  });
  return _max;
}


/* 
* trpArrMaxIndex    : 배열중 최대값의 Index를 리턴
* @param $arr		: 숫자 배열 (필수)
* @returns Number   : 최대값 Index
*/
function trpArrMaxIndex($arr){
  if ($arr.length === 0) { return -1; }
  var max = $arr[0];
  var maxIndex = 0;
  for (var i = 1; i < $arr.length; i++) {
    if ($arr[i] > max) {
      maxIndex = i;
      max = $arr[i];
    }
  }
  return maxIndex;
}


/* 
* trpArrAve         : 배열 평균값을 리턴
* @param $arr		: 숫자 배열 (필수)
* @returns Number   : 배열 평균값
*/
function trpArrAve($arr){
  var _total = 0;
  for (var i = 0; i <= $arr.length - 1 ; i++){
    _total += $arr[i];
  }
  //console.log( "_total : "+ _total )
  //console.log( "_Ave : "+ (_total / $arr.length) )
  return (_total / $arr.length);
}


/* 
* trpArrSum         : 배열값 합산
* @param $arr		: 숫자 배열 (필수)
* @returns Number   : 배열 합산
*/
function trpArrSum($arr){
  var _total=0; 
  for( var i=0 ; i <= $arr.length-1 ; i++ ){
    _total += $arr[i];
  }
  return _total;
}

