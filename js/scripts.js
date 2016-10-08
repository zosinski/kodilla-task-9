$(function(){

	// var span = $('span');
	
	// span.each(function(index, element) {
	// 	if(index % 2 == 0) {
	// 		console.log(index);
	// 		$(element).css('color', 'red');
	// 	};
	// });

	$('span:even').css('color','red');

	$('span').filter(':odd').css('color', 'yellow');

	$('p').each(function(index, element) {
		var button = '<button data-tmp="' + index + '">Przycisk: ' + index + '</button>';
		$(element).append(button);
	});

	$("button").click(function() {
		alert('Przycisk: ' + $(this).attr("data-tmp"));
	});

});