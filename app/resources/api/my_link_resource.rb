# frozen_string_literal: true

module Api
  class MyLinkResource < ApplicationResource
    model_name 'Link'

    attributes *%i[title url comment source read]

    filter :read

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
