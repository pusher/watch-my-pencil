class GameController < ApplicationController

	def scores

	end

	def draw

	end

	def watch

	end

	def auth
	    response = Pusher[params[:channel_name]].authenticate(params[:socket_id])
	    render :json => response
	end

end
