var RollingNumber;

(function(){
	RollingNumber = function(obj){
		var _agent = navigator.userAgent;
		var _rollingNumber = this;
		
		this.type = 'no_type01';
		this.unitHeight=0;
		this.status = 'value_basic';
		this.addstr = obj.addstr || '';
		this.autoPlay = true;
		
		for(var prop in obj){
			this[prop] = obj[prop];
		}
		
		var container = $(this.container);
		container.append('<div class="rate_area_no" style="left:0;">');
		var rateArea = container.children('.rate_area_no:last');
		if(this.bgColor) rateArea.css({background:this.bgColor});
		
		var hiddenVal;
		switch(this.status){
			case 'value_basic':
				hiddenVal = '<span class="hidden">' + this.value + '</span>';
			break;
			case 'value_up':
				hiddenVal = '<span class="hidden">' + this.value + ' 상승</span>';
				hiddenVal += '<span class="status"></span>';
			break;
			case 'value_down':
				hiddenVal = '<span class="hidden">' + this.value + ' 하락</span>';
				hiddenVal += '<span class="status"></span>';
			break;
			case 'value_w':
				hiddenVal = '<span class="hidden">' + this.value + '</span>';
			break;
		}
		
		rateArea.append(hiddenVal);
		
		var len = this.value.length;
		var spanVal;
		for(var i=0; i<len; i++){
			var v = this.value.slice(i, i+1);
			switch(v){
				case '.':
					spanVal = '<span class="dot"></span>';
				break;
				case '%':
					spanVal = '<span class="per"></span>';
				break;
				case ',':
					spanVal = '<span class="comma"></span>';
				break;
				case '-':
					spanVal = '<span class="min"></span>';
				break;
				default:
					spanVal = '<span num=' + v + '></span>';
				break;
			}
			
			rateArea.append(spanVal);
		}
		rateArea.children(':not(.hidden)').addClass(this.type);
		rateArea.children(':not(.hidden)').addClass(this.status);
		
		if(this.addstr)
			rateArea.append(this.addstr);
		
		if(this.autoPlay) settingMotion();
		
		obj.settingMotion = settingMotion;
 
		return obj;
	
		function settingMotion(){
			var space = _rollingNumber.unitHeight; //0
			var span = rateArea.children('span[num]');
			var cnt = span.size() - 1;
			var delay = 150;
			if(_agent.indexOf('Firefox') > -1) delay = 0;
			var intervalId = setInterval(function(){
				rolling(span.eq(cnt), space);
				cnt--;
				
				if(cnt < 0) clearInterval(intervalId);
			}, delay);
		}
		
		function rolling(tg, space){
			var tn = parseInt(tg.attr('num'));
			
			if(tn < 7) tn += 10;
			
			var tt = space * tn * -1;
			
			tg.css('background-position','0px 0px');
			
			if(_agent.indexOf('Firefox') > -1){
				tg.css('background-position','0px ' + tt + 'px');
				//tg.stop().animate({backgroundPosition:'0px ' + tt + 'px'}, {duration:700, ease:'easeOutCubic'});
			} else {
				tg.stop().animate({backgroundPositionY:tt}, {duration:700, ease:'easeOutCubic'});
			}
			
		}
	}

})(jQuery);