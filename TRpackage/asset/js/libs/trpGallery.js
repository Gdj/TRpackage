/*
 * trPackage	 
 * trpGallery  	: v0.7
 * release date : 2017.02.17
 * Requires		: jQuery JavaScript Library v1.12.1 
 * 이 모듈은  http://code.jQuery.com/jquery-1.12.1.js 모듈의 animate()등의 함수를사용하 였습니다.    
 * 이 모듈은  http://code.jquery.com/ui/1.12.1/jquery-ui.js 모듈의 "easeInOutCubic" 등의 함수를사용하 였습니다.
 * author		: http://turfrain.tistory.com/
 * Copyright 2017. turfrain all rights reserved.
 *
 */

/** 
 //(example)
 
 <script type="text/javascript">
			$(document).ready(function(){
				//================  1. 이미지 데이터 ===================
				var totalImage=11;					// 이미지 겟수
				var imgM_W = 480 , imgS_W = 144;	// 이미지 width
				var imageDataM 		= repeatArray(totalImage, "m" 		, ".jpg");		// 큰이미지 배열
				var imageDataS 		= repeatArray(totalImage, "s_m" 	, ".jpg");		// 섬네일(thumbnail) 이미지 배열
				
				var imageData 		= new ObjData("imgM","imgS");				
				var objData = imageData.values(imageDataM,imageDataS);
				//	for (var f=0; f<totalImage; f++) {			console.log(objData[f]);		};		  //  objData 테스트 데이터
																
				//================  2. 이미지 배치 ===================
				 // 메인이미지 배치
				 createImageTag("mainViewContainer" 	,"slider_m", "메인이미지"		,"image/" , imageDataM ,imgM_W );
				 // 섬네일 이미지 배치
				 createImageTag("thumbNailViewContainer","slider_s", "섬네일이미지"		,"image/" , imageDataS ,imgS_W );
				
				//================  3. 섬네일 버튼 설정 =================== #thumbNailView >				
				var galeryMain 		= new trpGallery("mainViewContainer"		,"slider_m");
				var galeryThumbNail = new trpGallery("thumbNailViewContainer"	,"slider_s");
				galeryThumbNail.setThumbNailBtn( function(index){
					//console.log("index : "+ index);
					//galeryMain.motionEnd(index,1);
					galeryMain.motionOverlap(index,1);					
				});		   
			   
				//================  4. 화살 버튼  =================== 
				$("#arrowL").click(function(){
					//galeryThumbNail.motionEnd( (galeryThumbNail.index -1) ,3  );
					galeryThumbNail.motionLoop( (galeryThumbNail.index -2)  );
				})	
				$("#arrowR").click(function(){					
					//galeryThumbNail.motionEnd( (galeryThumbNail.index +1) ,3  );
					galeryThumbNail.motionLoop( (galeryThumbNail.index +2) );					
				})
					
			}) // ready			
		</script>

 */

/*====================================== 이미지 데이터 만드는 함수 =================================*/

/**
 * repeatArray					: 반복되는 것을 배열로
 * @param {number} total		: 총 이미지겟수
 * @param {string} repeatName   : 반복되는 이름 		(m0 ,m1 ,m2 => "m")
 * @param {string} repeatName2  : 덛붙이는 반복 이름 	(m0.jpg ,m1.jpg ,m2.jpg => ".jpg")
 */
 function repeatArray(total,repeatName,repeatName2){
	var array=[];
	for (var i=0 ; i<total ; ++i)
	{
		array.push(  repeatName+i+repeatName2);		
	}
	return array;		
}

/*====================================== json 데이터 만드는 함수 =================================*/

/**
 * 키값 (key1,key2,...)  
 * @param {array} args : 키 배열값
 */
function ObjData(){
	this.keys = Array.prototype.slice.call(arguments);   // 배열로 변환	
}


/**
 * 키값에 대응되는 값 ( [key1value1, key1value2,.. ] , [ key2value1,key2value2,..] ,...  )  
 * @param {array} value : 값 배열 
 */
ObjData.prototype.values=function(){	
	var datas 		= [];							// 
	var values 		= arguments;					// 키의 대응되는 값 
	var total_key 	= this.keys.length;				// 키값 겟수
	var total_val 	= arguments[0].length;			// 첫번째 요소의 겟수 = 데이터 겟수
	
	for(var i=0  ; i<total_val ; ++i ){
	
		var dataObj		= {};				
		for(var j=0   ; j<total_key ; ++j ){			
			var keyName = this.keys[j];			
			dataObj[keyName]	= 	arguments[j][i];		
		}
		//console.log(dataObj)
		datas.push(dataObj);
	}
	//console.log(datas[0].imgM)
	return datas;
}


