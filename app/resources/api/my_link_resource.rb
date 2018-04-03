# frozen_string_literal: true

require 'link_parser'

module Api
  class MyLinkResource < ApplicationResource
    model_name 'Link'

    attributes *%i[title url comment source read moved_to_list_at public published_at tag_list]

    relationship :tags, to: :many, class_name: 'Api::Tag'

    filter :read

    before_save :populate_title

    def self.creatable_fields(context)
      super - %i[moved_to_list_at published_at tag_list]
    end

    def self.updatable_fields(context)
      super - %i[moved_to_list_at published_at]
    end

    def self.records(options = {})
      user = current_user(options)
      if user.present?
        Link.all
      else
        Link.publicly_visible
      end
    end

    private

    def link_parser
      LinkParser
    end

    def populate_title
      return if @model.id.present?
      link = link_parser.process(url: url)
      @model.title = link.title
    end
  end
end
