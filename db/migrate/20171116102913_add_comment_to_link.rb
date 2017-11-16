class AddCommentToLink < ActiveRecord::Migration[5.1]
  def change
    add_column :links, :comment, :text
  end
end
