// JavaScript Document
var next;

$(document).ready(function()
{
	"use strict";
	var width = $(window).width();
	var hash = window.location.hash.substring(1);
	if (width > 959)
	{
		$('#SERVICES').addClass('openMenu',300,'easeInQuart').focus();
		$('#SELECT').addClass('opened').attr('title','Close the Services Menu');
		$('#SERVICES button').attr('tabindex','0');
		$('html,body').animate({ scrollTop: 0 });
	}
	if (hash !== null)
	{
		//serviceID = $(this).attr('id');
		//var URL = location.href;
		var button = $('button#'+hash).attr('class');
		var stacks = $('#PRINT_STACK').detach();
		//$('body').removeClass('noScroll');
		//closeService();
		$('#SERVICE').removeClass('longService').addClass('view').load('services/'+hash+'.html #WRAPPER', function()
		{
			//FIND LONGER SERVICES
			var servHeight = $('#SERVICE').height();
			var windowHeight = $(window).height();
			
			if (servHeight > windowHeight)
			{
				longService();
			}
			$(this).append(stacks).parent().attr('id',hash);
		});
		if (button === 'telehealthButton')
		{	
			$('#TELEHEALTH_ALERT').addClass('showMeLeft').attr('aria-hidden',false);
		}
		$('html,body').animate({ scrollTop: $('#SERVICE').offset().top-0 }, 600, 'easeOutQuart');
	}
});


function closeService()
{
	"use strict";
	$('#SERVICE').removeClass('view').find('*').not('#PRINT_STACK').remove();
	$('#SEL_MENU').removeClass('open');
	$('#TELEHEALTH_ALERT').removeClass('showMeLeft').attr('aria-hidden',true);
	$('#SERVICES').removeClass('openMenu closed',300,'easeOutQuart');
	$('#SERVICES_SELECT').attr('aria-hidden',true).removeClass('no-print',300,'easeInQuart').find('option, button').attr('tabindex','-1');
	$('#SELECT').removeClass('opened').attr('title','Open the services menu to select a service').focus();
	$('#SERVICES button').attr('tabindex','-1');
	$('html,body').animate({ scrollTop: $('#SERVICE').offset().top-0 }, 600, 'easeOutQuart');
}

function closeServiceMenu()
{
	"use strict";
	$('body').removeClass('noScroll');
	$('#SEL_MENU').removeClass('open');
	$('#DEFAULT').removeAttr('style');
	$('#SEL_MENU>li#DEFAULT').focus();
	$('#SERVICES').removeClass('openMenu',300,'easeOutQuart');
	$('#SERVICES_SELECT').attr('aria-hidden',true).removeClass('no-print',300,'easeInQuart').find('option, button').attr('tabindex','-1');
	$('#SELECT').removeClass('opened').attr('title','Open the services menu to select a service').focus();
	$('#SERVICES button').attr('tabindex','-1');
}

function longService()
{
	'use strict';
	//var currentService = $('#SERVICE h2').text();
	$('#SERVICE').addClass('longService');
}


/* SERVICES BUTTON HANDLER /////////*/
var serviceID = $('#SERVICES button').click(function()
{
	'use strict';
	next = undefined;
	serviceID = $(this).attr('id');
	var serviceTele = $(this).attr('class');
	var stacks = $('#PRINT_STACK').detach();
	$('body').removeClass('noScroll');
	closeService();
	$('#SERVICE').removeClass('longService').addClass('view').load('services/'+serviceID+'.html #WRAPPER', function()
	{
		$('.telePrint').attr('src','images/Telehealth-Service.png'); //CHANGE TELEHEALTH IMAGE SOURCE IF NEEDED
		//FIND LONGER SERVICES
		var servHeight = $('#SERVICE').height();
		var windowHeight = $(window).height();

		if (servHeight > windowHeight)
		{
			longService();
		}
		$(this).append(stacks).parent().attr('id',serviceID);
		location.hash = serviceID;
	}).focus();
	if (serviceTele === 'telehealthButton')
	{	
		$('#TELEHEALTH_ALERT').addClass('showMeLeft').attr('aria-hidden',false);
	}
});


