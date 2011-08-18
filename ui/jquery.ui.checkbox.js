/*-------------------------------------------------------------------- 
 * jQuery plugin: customInput()
 * by Maggie Wachs and Scott Jehl, http://www.filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * Dual licensed under the MIT (filamentgroup.com/examples/mit-license.txt) and GPL (filamentgroup.com/examples/gpl-license.txt) licenses.
 * Article: http://www.filamentgroup.com/lab/accessible_custom_designed_checkbox_radio_button_inputs_styled_css_jquery/  
 *
 * Modifications by Craig Oshima, http://www.coshima.com
 * Explanation: http://www.coshima.com/
-------------------------------------------------------------------*/


jQuery.fn.customInput = function(){
	$(this).each(function(i){	
		if($(this).is('input:checkbox,input:radio')){
			var input = $(this);
			
			// get the associated label using the input's id
			var label = input.next();
			
			// wrap the input + label in a div 
			var wrapper = $("<div/>");
			if (input.is(':checkbox')) {
				wrapper.addClass("custom-checkbox");
			}
			else {
				wrapper.addClass("custom-radio");
			}
			wrapper.insertBefore(input).append(input, label);
			
			// necessary for browsers that don't support the :hover pseudo class on labels
			label.hover(
				function(){ 
					if (!this.disabled) {
						$(this).addClass('hover');
					} 
				},
				function(){ 
					$(this).removeClass('hover'); 
				} 
			);
			
			//bind custom event and trigger it, then bind click,focus,blur events					
			input.bind('updateState', function(){	
				label.toggleClass("disabled", input.is(":disabled"));
				if (input.is(':checked')) {
					if (input.is(':radio')) {
						$('input[name='+input.attr('name')+']').each(function(){
							$('label[for='+$(this).attr('id')+']').removeClass('checked');
						});		
					};
					label.addClass('checked');
				}
				else { 
					label.removeClass('checked');
				}
			})
			.trigger('updateState')
			.click(function(){ 
				$(this).trigger('updateState'); 
			})
			.focus(function(){ 
				label.addClass('focus'); 
			})
			.blur(function(){ label.removeClass('focus '); });
		}
	});
};

	
	
