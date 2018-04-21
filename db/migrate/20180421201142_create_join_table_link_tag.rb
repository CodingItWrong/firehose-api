class CreateJoinTableLinkTag < ActiveRecord::Migration[5.1]
  def change
    create_join_table :links, :tags do |t|
      # t.index [:link_id, :tag_id]
      # t.index [:tag_id, :link_id]
    end
  end
end
