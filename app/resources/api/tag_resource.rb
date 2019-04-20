# frozen_string_literal: true

module Api
  class TagResource < ApplicationResource
    attribute :name

    filter :name

    relationship :bookmarks, to: :many, relation_name: :links

    def self.records(options = {})
      user = current_user(options)
      user.present? ? Tag.all : Tag.publicly_visible
    end
  end
end
