# frozen_string_literal: true

module Public
  class TagsController < ApplicationController
    def index
      query = <<-QUERY
        SELECT DISTINCT t.*
        FROM tags t
          JOIN taggings tl ON t.id = tl.tag_id
          JOIN links l ON tl.taggable_type = 'Link' AND tl.taggable_id = l.id
          WHERE l.public = TRUE
        ORDER BY t.name ASC
      QUERY
      @tags = ActsAsTaggableOn::Tag.find_by_sql(query)
    end

    def show
      @tag = ActsAsTaggableOn::Tag.where(name: params[:id]).first
      @links = Link.joins(:tags)
                   .where('tags.id' => @tag.id)
                   .newest
                   .publicly_visible
    end
  end
end
