class Game < ActiveRecord::Base
  attr_accessible :finished, :started, :name

  def self.check_can_join(name)
  	game = Game.find_by_name(name)

  	if game.nil?
  		return false
  	end

  	if game.finished || game.started
  		return false
  	end

  	return true

  end

end
