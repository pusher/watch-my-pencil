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

			player = GamePlayer.new
			player.game_id = game.id
			player.name = params[:player_name]
			player.score = 0
			player.save

			session[:game_id] = game.id
			session[:player_id] = player.id
			session[:player_name] = params[:player_name]

			redirect_to game_url(:is_creator => 1)
		else
			redirect_to create_url, :notice => 'This game already exists'
		end

	end

	def join_action

		if Game.check_can_join params[:game_name]
			game = Game.find_by_name params[:game_name]

			player = GamePlayer.new
			player.game_id = game.id
			player.name = params[:player_name]
			player.score = 0
			player.save
			
			session[:game_id] = game.id
			session[:player_id] = player.id
			session[:player_name] = params[:player_name]

			redirect_to game_url
		else
			redirect_to home_url, :notice => 'Could not find that game!'
		end

	end

	def test

	end
	
end
