# frozen_string_literal: true

require "link_parser"

module Api
  class BookmarkResource < ApplicationResource
    model_name "Link"

    attributes(*%i[
      title
      url
      comment
      source
      read
      moved_to_list_at
      public
      published_at
      tag_list
    ])

    relationship :tags, to: :many, class_name: "Tag"

    filter :read
    filter :title,
      apply: lambda { |records, value, _options|
        records.search(value[0])
      }

    paginator :optional_paged

    before_save :populate_title

    def self.creatable_fields(context)
      super - %i[moved_to_list_at published_at]
    end

    def self.updatable_fields(context)
      super - %i[moved_to_list_at published_at]
    end

    def self.records(options = {})
      user = current_user(options)
      scope = user.present? ? Link.all : Link.publicly_visible
      scope.in_move_order
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
