// JavaScript Document
var next;
$(window).scroll(function()
{
	"use strict";
	var width = $(window).width();
	if ($(this).scrollTop() >= 150)
	{
		$('header').addClass('scrolled', 500, 'swing');
		headDisclaimers();
		$('#TO_TOP').addClass('showMe', 400, 'swing').attr('disabled',false).attr('tabindex','0');
		$('#SERVICES').removeClass('openMenu closed',300,'easeInQuart');
		$('#SERVICES button').attr('tabindex','-1');
		$('#SELECT').removeClass('opened').attr('title','Open the Services Menu to Select a Service');
		$('main a').attr('tabindex','0');
		$('nav').addClass('fixed');
	}
	if ($(this).scrollTop() < 150)
	{
		$('nav').removeClass('fixed');

		$('header').removeClass('scrolled', 500, 'swing');
		$('#TO_TOP').removeClass('showMe').attr('disabled',true).attr('tabindex','-1');
		if (width >= 960)
		{
		//OPEN THE SERVICES MENU
		$('#SERVICES').addClass('openMenu',300,'easeInQuart').focus();
		$('#SELECT').addClass('opened').attr('title','Close the Services Menu');
		$('#SERVICES button').attr('tabindex','0');
		next = undefined;
		}
	}
});

function headDisclaimers()
{
	'use strict';
	var note = $('#PLEASE_NOTE');
	note.addClass('closed').attr('aria-expanded',false);
	$('#PLEASE_NOTE>button').attr('title','Open This Introduction').html('<span>&#9652;</span> <span>OPEN</span>');
	$('header').removeClass('shrinkBG');
}


$('#TO_TOP').click(function() 
{
	"use strict";
  $('html,body').animate({ scrollTop: 0 });
	//location.hash = "";
	next = undefined;
});