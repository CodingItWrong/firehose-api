# frozen_string_literal: true

module Api
  class TagResource < ApplicationResource
    model_name 'ActsAsTaggableOn::Tag'

    attribute :name

    relationship :my_links, to: :many

    def self.records(options = {})
      user = current_user(options)
      if user.present?
        ActsAsTaggableOn::Tag.all
      else
        publicly_visible_tags
      end
    end

    private

    def self.publicly_visible_tags
      ActsAsTaggableOn::Tag
        .joins('INNER JOIN taggings tl ON tags.id = tl.tag_id')
        .joins('INNER JOIN links l ON tl.taggable_type = \'Link\' AND tl.taggable_id = l.id')
        .where('l.published_at IS NOT NULL')
    end
  end
end
