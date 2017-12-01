class RemoveReadAtFromLinks < ActiveRecord::Migration[5.1]
  class Link < ActiveRecord::Base
  end

  def up
    remove_column :links, :read_at, :datetime
  end

  def down
    add_column :links, :read_at, :datetime
    Link.all.each do |link|
      link.update!(read_at: DateTime.now) if link.read?
    end
  end
end
