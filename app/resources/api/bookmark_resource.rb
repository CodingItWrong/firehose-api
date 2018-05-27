# frozen_string_literal: true

require 'link_parser'

module Api
  class BookmarkResource < ApplicationResource
    model_name 'Link'

    attributes *%i[title url comment source read moved_to_list_at public published_at tag_list]

    relationship :tags, to: :many, class_name: 'Tag'

    filter :read

    before_save :populate_title
    before_save :check_for_publish
    after_save :send_web_mention

    def self.creatable_fields(context)
      super - %i[moved_to_list_at published_at]
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

    def check_for_publish
      @publishing = @model.published_at_was.nil? &&
                    @model.published_at.present?
    end

    def send_web_mention
      @publishing && web_mentioner.send_mention(link_url)
    end

    def web_mentioner
      WebMentioner
    end

    def link_url
      # need to create frontend page for individual link first
      'http://example.com/placeholder/link'
    end
  end
end
