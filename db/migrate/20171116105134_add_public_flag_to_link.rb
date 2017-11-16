class AddPublicFlagToLink < ActiveRecord::Migration[5.1]
  def change
    add_column :links, :public, :boolean
  end
end
