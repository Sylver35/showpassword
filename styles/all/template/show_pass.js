/** Modifie the Dom **/
if ($('#'+credential)){
	$('<div id="passContainer"></div>').insertBefore('#'+credential);
	$('#passContainer').prepend($('#'+credential));

	if(showPasswordLogin){
		$('<input type="text" tabindex="2" id="passTxt" size="25" class="inputbox autowidth" title="'+password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+credential).hide();
	}
	else if (showPasswordForum){
		$('<input type="text" tabindex="1" id="passTxt" size="25" class="inputbox narrow" title="'+password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+credential).hide();
	}
	else if (showPasswordQuick){
		$('<input type="text" tabindex="2" id="passTxt" size="25" class="inputbox autowidth" title="'+password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+credential).hide();
	}
	else {
		$('<input type="text" id="passTxt" size="10" class="inputbox" title="'+password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+credential).hide();
	}

	$('<div id="assistant-visual" class="input-controll-visual"><div class="assistant-area"><div id="assistant-icon" class="eui-svg-assistant eui-icon-assistant-hide"><button id="assistant-btn" type="button" onclick="passSwitch();" class="transparent-btn" title="'+affiche+'"><span id="assistant-msg" class="sr-only">'+affiche+'</span></button></div></div></div>').insertAfter('#passTxt');
}

function passSwitch()
{
	if (!$('#passTxt').is(':visible')){
		$('#assistant-icon').removeClass('eui-icon-assistant-hide').addClass('eui-icon-assistant-show');
		$('#'+credential).addClass('off-screen').prop('aria-hidden', true).on('input', function(){$('#passTxt').val($('#'+credential).val());});
		$('#passTxt').val($('#'+credential).val()).show().prop('aria-hidden', false).on('input', function(){$('#'+credential).val($('#passTxt').val());});
		$('#assistant-msg').text(cache);
		$('#assistant-btn').attr('title', cache);
	}
	else {
		$('#assistant-icon').removeClass('eui-icon-assistant-show').addClass('eui-icon-assistant-hide');
		$('#passTxt').hide().prop('aria-hidden', true).off('input');
		$('#'+credential).removeClass('off-screen').prop('aria-hidden', false).off('input', function(){$('#passTxt').val($('#'+credential).val());});
		$('#assistant-msg').text(affiche);
		$('#assistant-btn').attr('title', affiche);
		$('#passTxt').off('input focus').off('blur');
	}
}
