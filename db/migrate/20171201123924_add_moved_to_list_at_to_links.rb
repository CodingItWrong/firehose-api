class AddMovedToListAtToLinks < ActiveRecord::Migration[5.1]
  def change
    add_column :links, :moved_to_list_at, :datetime
  end
end
