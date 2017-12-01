class AddReadFlagToLinks < ActiveRecord::Migration[5.1]
  class Link < ActiveRecord::Base
  end

  def up
    add_column :links, :read, :boolean, null: false, default: false
    Link.all.each do |link|
      link.update!(read: link.read_at.present?)
    end
  end

  def down
    remove_column :links, :read, :boolean, null: false, default: false
  end
end
