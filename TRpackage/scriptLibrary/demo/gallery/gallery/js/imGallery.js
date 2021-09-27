
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
				

					

				/**
				 * type 겔러리 모션_오버랩 메소드
				 * @param {Number} index  : 인덱스
				 */				
				trpGallery.prototype.motionOverlapR = function(index){
					
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
				trpGallery.prototype.motionOverlapL = function(index){
					
					if ( !this.wrapSelector.is(':animated') ){  	// 에니메이션 체크

						// 전체속성
					  var distance = this.itemSelector.width();
					  this.itemSelector.css({ "position":"absolute" , "display":"block" , "left": (distance * -1)+"px" ,"display":"inline " });			// 아이템 css속성
						// 과거속성
					  this.itemSelector.eq(this.index).css({ "position":"absolute" , "display":"block" , "left":"0px" ,"display":"inline" ,"z-index":"0" });			// 아이템 css속성
						
						// 활성화 속성
					   this.itemSelector.eq(index).css({ "z-index":"100"});
					   this.itemSelector.eq(index).filter(':not(:animated)').animate( { left:0 },500 , "easeInOutCubic"); 
					   this.index = index;		
					}// 에니메이션 체크
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