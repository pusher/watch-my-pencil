class GamePlayer < ActiveRecord::Base
  attr_accessible :game_id, :name, :score
end
