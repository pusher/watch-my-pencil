class GameController < ApplicationController

	def start

		# Get list of players
		players = Pusher.get("/channels/presence-players-#{params[:game_id]}/users")

		# Send out roles
		Pusher.trigger("private-game-#{params[:game_id]}", "new-turn", { :drawer => players[:users][0]['id'] })

		render :nothing => true, :status => 200, :content_type => 'text/json'
	end

	def auth
		channelName = params[:channel_name]

		if params[:channel_name].match(/^presence-/)

			#If a presence channel
			response = Pusher[params[:channel_name]].authenticate(params[:socket_id], {
		        :user_id => params[:socket_id].sub('.',''),
		        :user_info => {
		          :name => params[:player_name]
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
