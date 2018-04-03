# frozen_string_literal: true

module Api
  class TagResource < ApplicationResource
    attribute :name

    relationship :my_links, {
      to: :many,
      relation_name: :taggables,
    }

    def self.records(options = {})
      user = current_user(options)
      if user.present?
        Tag.all
      else
        Tag.publicly_visible
      end
    end
  end
end
