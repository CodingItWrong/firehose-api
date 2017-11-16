class AddTitleToLink < ActiveRecord::Migration[5.1]
  def change
    add_column :links, :title, :string
  end
end
