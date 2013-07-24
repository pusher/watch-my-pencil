class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.boolean :finished
      t.boolean :started
      t.integer :current_player

      t.timestamps
    end
  end
end
