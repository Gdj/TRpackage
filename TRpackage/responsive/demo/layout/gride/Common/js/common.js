/* Common Function */

//Check Mobile Devices
var checkMobile = function(){
    var isTouch = ('ontouchstart' in document.documentElement);

    if ( isTouch ) {
        $('html').addClass('touch');
    }
    else {
        $('html').addClass('no-touch');
    };
};
//Execute Check
checkMobile();

function ajaxCall(frmName, sendUrl, target, callback) {
	var dataString = $("#"+frmName).serialize();
  
	$.ajax({
		type:"POST",
		url:sendUrl,
		cache:false,
		async:false,
		dataType:"html",
		data:dataString,
		timeout:6000,
		success:function(data){    
		// 통신이 성공적으로 이루어졌을때 이 함수를 타게 된다.
		$("#"+target).html(data);

			if (callback !==""){
				callback;
			}
		},
		/*complete:function(data){
		//통신이 실패했어도 완료가 되었을때 이함수를 타게된다.
		// success 와 complete 둘 중 하나만 이용, 그렇지 않으면 두번실행
		},*/
		error:function(xhr, status, error){
		}
	}); 
}

function ajaxLoad(selector, frmName, callUrl, callback){
	var dataString = $("#"+frmName).serialize();
	
	$(selector).load(callUrl, dataString, callback);
}
	
// Layer Popup 
function lp_open(url){
	$.colorbox({href:url});
}
function lp_close(){
	$.colorbox.close();
};

// Window Popup
function winPop(url, name ,sWidth, sHight, sLeft, sTop, isScroll, isResize, isTool, isMenu) {
	window.open(url,name,'width='+sWidth+',height='+sHight+',left='+sLeft+',top='+sTop+',scrollbars='+isScroll+',resizable='+isResize+',toolbar='+isTool+',menubar='+isMenu+',location=no');
} 

var maxTabSize, tabPage;
function setTabMenu(){ 
	var start = $(".sliding_tab li.on").index(".sliding_tab li");		
	var winWidth = $(window).width();						
					
	if (winWidth > 768) {
		if ($(".sliding_tab li").length>6){
			maxTabSize = 7;
			if (start > 5) {
				tabPage = 1;
			} else {
				tabPage = 0;
			}				
		} else {
			maxTabSize = $(".sliding_tab li").length;
			tabPage = 0;
		}
	} else if (winWidth > 640 && winWidth <= 768) {
		if ($(".sliding_tab li").length>5){
			maxTabSize = 5;
			if (start > 4) {
				tabPage = 1;
			} else {
				tabPage = 0;
			}				
		} else {
			maxTabSize = $(".sliding_tab li").length;
			tabPage = 0;
		}			
	} else if (winWidth > 515 && winWidth <= 640) {

		if ($(".sliding_tab li").length>4){
			maxTabSize = 4;
			if (start > 5) {
				tabPage = 2;
			} else if (start > 3 && start <=5) {
				tabPage = 1;
			} else {
				tabPage = 0;
			}				
		} else {
			maxTabSize = $(".sliding_tab li").length;
			tabPage = 0;
		}				
	} else if (winWidth > 460 && winWidth <= 515) {
		if ($(".sliding_tab li").length>3){
			maxTabSize = 3;	
			if (start > 7) {				
				tabPage = 4;							
			} else if (start > 5 && start <=7) {					
				tabPage = 3;
			} else if (start > 3 && start <=5) {
				tabPage = 2;
			} else if (start > 1 && start <=3) {
				tabPage = 1;					
			} else {
				tabPage = 0;
			}				
		} else {
			maxTabSize = $(".sliding_tab li").length;
			tabPage = 0;
		}				
	} else {
		if ($(".sliding_tab li").length>1){
			maxTabSize = 2;	
			tabPage = start;			
		} else {
			maxTabSize = $(".sliding_tab li").length;
			tabPage = 0;
		}			
	}	
	
}
// JQuery 공통함수

