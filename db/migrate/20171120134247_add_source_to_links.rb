class AddSourceToLinks < ActiveRecord::Migration[5.1]
  def change
    add_column :links, :source, :string
  end
end
