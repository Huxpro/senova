/* ===========================================================
 * jquery-HSlider.js v1
 * ===========================================================
 * Copyright 2013 Hux.
 *
 * Create an Photo-first,Fullpage Slider,Modern website 
 * All animation is powered in CSS3
 * Only for modern broswer 
 *
 * ========================================================== */

(function($){

	var defaults = {
		easing:"ease",
		animationTime:1000,
		pagination:true,
		description:true
	};

	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */    
	/*------------------------------------------------*/
	
	$.fn.swipeEvents = function() {
		return this.each(function() {

			var startX,
					startY,
					$this = $(this);

			$this.bind('touchstart', touchstart);

			function touchstart(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					startX = touches[0].pageX;
					startY = touches[0].pageY;
					$this.bind('touchmove', touchmove);
				}
				event.preventDefault();
			}

			function touchmove(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					var deltaX = startX - touches[0].pageX;
					var deltaY = startY - touches[0].pageY;

					if (deltaX >= 50) {
						$this.trigger("swipeLeft");
					}
					if (deltaX <= -50) {
						$this.trigger("swipeRight");
					}
					if (deltaY >= 50) {
						$this.trigger("swipeUp");
					}
					if (deltaY <= -50) {
						$this.trigger("swipeDown");
					}
					if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
						$this.unbind('touchmove', touchmove);
					}
				}
				event.preventDefault();
			}

		});
	};

	/*   swipe event End  */    
	/*------------------------------------------------*/

	$.fn.HSlider = function(options){
		var settings = $.extend({}, defaults, options),
			wrapper = $(this),
			per = $(".per"),
			exp = $(".exp"),
			sections = $("section"),
			total = sections.length,
			quiet = false,
			paginationList = "";
	
		$.fn.transformPage = function(settings,pos){
			$(this).css({
				"-webkit-transform": "translate3d(" + pos + "%, 0 ,0)", 
				"-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"-moz-transform": "translate3d(" + pos + "%, 0 ,0)",
				"-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"-ms-transform": "translate3d(" + pos + "%, 0 ,0)",
				"-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"transform": "translate3d(" + pos + "%, 0 ,0)",
				"transition": "all " + settings.animationTime + "ms " + settings.easing
			});

			//for Nav autoHighlight
			var targetIndex = (-pos/100)+1;
			var topic;
			console.log(targetIndex);
			switch(targetIndex) {
				case 1:
					topic = 1;
					break;
				case 2:
				case 3:
				case 4:
					topic = 2;
					break;
				case 5:
					topic = 3;
					break;
				case 6:
					topic = 4;
			}
			console.log(topic);
			$("body")[0].className = "topic-"+topic;
		}

		$.fn.slideLeft = function(){
			indexNow = $("section.active").data("index");
			if (indexNow<total) {
				current = $("section[data-index='" + indexNow + "']");
				next = $("section[data-index='" + (indexNow + 1) + "']");

			
				setTimeout(function(){
					current.removeClass("active");
				}, settings.animationTime);

				next.addClass("active");
				
				//for pagination
				if(settings.pagination == true) {
					$(".pagination li a" + "[data-index='" + indexNow + "']").removeClass("active");
					$(".pagination li a" + "[data-index='" + (indexNow + 1) + "']").addClass("active");
				}

				pos = (indexNow * 100) * -1;
				$(this).transformPage(settings, pos);
			};
		}

		$.fn.slideRight = function(){
			indexNow = $("section.active").data("index");
			if (indexNow<=total && indexNow>1) {
				current = $("section[data-index='" + indexNow + "']");
				next = $("section[data-index='" + (indexNow - 1) + "']");

				
				setTimeout(function(){
					current.removeClass("active");
				}, settings.animationTime);

				next.addClass("active");
				
				//for pagination
				if(settings.pagination == true) {
					$(".pagination li a" + "[data-index='" + indexNow + "']").removeClass("active");
					$(".pagination li a" + "[data-index='" + (indexNow - 1) + "']").addClass("active");
				}

				pos = ((next.data("index") - 1) * 100) * -1;
				$(this).transformPage(settings, pos);
			};
		}

		$.fn.onSwipeUp = function(){
			if (per.hasClass('active')) {
				statusNow = per.attr("data-status");
				console.log("up!! the status is: "+ statusNow);
				if (statusNow < 4 && statusNow >= 1) {
					per.removeClass('status-'+statusNow);
					statusNow = Number(statusNow)+1;
					console.log(statusNow);
					per.attr('data-status', statusNow);
					per.addClass('status-'+statusNow);
				}
			}else if(exp.hasClass('active')){
				expNow = exp.attr("data-exp");

				if (expNow < 5 && expNow >= 1) {
					exp.removeClass('exp-'+expNow);
					expNow = Number(expNow)+1;
					exp.attr('data-exp', expNow);
					exp.addClass('exp-'+expNow);
				}
			}
		}
		$.fn.onSwipeDown = function(){
			if (per.hasClass('active')) {
				statusNow = per.attr("data-status");
				console.log("up!! the status is: "+ statusNow);
				if (statusNow <= 4 && statusNow > 1) {
					per.removeClass('status-'+statusNow);
					statusNow = Number(statusNow)-1;
					console.log(statusNow);
					per.attr('data-status', statusNow);
					per.addClass('status-'+statusNow);
				}
			}else if(exp.hasClass('active')){
				expNow = exp.attr("data-exp");

				if (expNow <= 5 && expNow > 1) {
					exp.removeClass('exp-'+expNow);
					expNow = Number(expNow)-1;
					exp.attr('data-exp', expNow);
					exp.addClass('exp-'+expNow);
				}
			}
		}

		function ready(event,delta){

			if (quiet == false) {
				if (delta<0) {
					wrapper.slideLeft()
				} else {
					wrapper.slideRight()
				};
				quiet = true;
				setTimeout(function(){
					quiet = false;
					console.log("refresh!"+quiet);
				} , settings.animationTime+200);   
			}else{
				event.preventDefault();
			}
		
		}

		//init Style
		wrapper.addClass("HSlider").css({
			"position":"relative",
			width:"100%",
			height:"100%",
		});
		$.each(sections,function(i){
			$(this).css({
				position:"absolute",
				width:"100%",
				height:"100%",
				left:i*100 +"%"
			}).addClass("section").attr("data-index", i+1);
			$(this).find("img").css({
				minWidth: "100%",
				minHeight: "100%",
				position:"absolute",
				zIndex:1
			})
			if(settings.pagination == true) {
				paginationList += "<li><a data-index='"+(i+1)+"' href='#" + (i+1) + "'></a></li>"
			}
		});

		//Create Pagination
		if(settings.pagination == true) {
			$("<ul class='pagination'>" + paginationList + "</ul>").prependTo("body");
		}

		if(settings.pagination == true)  {
			$(".pagination li a").click(function (){
				var page_index = $(this).data("index");

				if (!$(this).hasClass("active")) {
					current = $("section.active")
					next = $("section[data-index='" + (page_index) + "']");

					current.removeClass("active")
					next.addClass("active")

					$(".pagination li a" + ".active").removeClass("active");
					$(".pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");

					pos = ((page_index - 1) * 100) * -1;
					wrapper.transformPage(settings, pos);
				}
			});
		}


		//init to slide
		$("section[data-index='1']").addClass("active");
		$(".pagination li a" + "[data-index=1]").addClass("active");

		//init to Section-Performance
		per.attr('data-status',1);
		per.addClass('status-'+1);

		//init to Section-Experience
		exp.attr('data-exp', 1);
		exp.addClass('exp-'+1);

		//init Nav autoHighlight
		$("body")[0].className = "topic-1";

		//bind Mousewheel Scroll Event
		$(document).bind('mousewheel DOMMouseScroll', function(event) {
			event.preventDefault();
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			ready(event, delta);
		});


		//bind Touch Event
		$('body').swipeEvents().bind("swipeLeft",function(){
			wrapper.slideLeft();
		}).bind("swipeRight",function(){
			wrapper.slideRight();
		}).bind("swipeUp",function(){
			wrapper.onSwipeUp();
		}).bind("swipeDown",function(){
			wrapper.onSwipeDown();
		});

		//bind Keyboard Event
		$('body').keydown(function(event){
			if(event.keyCode==37){	//left
				wrapper.slideRight();
			}
			if(event.keyCode==39){	//right
				wrapper.slideLeft();
			}
			if(event.keyCode==38){	//up
				wrapper.onSwipeUp();
			}
			if(event.keyCode==40){	//down
				wrapper.onSwipeDown();	
			}
		});

		//bind Navigation Button Event
		var toHome = $(".toHome a");
		var toSaab = $(".toSaab a");
		var toPer  = $(".toPer a");
		var toExp  = $(".toExp a");
		toHome.click(function(event) {
			onNavClick(1);
		});
		toSaab.click(function(event) {
			onNavClick(2);
		});
		toPer.click(function(event) {
			onNavClick(5);
		});
		toExp.click(function(event) {
			onNavClick(6);
		});

		$("#nav").on('touchmove', function(event) {
			event.preventDefault();
			//阻止莫名的事件
		});

		function onNavClick(targetPage){
			var page_index = targetPage;
			current = $("section.active")
			next = $("section[data-index='" + (page_index) + "']");

			current.removeClass("active")
			next.addClass("active")

			pos = ((page_index - 1) * 100) * -1;
			wrapper.transformPage(settings, pos);
		}

		 //init jQuery Function : make Element Center

		$.fn.verticalCenter = function () {  
			//Change the $wrapper to parent();
			console.log("wrapper height:" + wrapper.height());
			console.log("window height" + $(window).height());
			// Why!!! Why they are different!
		  this.css("top", ( $(window).height() - this.height() ) / 2 -15 + "px");  
		  return this;  
		}  

		$.fn.horizontalCenter = function () {  
		  this.css("left", ( wrapper.width() - this.width() ) / 2 + "px"); 
		  return this;  
		}  

		$.fn.center = function () {  
		  this.css("position","absolute");  
		  this.css("top", ( wrapper.height() - this.height() ) / 2 -15+ "px");  
		  this.css("left", ( wrapper.width() - this.width() ) / 2 + "px");  
		  return this;  
		}  
		
	    function response(){	
	    	//orginal
	    	//wrapper.width($(window).width());
	    	//wrapper.height($(window).height());

	    	wrapper.find("div.content").verticalCenter()
	    	$(".pagination").verticalCenter();
	    }
	    response();

		$(window).resize(function() {
	  		response();
		});

		$(function() {
        	FastClick.attach(document.body);
    	}); 

		return false;

	}

})(window.jQuery);