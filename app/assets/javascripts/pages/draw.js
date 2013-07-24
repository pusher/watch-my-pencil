var inDrag = false;
var coordinates = new Array();

$(function() {
	
	// Setup drawing canvas
	WMP.Drawing.resizeCanvas(40);
	WMP.Drawing.setupDrawEvents();

	// Setup Pusher
	WMP.Pusher.setupLogging();
	WMP.Pusher.connect();
	WMP.Pusher.subscribeToDrawUpdates();
	WMP.Pusher.subscribeToGuesses();

	WMP.Drawing.setupGuessListener();

});


