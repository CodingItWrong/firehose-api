class ChangePublicToPublishedAtInLinks < ActiveRecord::Migration[5.1]
  class Link < ActiveRecord::Base
  end

  def up
    add_column :links, :published_at, :datetime
    Link.where(public: true).update_all(published_at: Time.now)
    remove_column :links, :public, :boolean
  end

  def down
    add_column :links, :public, :boolean
    Link.where("published_at IS NOT NULL").update_all(public: true)
    remove_column :links, :published_at, :datetime
  end
end