/*====================================== imgTag 만들기 =================================*/
/**				
 * @param {string} wrapSelector		: 이미지넣을 태그 ID
 * @param {string} itemSelector	: 이미지 클래스이름
 * @param {String} introduction : alt 메세지
 * @param {String} path			: 이미지경로
 * @param {Object} fileNameArr	: 파일이름 배열
 */				
function createImageTag(wrapSelector , itemSelector , introduction , path , fileNameArr ,imageWidth) {
    var imgData = "";
	var total=fileNameArr.length;
    for (var k=0  ; k<total ;++k){		             
		imgData += '<li class="' +itemSelector+ '" index_data="'+ k +'" ><img src="' + (path+fileNameArr[k]) + '" alt="' + introduction + '" /></li>'						
    }					
    $( ("#"+wrapSelector) ).append(imgData);							// 테그에 이미지테그 넣기
	                
	// 스타일 적용
	$( ("."+itemSelector) ).css("display", "inline" );				// div inline	
	//$( ("."+itemSelector) ).css("float", "left" );				// float:left;
	$(  ("#"+wrapSelector) ).css("width", total*imageWidth );		// 이미지 크기만큼 컨테이너를 늘림 변화
	//var widthW = $( "."+itemSelector ).css("border","#ff0000 solid 1px ") 	
}		