/* NEW MOBILE HANDLER //////////*/	
$('#SEL_MENU>li').on('click', function() 
{
	'use strict';
	var opened = $('#SEL_MENU').is('.open');
	if (!opened)
	{
		$(this).parent().addClass('open');
		$('#DEFAULT').hide();
	}
	else
	{
		var serviceOP = $('#SEL_MENU>li:focus').attr('id').replace(/_2/, '');
		var serviceTele = $('#SEL_MENU>li:focus').attr('class');
		var stacks = $('#PRINT_STACK').detach();
		$('body').removeClass('noScroll');
		$('#DEFAULT').removeAttr('style');
		$('#SEL_MENU>li#DEFAULT').focus();
		closeService();
		$('#SERVICE').removeClass('longService').addClass('view').load('services/'+serviceOP+'.html #WRAPPER', function()
		{
			$('.telePrint').attr('src','images/Telehealth-Service.png'); //CHANGE TELEHEALTH IMAGE SOURCE IF NEEDED
			//FIND LONGER SERVICES
			var servHeight = $('#SERVICE').height();
			var windowHeight = $(window).height();
	
			if (servHeight > windowHeight)
			{
				longService();
			}
			$(this).append(stacks);
		}).focus();
		if (serviceTele === 'telehealthButton')
		{	
			$('#TELEHEALTH_ALERT').addClass('showMeLeft').attr('aria-hidden',false);
		}
	}
});

$('#SEL_MENU>li').on('keypress', function(e) 
{
	'use strict';
	if (e.which===13)
	{
		var serviceOP = $('#SEL_MENU>li:focus').attr('id').replace(/_2/, '');
		var serviceTele = $('#SEL_MENU>li:focus').attr('class');
		var stacks = $('#PRINT_STACK').detach();
		$('body').removeClass('noScroll');
		$('#DEFAULT').removeAttr('style');
		$('#SEL_MENU>li#DEFAULT').focus();
		closeService();
		$('#SERVICE').removeClass('longService').addClass('view').load('services/'+serviceOP+'.html #WRAPPER', function()
		{
			//FIND LONGER SERVICES
			var servHeight = $('#SERVICE').height();
			var windowHeight = $(window).height();
	
			if (servHeight > windowHeight)
			{
				longService();
			}
			$(this).append(stacks);
		}).focus();
		if (serviceTele === 'telehealthButton')
		{	
			$('#TELEHEALTH_ALERT').addClass('showMeLeft').attr('aria-hidden',false);
		}
	}
});



/* PRINT BUTTON HANDLERS /////////*/
$('body').on('click','#PRINT', function()
{
	'use strict';
	var printClick = $('#ADD_IN').length !== 0;
	if (!printClick)
	{
		$('#SERVICE').prepend('<p id="ADD_IN" class="print-only">Preventive Services Chart | Medicare Learning Network&reg;</p>');
		printOptions();
	}
	else
	{
		printOptions();
	}
});

function printOptions()
{
	'use strict';
	var section = $('#SERVICE h2').html();
	$('body').addClass('noScroll');
	$('#PRINT_QUESTION').attr('aria-hidden',false).addClass('showMe', function()
		{
			$('header, main, footer').find('a, button').attr('tabindex','-1');
			$(this).find('input, button').attr('tabindex','0');
			$(this).find('p').first().html('You are printing the <strong>'+section+'</strong> section.');
			$('#FAQ_PRINT').change(function()
				{
			var checked = this.checked;
			if (checked)
			{
				$('#FAQ').removeClass('no-print');
			}
			else
			{
				$('#FAQ').addClass('no-print');
			}
		});
		$('#RES_PRINT').change(function()
		{
			var checked = this.checked;
			if (checked)
			{
				$('#RESOURCES').removeClass('no-print');
			}
			else
			{
				$('#RESOURCES').addClass('no-print');
			}
		});
		$('#DIS_PRINT').change(function()
		{
			var checked = this.checked;
			if (checked)
			{
				$('#DISCLAIMERS').removeClass('no-print');
			}
			else
			{
				$('#DISCLAIMERS').addClass('no-print');
			}
		});
	});
}

function printOptionsMain()
{
	'use strict';
	//var section = $('#SERVICE h2').html();
	$('body').addClass('noScroll');
	$('#SERVICE>#WRAPPER').addClass('no-print');
	$('#PRINT_QUESTION').attr('aria-hidden',false).addClass('showMe', function()
		{
			$('header, main, footer').find('a, button').attr('tabindex','-1');
			$(this).find('input, button').attr('tabindex','0');
			$(this).find('p').first().html('Select the section(s) you\'d like to print. <button type="button" id="SELECT_ALL" onClick="selectAll()" title="" tabindex="0">Select All</button>');
			$('#ALL_SERVICES').addClass('showMe');
			$('#FAQ_PRINT').change(function()
		{
			var checked = this.checked;
			if (checked)
			{
				$('#FAQ').removeClass('no-print');
			}
			else
			{
				$('#FAQ').addClass('no-print');
			}
		});
		$('#RES_PRINT').change(function()
		{
			var checked = this.checked;
			if (checked)
			{
				$('#RESOURCES').removeClass('no-print');
			}
			else
			{
				$('#RESOURCES').addClass('no-print');
			}
		});
		$('#DIS_PRINT').change(function()
		{
			var checked = this.checked;
			if (checked)
			{
				$('#DISCLAIMERS').removeClass('no-print');
			}
			else
			{
				$('#DISCLAIMERS').addClass('no-print');
			}
		});
		
		$('#ALL_SERVICES input').change(function()
		{
			var service = $(this).attr('id').replace(/_PRINT/, '');
			var checked = this.checked;
			if (checked)
			{
				$('#SERVICE>#PRINT_STACK>#'+service+'_STACK').load('services/'+service+'.html #WRAPPER', function()
				{
					$('.telePrint').attr('src','images/Telehealth-Service.png'); //CHANGE TELEHEALTH IMAGE SOURCE IF NEEDED
				});
			}
			else
			{
				$('#SERVICE>#PRINT_STACK>#'+service+'_STACK').empty();
			}
		});
	});
}

