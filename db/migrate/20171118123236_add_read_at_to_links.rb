class AddReadAtToLinks < ActiveRecord::Migration[5.1]
  def change
    add_column :links, :read_at, :datetime
  end
end
