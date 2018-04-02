# frozen_string_literal: true

module Api
  class TagResource < ApplicationResource
    model_name 'ActsAsTaggableOn::Tag'

    attribute :name

    relationship :my_links, to: :many
  end
end
