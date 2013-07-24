var WMP = WMP || {};

WMP.Pusher = {
	setupLogging: function() {
		Pusher.log = function (message) {
	      if (window.console && window.console.log) {
	          window.console.log(message);
	      }
	    };
	},

	connect: function() {
		
		this.pusher = new Pusher(PUSHER_CONFIG.APP_KEY, { authEndpoint: "/game/auth?player_name=" + player_name });

		this.pusher.connection.bind('connected', function () {
	        WMP.Pusher.socketId = WMP.Pusher.pusher.connection.socket_id;
	        WMP.Pusher.playerId = WMP.Pusher.socketId.replace(".", "");
	        console.log("Player ID: " + WMP.Pusher.playerId);
	    });

	},

	subscribeToGameControl: function()
	{
		this.gameControlChannel = this.pusher.subscribe('private-game-' + game_id);
	},

	subscribeToDrawUpdates: function()
	{
		this.drawUpdatesChannel = this.pusher.subscribe('private-draw-updates-' + game_id);
	},

	subscribeToGuesses: function()
	{
		this.guessesChannel = this.pusher.subscribe('private-guesses-' + game_id);
	},

	subscribeToPresence: function()
	{
		this.playersChannel = this.pusher.subscribe('presence-players-' + game_id);
	}

};