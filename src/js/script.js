;var app = (function($) {

    'use strict';

	var $form = $('#setupPanel form'),

	teams = [
		{
			groupName: 'Colors',
			names: ['Purple','Pink','Blue','Green','Yellow','Orange','Red','Black','Gray','White']
		},
		{
			groupName: 'Animals',
			names: ['Tigers','Lions','Wolves','Jaguars','Bears','Cheetahs','Leopards','Panthers','Gorillas','Eagles']
		},
		{
			groupName: 'Countries',
			names: ['United States','Japan','Germany','France','Russia','China','Spain','South Africa','Mexico','Brazil']
		},
		{
			groupName: 'Other',
			names: []
		}
	],
	
	setTeamNamesDropdown = function() {
		
		var $select = $form.find('select[name="teamNames"]');
		
		$.each(teams, function( index, value ) {
			
			$select.append($('<option></option>').attr('value',value.groupName).text(value.groupName));

		});
		
	},

    init  = function() {
	
		setTeamNamesDropdown();
	
	};

    return {
        init:init
    };

}(jQuery));

jQuery(function() {
    'use strict';
    app.init();
});
