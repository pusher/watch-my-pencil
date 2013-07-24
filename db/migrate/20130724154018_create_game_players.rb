class CreateGamePlayers < ActiveRecord::Migration
  def change
    create_table :game_players do |t|
      t.integer :game_id
      t.integer :score
      t.string :name

      t.timestamps
    end
  end
end
