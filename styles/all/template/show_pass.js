/** Modifie the Dom **/
if ($('#'+showPass.credential)){
	$('<div id="passContainer"></div>').insertBefore('#'+showPass.credential);
	$('#passContainer').prepend($('#'+showPass.credential));

	if(showPass.passwordLogin){
		$('<input type="text" tabindex="2" id="passTxt" size="25" class="inputbox autowidth" title="'+showPass.password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+showPass.credential).hide();
	}else if(showPass.passwordUcp){
		$('<input type="text" tabindex="3" id="passTxt" size="25" class="inputbox autowidth" title="'+showPass.password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+showPass.credential).hide();
	}else if(showPass.passwordForum){
		$('<input type="text" tabindex="1" id="passTxt" size="25" class="inputbox narrow" title="'+showPass.password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+showPass.credential).hide();
	}else if(showPass.passwordQuick){
		$('<input type="text" tabindex="2" id="passTxt" size="25" class="inputbox autowidth" title="'+showPass.password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+showPass.credential).hide();
	}else if(showPass.passwordIndex){
		$('<input type="text" id="passTxt" size="10" class="inputbox" title="'+showPass.password+'" spellcheck="false" autocorrect="off"></input>').insertAfter('#'+showPass.credential).hide();
	}

	$('<div id="assistant-visual" class="input-controll-visual"><div class="assistant-area"><div id="assistant-icon" class="eui-svg-assistant eui-icon-assistant-hide"><button id="assistant-btn" type="button" onclick="passSwitch();" class="transparent-btn" title="'+showPass.show+'"><span id="assistant-msg" class="sr-only">'+showPass.show+'</span></button></div></div></div>').insertAfter('#passTxt');
}

function passSwitch(){
	if(!$('#passTxt').is(':visible')){
		$('#assistant-icon').removeClass('eui-icon-assistant-hide').addClass('eui-icon-assistant-show');
		$('#'+showPass.credential).addClass('off-screen').prop('aria-hidden', true).on('input', function(){$('#passTxt').val($('#'+showPass.credential).val());});
		$('#passTxt').val($('#'+showPass.credential).val()).show().prop('aria-hidden', false).on('input', function(){$('#'+showPass.credential).val($('#passTxt').val());});
		$('#assistant-msg').text(showPass.hide);
		$('#assistant-btn').attr('title', showPass.hide);
	}else{
		$('#assistant-icon').removeClass('eui-icon-assistant-show').addClass('eui-icon-assistant-hide');
		$('#passTxt').hide().prop('aria-hidden', true).off('input');
		$('#'+showPass.credential).removeClass('off-screen').prop('aria-hidden', false).off('input', function(){$('#passTxt').val($('#'+showPass.credential).val());});
		$('#assistant-msg').text(showPass.show);
		$('#assistant-btn').attr('title', showPass.show);
		$('#passTxt').off('input focus').off('blur');
	}
}