# frozen_string_literal: true

module Api
  class MyLinkResource < ApplicationResource
    model_name 'Link'

    attributes *%i[title url comment source read moved_to_list_at public published_at]

    filter :read

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
  end
end
