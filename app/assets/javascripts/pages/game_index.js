var inDrag = false;
var coordinates = new Array();

$(function() {

	// Setup Pusher
	WMP.Pusher.setupLogging();
	WMP.Pusher.connect();
	WMP.Pusher.subscribeToGameControl();
	WMP.Pusher.subscribeToPresence();
	WMP.Pusher.subscribeToDrawUpdates();
	WMP.Pusher.subscribeToGuesses();

	WMP.Game.setupPresence();
	WMP.Game.setupTurnsListener();

	$('#start').click(function() {
		$.post('start?game_id=' + game_id);
	});

	$('#drawing').hide();
  	$('#watching').hide();
  	$('#scores').hide();

  	$('#guess-btn').click(function() {
		var guessVal = $('#guess').val();

		if(guessVal != '')
		{
			WMP.Game.submitGuess(guessVal);
		}
	});

	$('#new-round-btn').click(function() {
		WMP.Game.triggerNewRound();
	});

});