class AddTopTracksToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :top_tracks, :string
  end
end
