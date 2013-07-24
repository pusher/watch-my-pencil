$(function() {
 
 	// Setup drawing canvas
	WMP.Drawing.resizeCanvas(200);
	
	// Setup Pusher
	WMP.Pusher.setupLogging();
	WMP.Pusher.connect();
	WMP.Pusher.subscribeToDrawUpdates();
	WMP.Pusher.subscribeToGuesses();

	WMP.Drawing.setupDrawListener();

	// Setup guess button
	$('#guess-btn').click(function() {
		var guessVal = $('#guess').val();

		if(guessVal != '')
		{
			WMP.Drawing.submitGuess(guessVal);
		}
	});

});



