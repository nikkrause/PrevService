// JavaScript Document
var next;

$('#SELECT, #SELECT_FOOTER').click(function()
{
	"use strict";
	if ($('#SERVICES').is('.openMenu'))
	{
		$('body').removeClass('noScroll');
		$('#SERVICES').removeClass('openMenu',300,'easeOutQuart');
		$('#SELECT').removeClass('opened').attr('title','Open the Services Menu to Select a Service');
		$('#SERVICES button').attr('tabindex','-1');
	}
	else
	{
		var width = $(window).width();
		if (width < 959)
		{	
			$('body').addClass('noScroll');
			//$('#SERVICES').addClass('no-print',300,'easeInQuart').focus();
			$('#SERVICES_SELECT').attr('aria-hidden',false).focus().find('option, button').attr('tabindex','0');
			$('#SELECT').addClass('opened').attr('title','Close the Services Menu');
			$('#SERVICES button').attr('tabindex','0');
		}
		else
		{
			$('#SERVICES').addClass('openMenu',300,'easeInQuart').focus();
			$('#SELECT').addClass('opened').attr('title','Close the Services Menu');
			$('#SERVICES button').attr('tabindex','0');
		}
	}
});

/* SECTION BUTTON HANDLERS /////////*/
$('#FAQ_BUTTON, #FAQ_FOOTER').click(function()
{
	"use strict";
	if ($('#SERVICES').is('.openMenu'))
	{
		$('#SERVICES').removeClass('openMenu',300,'easeOutQuart');
	}
	$('html,body').animate({ scrollTop: $('#FAQ').offset().top-0 }, 300, 'easeOutQuart', function()
	{
		$('#SELECT').removeClass('opened').attr('title','Open the Services Menu to Select a Service');
		$('#SERVICES button').attr('tabindex','-1');
		$('#FAQ').focus();
	});
});

$('#RESOURCES_BUTTON, #RES_FOOTER').click(function()
{
	"use strict";
	if ($('#SERVICES').is('.openMenu'))
	{
		$('#SERVICES').removeClass('openMenu',300,'easeOutQuart');
	}
	$('html,body').animate({ scrollTop: $('#RESOURCES').offset().top-0 }, 300, 'easeOutQuart');
	$('#MORE').removeClass('showMe').attr('disabled',true).attr('tabindex','-1');
	$('#SELECT').removeClass('opened').attr('title','Open the Services Menu to Select a Service');
	$('#SERVICES button').attr('tabindex','-1');
	$('#RESOURCES').focus();
});

$('#PDF_BUTTON, #PDF_FOOTER').click(function()
{
	"use strict";
	window.open('https://www.cms.gov/Medicare/Prevention/PrevntionGenInfo/Downloads/MPS-QuickReferenceChart-1TextOnly.pdf','_blank','width=565, height=830, resizable=yes, scrollbars=yes, menubar=yes, location=yes, toolbar=yes, titlebar=yes, status=yes, top=0, left=0');
});

$('#PLEASE_NOTE_CLOSE').click(function()
{
	'use strict';
	var note = $('#PLEASE_NOTE');
	if (note.is('.closed'))
	{
		$(this).attr('title','Close This Introduction').html('<span>&#9662;</span> <span>CLOSE</span>');
		note.focus().removeClass('closed').attr('aria-expanded',true).find('a').attr('tabindex','0');
		$('#SERVICES').addClass('closed');
		//$('header').addClass('shrinkBG');
	}
	else
	{
		note.addClass('closed').attr('aria-expanded',false).find('a').attr('tabindex','-1');
		$(this).attr('title','Open This Introduction').html('<span>&#9652;</span> <span>OPEN</span>');
		$('#SERVICES').removeClass('closed').focus();
		//$('header').removeClass('shrinkBG');
	}
});