$('#PRINT_QUESTION button#PRINT_SEL').click(function()
{
	'use strict';
	$('main').focus();
	window.print();
	closePrint();
});

$('#PRINT_QUESTION button#CANCEL').click(function()
{
	'use strict';
	closePrint();
});

function selectAll()
{
	'use strict';
	if (!$('#ALL_SERVICES').is('.checkAll'))
	{
		$('#ALL_SERVICES').addClass('checkAll');
		$('#ALL_SERVICES input').prop('checked',true);
		$('#SELECT_ALL').html('Deselect All');
		$('#SERVICE>#PRINT_STACK>#ALC_MISUSE_STACK').load('services/ALC_MISUSE.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#AWV_STACK').load('services/AWV.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#BONE_MASS_STACK').load('services/BONE_MASS.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#CARDIO_DIS_STACK').load('services/CARDIO_DIS.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#COLO_CAN_STACK').load('services/COLO_CAN.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#TOBACCO_STACK').load('services/TOBACCO.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#DEPRESSION_STACK').load('services/DEPRESSION.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#DIABETES_STACK').load('services/DIABETES.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#DIABETES_SELF_STACK').load('services/DIABETES_SELF.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#GLAUCOMA_STACK').load('services/GLAUCOMA.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#HEP_B_SCREEN_STACK').load('services/HEP_B_SCREEN.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#HEP_B_STACK').load('services/HEP_B.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#HEP_C_STACK').load('services/HEP_C.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#HIV_STACK').load('services/HIV.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#FLU_STACK').load('services/FLU.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#IPPE_STACK').load('services/IPPE.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#CARDIO_IBT_STACK').load('services/CARDIO_IBT.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#OBESITY_IBT_STACK').load('services/OBESITY_IBT.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#LUNG_CAN_STACK').load('services/LUNG_CAN.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#MNT_STACK').load('services/MNT.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#PNEUMO_STACK').load('services/PNEUMO.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#PROSTATE_CAN_STACK').load('services/PROSTATE_CAN.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#CERV_CAN_STACK').load('services/CERV_CAN.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#STI_STACK').load('services/STI.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#MAMMO_STACK').load('services/MAMMO.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#PAP_STACK').load('services/PAP.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#PELVIC_STACK').load('services/PELVIC.html #WRAPPER');
		$('#SERVICE>#PRINT_STACK>#ULTRASOUND_STACK').load('services/ULTRASOUND.html #WRAPPER');
	}
	else
	{
		$('#ALL_SERVICES').removeClass('checkAll');
		$('#ALL_SERVICES input').prop('checked',false);
		$('#SELECT_ALL').html('Select All');
		$('#SERVICE>#PRINT_STACK>div').empty();
	}
}

function closePrint()
{
	'use strict';
	var Serviced = $('#SERVICE').is('.view');
	$('body').removeClass('noScroll');
	$('header, main, footer').find('a, button').attr('tabindex','0');
	$('#PRINT_QUESTION').removeClass('showMe').attr('aria-hidden',true).find('input, button').attr('tabindex','-1');
	$('#FAQ, #RESOURCES, #DISCLAIMERS').addClass('no-print');
	$('#FAQ_PRINT, #RES_PRINT, #DIS_PRINT').attr('checked', false);
	$('#ALL_SERVICES').removeAttr('class');
	$('#ALL_SERVICES input').prop('checked',false);
	$('#PRINT_STACK>div').empty();
	$('#SERVICE>#WRAPPER').removeClass('no-print');
	if (Serviced)
	{
		$('html,body').animate({ scrollTop: $('#SERVICE').offset().top-0 }, 600, 'easeOutQuart');
	}
}