// 메뉴/본문 바로가기 메뉴 열기
jQuery(document).ready(function(e) {	
	// Tab Menu (bxSlider)
	if ($(".sliding_tab").length>0) {	
		setTabMenu();
		
		var tabMenuSlider = $(".sliding_tab").bxSlider({
			minSlides:1,
			maxSlides:maxTabSize,
			prevSelector: '.tabMenu_prev',
			nextSelector: '.tabMenu_next',		
			nextText: 'next menu',
			prevText: 'prev menu',
			startSlide:0,
			pager:false,
			slideWidth:125,
			slideMargin:1,
			infiniteLoop: false			
		});		
		tabMenuSlider.goToSlide(tabPage);	
		
		$(window).on('resize',function(e){
			tabMenuSlider.destroySlider();
		});
		$(window).resizeEnd({
			delay : 500
		}, function() {
			var sliderWidth;
			
			setTabMenu();
						
			if (maxTabSize == 7) {
				slierWidth = 881;
			} else {
				sliderWidth = (maxTabSize*125) + (maxTabSize-1);
			}
			
			$(".sliding_tabWrap .bx-wrapper").attr("style","max-width:" + sliderWidth+"px");		
			
			var tabMenuSlider2 = $(".sliding_tab").bxSlider({
				minSlides:1,
				maxSlides:maxTabSize,
				prevSelector: '.tabMenu_prev',
				nextSelector: '.tabMenu_next',		
				nextText: 'next menu',
				prevText: 'prev menu',
				startSlide:0,
				pager:false,
				slideWidth:125,
				slideMargin:1,
				infiniteLoop: false			
			});
			tabMenuSlider2.goToSlide(tabPage);			
		});				
	}
	// Tab Menu (jCarousel)
	if ($(".jcarousel-skin-tab").length>0){		
		var startMN = $(".jcarousel-skin-tab ul li.on").index(".jcarousel-skin-tab ul li")+1;
		var itemLen = $(".jcarousel-skin-tab ul li").length;
		var sliderWidth = (itemLen*125) + (itemLen-1);
		
		if (sliderWidth < 940) {
			$(".jcarousel-skin-tab").css("max-width",sliderWidth+"px");
		}
		
		function mycarousel_initCallback(carousel) {		
			$('.btnTabMenu_next').bind('click', function() {
				carousel.next();
				return false;
			});
		
			$('.btnTabMenu_prev').bind('click', function() {
				carousel.prev();
				return false;
			});
			
			$(window).on('resize',function(e){
				carousel.scroll(startMN);
			});			
		};

		$(".jcarousel-skin-tab").jcarousel({
			scroll:1,
			start:startMN,
			initCallback: mycarousel_initCallback,
			buttonNextHTML: null,
			buttonPrevHTML: null
		});
	}	


	// Layer Popup (Use of Real)
	$(".open_layer").colorbox();
	
	// Layer Close
	if ($(".lp_wrapper:visible").length > 0) {
		$(document).on("click",".lp_close a, .lp_wrapper a.close",function(e){		
			if ($(this).parents().is(".lp_wrapper")){
				$.colorbox.close();
			}
		});	
	}
	
	//Skip Menu
	$("#SkipMenu").focus();	
	$("#SkipMenu a").bind({
		'focus': function(e) {
			$("#SkipMenu").css("height","35px");
		},
		'click keypress': function(e) {
			$("#SkipMenu").css("height","0px");			
			
			if ($(document).width() < 768) {
				$("#Content").attr("tabindex","0");
				$("#Content a:first, #Content input:first").focus();
			} else {				
				if ($(this).hasClass("read-more")){
					$("#Header a:first").focus();
				} else {
					$("#Content").attr("tabindex","0");
					$("#Content a:first, #Content input:first").focus();
				}
			}
		},
		'blur': function(e) {
			$("#SkipMenu").css("height","0px");				
			if ($(this).hasClass("read-more")){
				
			}
		}
	});	
	
	// LNB 
	$(".LNB li.node1>a").on('focusin',function(e){
		$(".LNB li.node1 .subMenu1:visible").slideUp('fast');
		$(".LNB li.node1").removeClass("on");
		
		$(this).next(".subMenu1").slideDown('fast',function(e){
			$(this).parent("li.node1").addClass("on");
			$(this).find("ul>li.node2").on({	
				"focusin":function(e){
					$(this).addClass("on");
				},
				"focusout":function(e){					
					$(this).removeClass("on");
				}
			});			
		});			
	});
	$(".LNB li.node1").on({
		"mouseenter":function(e){
			var menuIndex = $(this).index(".LNB li.node1");
			
			$(".LNB li.node1.on").find(".subMenu1").slideUp('fast');
			$(".LNB li.node1").removeClass("on");
			
			$(this).addClass("on");
			$(this).find(".subMenu1").slideDown('fast');				
			
			$(this).find("ul li.node2").on({	
				"mouseenter":function(e){
					$(this).addClass("on");
				},
				"mouseleave":function(e){					
					$(this).removeClass("on");
				}
			});
		},
		"mouseleave":function(e){				
			$(this).removeClass("on");
			$(this).find(".subMenu1").css('display','none');
		}
	});
	if ($(".LNB").length >0){	
		$("a:not('.LNB a')").on('focusin',function(e){	
			$('.LNB .subMenu1:visible').slideUp('fast',function(e){
				$('.LNB li.node1').removeClass("on");				
			});
		});
	}		

	// Mobile allMenuBtn (TwoMenu)	
	$(".m_menu").click(function(e){
		$(".LNB_wrap").addClass("m_LNB_open");
		$(".LNB_wrap .node1").unbind();
		$(".LNB_wrap").next(".bg").show();
		$(".m_LNB_open").animate({left:'0px'},250);
		$("#Header").css("height","100%");
		$("#Header_Wrapper").css("height","100%");

		$(".LNB_wrap .LNB").perfectScrollbar();
		$(".LNB_wrap .LNB").scrollTop(0);
		$(".LNB_wrap .LNB").perfectScrollbar('update');
	});
	$(".m_search").click(function(){
		$(".searching_wrap").toggleClass("m_searching_open");		
	});	
	
	// Mobile allMenuBtn (TwoMenu)
	$(".btn_allMenu").click(function(){				
		var scrollPos;	
							
		if ($("#allMenu").hasClass("show") == false) {						
 			scrollPos = $(window).scrollTop();
			
			$("#allMenu").addClass("show");
			$("html, body").addClass("allMenu_open");			
			$("#Wrapper").scrollTop(scrollPos);	
						
			$("#allMenu_nav").perfectScrollbar();
			$("#allMenu_nav").scrollTop(0);
			$("#allMenu_nav").perfectScrollbar('update');
		} else {
			scrollPos = $("#Wrapper").scrollTop();

			$("#allMenu").removeClass("show");			
			$("html, body").removeClass("allMenu_open");
			$("html, body").scrollTop(scrollPos);				
		}
	});	
	
	// Top Search
	$(document).on("focusin click",".btn_search",function(e){	
		if ($(".btn_search").hasClass("on")) {
			$(".topSearch_wrap").slideUp('fast',function(){
				$(".btn_search").removeClass("on");				
			});
		} else {
			$(".topSearch_wrap").slideDown('fast',function(){
				$(".btn_search").addClass("on");				
			});			
		}
	});
	$(".topSearch_wrap .btn").on({
		"focusout":function(e){
			$(".topSearch_wrap").slideUp('fast',function(){
				$(".btn_search").removeClass("on");				
			});
		}
	});
	
	//Breadcrumb
	$(".location>li.node1>a").on('focusin',function(e){
		$('.location ul:visible').slideUp();
		$(".location li.node1").removeClass('on');			
		$(this).next("ul").slideDown('fast',function(e){
			$(this).parent("li.node1").addClass("on");
		});			
	});
	$(".location>li.node1").on({
		'click':function(e){
			if ($(this).hasClass("on")==false){				
				$(".location li.node1").removeClass('on');
				$(this).find("ul").slideDown('fast',function(e){
					$(this).parent("li.node1").addClass("on");
				});
			} else {
				$(".location ul:visible").slideUp();
				$(".location li.node1").removeClass("on");				
			}
		},
		'mouseleave':function(e){
			$(".location ul:visible").slideUp();
			$(".location li.node1").removeClass("on");				
		}
	});
	if ($(".location").length >0){	
		$("a:not('.location>li.node1 a')").on('focusin',function(e){	
			$('.location li.node1.on ul').slideUp('fast',function(e){
				$('.location li.node1').removeClass("on");
				
			});
		});
	}
	if ($('html').hasClass("touch")) {
		$(document).on('touchstart',function(e){			
			var container = $(".location ul");
			if (container.has(e.target).length === 0){
				if ($(".location ul").is(":visible")) {
					$('.location li.node1.on ul').slideUp('fast',function(e){
						$('.location li.node1').removeClass("on");					
					});
				}
			}
		});	
	}

	// Sub Visual
	if ($(".slider_subVisual").length >0) {
		var slider_subVisual = $(".slider_subVisual").bxSlider({
			prevSelector: '.imageSlide_prev',
			nextSelector: '.imageSlide_next',		
			nextText: 'next menu',
			prevText: 'prev menu',	
			mode: 'fade',
			pager:false,
			maxSlides:1,
			slideWidth:940,
			moveSlides:1
		});
		//사이즈 변동시...다시 호출	
		$(window).on('resize',function(e){
			slider_subVisual.reloadSlider();
		});
	}

	// 대표프로젝트
	if ($(".slider_product").length >0) {
		var sliderProduct = $(".slider_product").bxSlider({
			prevSelector: '.project_prev',
			nextSelector: '.project_next',		
			nextText: 'next menu',
			prevText: 'prev menu',
			mode: 'fade',
			pager:false,
			maxSlides:1,
			slideWidth:940,
			moveSlides:1
		});
		//사이즈 변동시...다시 호출	
		$(window).on('resize',function(e){
			sliderProduct.reloadSlider();
		});
	}

	
	// 수행실적 보기
	if ($(".slider_perform").length >0) {
		$(".slider_perform").bxSlider({
			prevSelector: '.imageSlide_prev',
			nextSelector: '.imageSlide_next',		
			nextText: 'next menu',
			prevText: 'prev menu',	
			mode: 'fade',
			pager:false,
			maxSlides:1,
			slideWidth:720,
			moveSlides:1
		});
	}
	
	//Tab 활성화
	$(document).on("click",".tabLayer li",function(e){
		var tabIndex = $(this).index(".tabLayer li");
		
		$(".tabLayer li").removeClass("on");		
		$(this).addClass("on");
		
		$(this).parent().parent().find(".tabContent .tabCont").css("display","none");
		$(this).parent().parent().find(".tabContent .tabCont").eq(tabIndex).css("display","block");
	});	
	
	//Tab - Ajax Type
	$("ul.tabAjax>li").on('click',function(e){
		var callTarget = $(this).find("a").attr("data-target");
		var targetArea = $(this).parents().next(".tabContent");
		//초기화
		$(this).parent().find("li").removeClass("on");		
		
		$(this).addClass("on");
		ajaxLoad(targetArea, '', callTarget, '');
	});
	

	// Footer - scroll body to 0px on click
	$(window).bind("scroll load", function(e) {
		if ($(this).scrollTop() > 0) {
			$('.back-to-top').addClass('show');
		} else {
			$('.back-to-top').removeClass('show');
		}
	});
	
	$('.back-to-top').bind('click', function(e) {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
	});	
});
