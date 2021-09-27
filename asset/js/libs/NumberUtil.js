/**
 * @author turfrain
 */

 	/** 1
		 * 		indexToIndex		: 새로운 인덱스를 총범위안으로 만듬
		 * @param	$newIndex		: 새로운 인덱스
		 * @param	$total			: 전체 겟수		 
		 * @return					: 범위안의 인덱스
		 */
		function indexToIndexLoop($newIndex , $total)
		{
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
		
		/**  2
		 *		stepToIndex				: 현재에서 +앞으로 & -뒤로 몇번째 min  / max
		 * 	@param $current				: 현재 인덱스값
		 * 	@param $step				: 현재 인덱스에서 몇번째 전후(-,+)
		 * 	@param $total				: 원본 배열값
		 * 	return						: 찾는 배열 인덱스값
		 * */		
		function stepToIndex($current, $step , $total)
		{
			var num;
			num = $current + $step;
			if (num >= $total){			// 클때
				num = $total-1;
			}else if (num < 0) {		// 작을때
				num = 0;
			}else {					
				num = num;			
			}
			return num ;
		}
		
		/**  3
		 *		stepToIndexLoop				: 현재에서 +앞으로 & -뒤로 몇번째 loop 
		 * 	@param $current					: 현재 인덱스값
		 * 	@param $step					: 현재 인덱스에서 몇번째 전후(-,+)
		 * 	@param $total					: 원본 배열길이;
		 * 	return							: 찾는 배열 인덱스값
		 * */		
		function stepToIndexLoop($current, $step , $total)
		{
			var $num;
			var $sum = $current + $step;
			$num =  indexToIndexLoop($sum , $total);			
			return $num ;
		}
		
		/**  4
		 * 		indexToStep		: 인덱스를 스텝변환
		 * @param	$newIndex  	: 새로운  인덱스
		 * @param	$oldIndex	: 과거 인덱스
		 * return				: 스텝
		 **/
		function indexToStep($newIndex, $oldIndex)
		{						
			return $newIndex - $oldIndex;
		}
		
		
		/**  5
		 * 	indexToStepFast			: 루프 가장적은 스텝반환
		 * @param	$newIndex  		: 새로운  인덱스
		 * @param	$oldIndex		: 과거 인덱스
		 * @param	$total			: 총겟수
		 * return					: 스텝
		 */
		function indexToStepFast($newIndex, $oldIndex , $total )
		{	
			var $return ;
			var $temp = $newIndex - $oldIndex;
			if ( ($total / 2)+1 >  $temp )
			{
				$return = $newIndex - $oldIndex;
			}else {
				$return = -($total-($newIndex - $oldIndex));
			}			
			return $return;
		}