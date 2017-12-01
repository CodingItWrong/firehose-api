class AddMovedToListAtToLinks < ActiveRecord::Migration[5.1]
  class Link < ActiveRecord::Base
  end

  def up
    add_column :links, :moved_to_list_at, :datetime
    Link.all.each do |link|
      link.update!(moved_to_list_at: link.read_at.present? ? link.read_at : link.created_at)
    end
  end

  def down
    remove_column :links, :moved_to_list_at, :datetime
  end
end
