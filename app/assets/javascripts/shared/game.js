var WMP = WMP || {};

WMP.Game = {
	setupPresence: function() {
		
		WMP.Pusher.playersChannel.bind('pusher:subscription_succeeded', function(members) {
		  WMP.Game.updatePlayersList();
		});

		WMP.Pusher.playersChannel.bind('pusher:member_added', function(member) {
		  WMP.Game.updatePlayersList();
		});

		WMP.Pusher.playersChannel.bind('pusher:member_removed', function(member) {
		  WMP.Game.updatePlayersList();
		});
	},

	updatePlayersList: function()
	{
		$('#players').empty();
		
		WMP.Pusher.playersChannel.members.each(function (member) {
	        $('#players').append('<li>' + member.info.name + '</li>');        
	    });
	},

	setupTurnsListener: function()
	{
		WMP.Pusher.gameControlChannel.bind('new-turn', function(data) {
		  if(player_id == data.drawer)
		  {
		  	// I'm drawing
		  	$('#joining').hide();
		  	$('#drawing').show();
		  	$('#watching').hide();
		  	$('#scores').hide();

		  	WMP.Drawing.resizeCanvas('#drawArea', 400, 8);
			WMP.Drawing.setupDrawEvents();
		  	WMP.Game.setupGuessListener();
		  	WMP.Game.setupPlayerGuessList();
		  	WMP.Game.destroyDrawListener();
		  }
		  else
		  {
		  	// I'm not drawing
		  	$('#joining').hide();
		  	$('#drawing').hide();
		  	$('#watching').show();
		  	$('#scores').hide();

		  	WMP.Drawing.resizeCanvas('#watchArea', 400, 8);
			WMP.Game.setupDrawListener();
			WMP.Game.destroyGuessListener();

		  }
		});

		WMP.Pusher.gameControlChannel.bind('end-round', function(data) {
		  
		  $('#joining').hide();
		  $('#drawing').hide();
		  $('#watching').hide();
		  $('#scores').show();

		  WMP.Game.destroyDrawListener();
		  WMP.Game.destroyGuessListener();

		  console.log(data);

		  $('#score-list').empty();
		
		  for(i = 0; i < data.players.length; i++)
		  {
			$('#score-list').append('<li>' + data.players[i].name + ': <span id="score">' + data.players[i].score + '</span></li>');        
		  }

		});
	},

	setupDrawListener: function()
	{
		WMP.Pusher.drawUpdatesChannel.bind('client-new-coordinates', function(data) {
			WMP.Drawing.drawPath(data);
		});
	},

	destroyDrawListener: function()
	{
		WMP.Pusher.drawUpdatesChannel.unbind('client-new-coordinates');
	},

	setupGuessListener: function()
	{
		WMP.Pusher.guessesChannel.bind('client-new-guess', function(data) {
			console.log('New guess: ' + data);
			$('#guess-' + data.player_id).html(data.guess);
		});
	},

	destroyGuessListener: function()
	{
		WMP.Pusher.guessesChannel.unbind('client-new-guess');
	},

	submitGuess: function(guess)
	{
		WMP.Pusher.guessesChannel.trigger('client-new-guess', { guess: guess, player_id: player_id });
	},

	setupPlayerGuessList: function()
	{
		$('#player-guesses').empty();
		
		WMP.Pusher.playersChannel.members.each(function (member) {
			if(member.id != player_id)
			{
				$('#player-guesses').append('<li><a id="guess-' + member.id + '" href="#" onclick="WMP.Game.guessedRight(' + member.id + ')">...waiting for guess...</a></li>');
		    }
	    });
		
	},

	guessedRight: function(player_id)
	{
		console.log('Player guessed right! ' + player_id);
		this.triggerNextTurn(player_id);
	},

	triggerNextTurn: function(winner_id)
	{	
		$.post('endturn?game_id=' + game_id + '&winner_id=' + winner_id);
	},

	triggerNewRound: function()
	{	
		$.post('newround?game_id=' + game_id);
	}

};