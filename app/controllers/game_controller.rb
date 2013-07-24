class GameController < ApplicationController

	def start

		game = Game.find_by_id params[:game_id]

		if game
			game.started = true
			game.current_player = 0
			game.save

			# Get list of players
			players = GamePlayer.where(:game_id => game.id)

			# Send out roles
			Pusher.trigger("private-game-#{params[:game_id]}", "new-turn", { :drawer => players[game.current_player].id })

			render :nothing => true, :status => 200, :content_type => 'text/json'
		else
			render :nothing => true, :status => 404, :content_type => 'text/json'
		end
		
	end

	def endturn

		game = Game.find_by_id params[:game_id]

		if game

			player = GamePlayer.where(:id => params[:winner_id]).first
			player.score = player.score + 1
			player.save

			players = GamePlayer.where(:game_id => game.id)
			game.current_player = game.current_player + 1
			
			if(game.current_player == players.length)
				# This is end of round
				Pusher.trigger("private-game-#{params[:game_id]}", "end-round", { :players => players })
			else
				game.save
				Pusher.trigger("private-game-#{params[:game_id]}", "new-turn", { :drawer => players[game.current_player].id })
			end

			render :nothing => true, :status => 200, :content_type => 'text/json'
		else
			render :nothing => true, :status => 404, :content_type => 'text/json'
		end

	end

	def newround
		game = Game.find_by_id params[:game_id]

		if game
			game.current_player = 0
			game.save
			
			# Get list of players
			players = GamePlayer.where(:game_id => game.id)

			Pusher.trigger("private-game-#{params[:game_id]}", "new-turn", { :drawer => players[game.current_player].id })

			render :nothing => true, :status => 200, :content_type => 'text/json'
		else
			render :nothing => true, :status => 404, :content_type => 'text/json'
		end
	end

	def auth
		channelName = params[:channel_name]

		if params[:channel_name].match(/^presence-/)

			player = GamePlayer.where(:id => params[:player_id]).first

			#If a presence channel
			response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
		        :user_id => params[:player_id],
		        :user_info => {
		          :name => player.name
		        }
		      })
		    
		else

			# If a private channel
			response = Pusher[params[:channel_name]].authenticate(params[:socket_id])

		end

	    render :json => response
	end

	def index
		@is_creator = params[:is_creator]
	end

end
