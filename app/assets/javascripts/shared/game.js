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
		  if(WMP.Pusher.playerId == data.drawer)
		  {
		  	// I'm drawing
		  	$('#joining').hide();
		  	$('#drawing').show();
		  	$('#watching').hide();

		  	WMP.Drawing.resizeCanvas('#drawArea', 40);
			WMP.Drawing.setupDrawEvents();
		  	WMP.Drawing.setupGuessListener();
		  }
		  else
		  {
		  	// I'm not drawing
		  	$('#joining').hide();
		  	$('#drawing').hide();
		  	$('#watching').show();

		  	WMP.Drawing.resizeCanvas('#watchArea', 40);
			WMP.Drawing.setupDrawListener();
		  }
		});
	}

};