class TransferTaggingsToLinksTags < ActiveRecord::Migration[5.1]
  class Tagging < ActiveRecord::Base
  end

  class LinksTag < ActiveRecord::Base
  end

  def change
    Tagging.all.each do |tagging|
      LinksTag.create(link_id: tagging.taggable_id, tag_id: tagging.tag_id)
    end
  end
end