/*====================================== 겔러리 클래스 =================================*/
				/**
				 * trpGallery : 겔러리 클래스
				 * @param {String} $wrapSelector	: item담고있는 select
				 * @param {String} $itemSelector	: item들의 select
				 */
				function trpGallery($wrapSelector, $itemSelector){
					/*============ 속성  ============*/
					this.wrapSelector 	= $($wrapSelector);
					this.itemSelector 	= $($itemSelector);
					this.index = 0;									// 인텍스
					this.viewNum = 1;								// 보여지는 이미지겟수
					this.total = $(this.itemSelector).length;      // 아이템 겟수
					this.oldIndex = 0;
					
					
					for( var $i = 0 ; $i < this.total ; ++$i ){						
						this.itemSelector.eq($i).attr("data-index" , $i);
					}
					/*============ 메서드 ============*/
					/**
					 * 	타입 검사
					 * @param {Number} index 	: 인덱스
					 * @param {Number} viewNum  : 보이는 영역겟수
					 */				
					this.typeValidation = function(index,viewNum){
						
						// 타입 검typeValidation
						if( index 	== undefined 	|| index=="" 	|| index 	== isNaN	){index  = 0};  // 인덱스 검사 기본값
						if( viewNum == undefined	|| viewNum==""	|| viewNum 	== isNaN	){viewNum=1};   // 보여지 겟수 검사 기본값
						if( viewNum > this.total)throw new Error("아이템 겟수("+ this.total +")보다  보이는 영역의 겟수("+ viewNum +")가 더 크면 안됩니다.");				
						this.index 		= index;
						this.viewNum 	= viewNum;							
					}
				}
				
				/* 실패  
				trpGallery.prototype.setResize = function (){
					$(document).resize(function(){
						this.wrapSelector.css({ width: (this.total* this.wrapSelector.width() ) });
					});
						var _all_width;
						this.itemSelector.css(	{ width: "100%" , "text-align":"left" }             );
						
						_all_width =  this.itemSelector.width() * this.total;
						console.log( this.itemSelector.width() + " * " + this.total +" = "+ _all_width )

						this.wrapSelector.css(	{ width: _all_width }   );
						
						
				}*/
				

				/**
				 * 겔러리 섬네일 버튼세팅 메소드
				 * @param {function} fn => functionName(index) : 클릭되면 실행될 함수 자동으로 인덱스가 넘어감
				 */
				trpGallery.prototype.setThumbNailBtn = function (fn){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						this.itemSelector.click(function() {
							var index = $(this).index();
							fn(index);
						});
						//this.itemSelector = this.wrapSelector.children();  	
					}// 에니메이션 체크
				}
						
				/**
				 * type1/3 겔러리 모션_정지 메소드
				 * @param {Number} index 	: 인덱스
				 * @param {Number} viewNum  : 보이는 영역겟수
				 */
				trpGallery.prototype.motionEnd = function($index, $viewNum){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						// 값유무 체크 타입 검typeValidation
						this.typeValidation($index, $viewNum);
						
						// 모자란 값 체크
						if(  this.index < 0 ){ this.index = 0 ; return;};
						// 넘치는 값 체크
						if(  this.index > (this.total - this.viewNum) ){ this.index=this.total - this.viewNum; return; };
						
						var distance = this.itemSelector.outerWidth(true);
						var move =  this.index * parseInt(distance);														// parseInt(distance) px 단위를 제거
						//$( this.wrapSelector ).filter(':not(:animated)').animate({left:-move},500 ,"easeInOutCubic" );			// ! 경우에 안맞음.
						this.wrapSelector.stop().animate({left:-move},500 ,"easeInOutCubic" );
						//console.log("index : " + index);

					}	// 에니메이션 체크
				}
				
				/**
				 * type2/3 겔러리 모션_리턴 메소드
				 * @param {Number} index 	: 인덱스
				 * @param {Number} viewNum  : 보이는 영역겟수
				 */
				trpGallery.prototype.motionReturn = function(index , viewNum){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						// 값유무 체크 타입 검typeValidation
						this.typeValidation(index,viewNum);
						
						// 모자란 값 체크
						if(  this.index < 0 ){ this.index = this.total - this.viewNum };
						// 넘치는 값 체크
						if(  this.index > (this.total - this.viewNum) ){ this.index=0; };
						
						var distance = this.itemSelector.width();			// 1칸 움직이는 거리 						
						var move =  this.index * distance;				// 총움직임 거리
						this.wrapSelector.stop().animate({left:-move},500 ,"easeInOutCubic" );					
						//console.log("index : "+ index);
					}					
				}
				
				/**
				 * type 인덱스만 변영하여 저장
				 * @param {Number} index 	: 인덱스				
				 */
				trpGallery.prototype.loopIndex = function(index){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크
						this.oldIndex = this.index;	
						this.index = indexToIndexLoop( index , this.total );
					}					
				}

				/**
				 * type3/3 겔러리 모션_루프 메소드
				 * @param {Number} index 	: 인덱스
				 * @param {Number} viewNum  : 보이는 영역겟수
				 */
				trpGallery.prototype.motionLoop = function(index ){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						this.oldIndex = this.index;						// 이전 인덱스
						var	setp = indexToStep(index,this.oldIndex)		// 스텝					
										
						this.index = stepToIndexLoop(this.oldIndex , setp , this.total );
						var distance = this.itemSelector.width()*setp;			// 움직임 거리 구하기					
						
						//console.log( "처리된값 "+ this.index +" : " + index + " : "+ this.oldIndex +" : " + setp)
						if((setp > 0 )){	// 오른버튼		//console.log("<<<"+ this.itemSelector.first().html());
							this.wrapSelector.filter(':not(:animated)').animate( {left:distance*-1},500 , "easeInOutCubic", function(){
								// 아이템 붙이기
								for (var j = 0; j < setp ; ++j) {
									var temp 		= $(this).children().first();	// 변수담기
									$(this).append(temp);							// 뒤에 넣기
									$(this).css("left" , 0);						// 위치
								}
							} );				
								
						}else{				// 왼쪽버튼		//console.log("<<<"+ this.itemSelector.last().html());
							if ( !this.wrapSelector.is(':animated') ){  												// 모션 중인지를 체크		
								this.wrapSelector.filter(':not(:animated)').css("left" , distance );					// 위치					 	
								this.wrapSelector.filter(':not(:animated)').animate({left:0},500 ,"easeInOutCubic" );// 움직임
								// 아이템붙이기
								for (var i = 0; i < Math.abs(setp) ; ++i) {
									this.itemSelector = this.wrapSelector.children(); // 리스트갱신
									var temp = this.itemSelector.last(); 	// 변수담기
									this.wrapSelector.prepend(temp); 		// 앞에넣기

								}							
							}						
						}
						this.itemSelector = this.wrapSelector.children();	// this.itemSelector 갱신해줘야 함... (this.itemSelector new 생서되서 참조가아닌 복사되는듯 모르겠다.ㅠ)

					}
				}


				/**
				 * type3/3 겔러리 모션_루프 메소드
				 * @param {Number} index 	: 인덱스
				 * @param {Number} viewNum  : 보이는 영역겟수
				 */
				trpGallery.prototype.motionLoop2 = function(index ){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						this.oldIndex = this.index;	 //$("#thumbNailViewContainer li").eq(0).attr("data-index");		// 이전 인덱스

						var	setp = indexToStep(index,this.oldIndex)		// 스텝					
										
						this.index = stepToIndexLoop(this.oldIndex , setp , this.total );
						var distance = this.itemSelector.width()*setp;			// 움직임 거리 구하기					
						
						console.log( "처리된값>>>>>>> "+ this.index +" : " + index + " : "+ this.oldIndex +" : " + setp)
						if((setp > 0 )){	// 오른버튼		//console.log("<<<"+ this.itemSelector.first().html());
							this.wrapSelector.filter(':not(:animated)').animate( {left:distance*-1},500 , "easeInOutCubic", function(){
								// 아이템 붙이기
								for (var j = 0; j < setp ; ++j) {
									var temp 		= $(this).children().first();	// 변수담기
									$(this).append(temp);							// 뒤에 넣기
									$(this).css("left" , 0);						// 위치
								}
							} );				
								
						}else{				// 왼쪽버튼		//console.log("<<<"+ this.itemSelector.last().html());
							if ( !this.wrapSelector.is(':animated') ){  												// 모션 중인지를 체크		
								this.wrapSelector.filter(':not(:animated)').css("left" , distance );					// 위치					 	
								this.wrapSelector.filter(':not(:animated)').animate({left:0},500 ,"easeInOutCubic" );// 움직임
								// 아이템붙이기
								for (var i = 0; i < Math.abs(setp) ; ++i) {
									this.itemSelector = this.wrapSelector.children(); // 리스트갱신
									var temp = this.itemSelector.last(); 	// 변수담기
									this.wrapSelector.prepend(temp); 		// 앞에넣기

								}							
							}						
						}
						this.itemSelector = this.wrapSelector.children();	// this.itemSelector 갱신해줘야 함... (this.itemSelector new 생서되서 참조가아닌 복사되는듯 모르겠다.ㅠ)

					}//  	// 에니메이션 체크
				}
				

				
				trpGallery.prototype.motionLoopY = function(index,$height ){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						this.oldIndex = this.index;						// 이전 인덱스
						var	setp = indexToStep(index,this.oldIndex)		// 스텝								
						this.index = stepToIndexLoop(this.oldIndex , setp , this.total );
						var distance = ($height)?$height*setp : this.itemSelector.height()*setp;			// 움직임 거리 구하기					
						
						if((setp > 0 )){	// 오른버튼		//console.log("<<<"+ this.itemSelector.first().html());
							this.wrapSelector.filter(':not(:animated)').animate( {top:distance*-1},500 , "easeInOutCubic", function(){
								// 아이템 붙이기
								for (var j = 0; j < setp ; ++j) {
									var temp 		= $(this).children().first();	// 변수담기
									$(this).append(temp);							//뒤에 넣기
									$(this).css("top" , 0);						// 위치
								}
							} );				
								
						}else{				// 왼쪽버튼		//console.log("<<<"+ this.itemSelector.last().html());
							if ( !this.wrapSelector.is(':animated') ){  												// 모션 중인지를 체크		
								this.wrapSelector.filter(':not(:animated)').css("top" , distance );					// 위치					 	
								this.wrapSelector.filter(':not(:animated)').animate({top:0},500 ,"easeInOutCubic" );// 움직임
								// 아이템붙이기
								for (var i = 0; i < Math.abs(setp) ; ++i) {
									var temp = this.itemSelector.last(); 	// 변수담기
									this.wrapSelector.prepend(temp); 		// 앞에넣기
									this.itemSelector = this.wrapSelector.children();
								}							
							}						
						}
						this.itemSelector = this.wrapSelector.children();	// this.itemSelector 갱신해줘야 함... (this.itemSelector new 생서되서 참조가아닌 복사되는듯 모르겠다.ㅠ)
					}// 에니메이션 체크
				}	

				/**
				 * type4/3 겔러리 모션_오버랩 메소드
				 * @param {Number} index  : 인덱스
				 */				
				trpGallery.prototype.motionOverlap = function(index){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						// 전체속성
					  var distance = this.itemSelector.width();
					  this.itemSelector.css({ "position":"absolute" , "display":"block" , "left": distance+"px" ,"display":"inline " });			// 아이템 css속성
						// 과거속성
					  this.itemSelector.eq(this.index).css({ "position":"absolute" , "display":"block" , "left":"0px" ,"display":"inline" ,"z-index":"0" });			// 아이템 css속성
						
						// 활성화 속성
					   this.itemSelector.eq(index).css({ "z-index":"100"});
					   this.itemSelector.eq(index).filter(':not(:animated)').animate( { left:0 },500 , "easeInOutCubic"); 
					   this.index = index;		
					}// 에니메이션 체크
				}

				
				/**
				 * type-- 겔러리 모션_루프 메소드
				 * @param {Number} index 	: 인덱스
				 * @param {Number} viewNum  : 보이는 영역겟수
				 */
				trpGallery.prototype.motionLoopDistance = function(index ,viewNum ,margin){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						this.oldIndex = this.index;						// 이전 인덱스
						var	setp = indexToStep(index,this.oldIndex)		// 스텝					
										
						this.index = stepToIndexLoop(this.oldIndex , setp , this.total );
						var distance = (this.itemSelector.width()*setp)+margin ;			// 움직임 거리 구하기					
						
						if((setp > 0 )){	// 오른버튼		//console.log("<<<"+ this.itemSelector.first().html());
							this.wrapSelector.filter(':not(:animated)').animate( {left:distance*-1},500 , "easeInOutCubic", function(){
								// 아이템 붙이기
								for (var j = 0; j < setp ; ++j) {
									var temp 		= $(this).children().first();	// 변수담기
									$(this).append(temp);							// 뒤에 넣기
									$(this).css("left" , 0);						// 위치
								}
							} );				
								
						}else{	// 왼쪽버튼		//console.log("<<<"+ this.itemSelector.last().html());
							if ( !this.wrapSelector.is(':animated') ){  												// 모션 중인지를 체크		
								this.wrapSelector.filter(':not(:animated)').css("left" , distance-margin );			// 위치					 	
								this.wrapSelector.filter(':not(:animated)').animate({left:0},500 ,"easeInOutCubic" );// 움직임
								// 아이템붙이기
								for (var i = 0; i < Math.abs(setp) ; ++i) {
									this.itemSelector = this.wrapSelector.children(); // 리스트갱신
									var temp = this.itemSelector.last(); 	// 변수담기
									this.wrapSelector.prepend(temp); 		// 앞에넣기

								}							
							}						
						}
						this.itemSelector = this.wrapSelector.children();	// this.itemSelector 갱신해줘야 함... (this.itemSelector new 생서되서 참조가아닌 복사되는듯 모르겠다.ㅠ)

					}	// 에니메이션 체크
				}

				/**
				 * type4/3 겔러리 모션_오버랩 메소드
				 * @param {Number} index  : 인덱스
				 */				
				trpGallery.prototype.motionFade = function(index){
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크
						this.oldIndex = this.index;	
						this.index = indexToIndexLoop( index , this.total );
					
					  // 전체속성
					  var distance = this.itemSelector.width();
					  this.itemSelector.css({ "position":"absolute" , "display":"block" , "left": distance+"px" ,"display":"inline " });			// 아이템 css속성
						// 과거속성
					  this.itemSelector.eq(this.oldIndex).css({ "position":"absolute" , "display":"block" , "left":"0px" ,"display":"inline" ,"z-index":"0" });			// 아이템 css속성
						
						// 활성화 속성
					   this.itemSelector.eq(this.index).css({ "z-index":"1" ,"left":"0px"}).hide();
					   this.itemSelector.eq(this.index).filter(':not(:animated)').fadeIn();
				   
					}	// 에니메이션 체크
					
				}						 
