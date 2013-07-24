class HomeController < ApplicationController

	def index

	end

	def create
	end

	def create_action

		game = Game.find_or_initialize_by_name params[:game_name]
  
		if game.new_record?
			game.started = false
			game.finished = false
			game.save

			session[:game_id] = game.id
			session[:player_name] = params[:player_name]

			redirect_to game_url(:is_creator => 1)
		else
			redirect_to create_url, :notice => 'This game already exists'
		end

	end

	def join_action

		if Game.check_can_join params[:game_name]
			game = Game.find_by_name params[:game_name]
			
			session[:game_id] = game.id
			session[:player_name] = params[:player_name]

			redirect_to game_url
		else
			redirect_to home_url, :notice => 'Could not find that game!'
		end

	end
	
end