/// ==================================================================================================================================

	/** 1
		 * 	indexToIndex			: 새로운 인덱스를 총범위안으로 만듬
		 * @param	$newIndex		: 새로운 인덱스
		 * @param	$total			: 전체 겟수		 
		 * @return					: 범위안의 인덱스
		 */
		function indexToIndexLoop($newIndex , $total){
			var num;			
			num = $newIndex;
			if (num >= $total){			// 클때
				num = (num % $total);
			}else if (num < 0) {		// 작을때
				num = $total- (-num % $total) 
			}else {					
				num = num;			
			}
			return num ;
		}
		
	/**  3
		 *	stepToIndexLoop					: 현재에서 +앞으로 & -뒤로 몇번째 loop 
		 * 	@param $current					: 현재 인덱스값
		 * 	@param $step					: 현재 인덱스에서 몇번째 전후(-,+)
		 * 	@param $total					: 원본 배열길이;
		 * 	return							: 찾는 배열 인덱스값
		 * */		
		function stepToIndexLoop($current, $step , $total){
			var $num;
			var $sum = $current + $step;
			$num =  indexToIndexLoop($sum , $total);			
			return $num ;
		}
		
	/**  4
		 * 	indexToStep		: 인덱스를 스텝변환
		 * @param	$newIndex  	: 새로운  인덱스
		 * @param	$oldIndex	: 과거 인덱스
		 * return				: 스텝
		 **/
		function indexToStep($newIndex, $oldIndex){			
			return parseInt($newIndex - $oldIndex);
		}		