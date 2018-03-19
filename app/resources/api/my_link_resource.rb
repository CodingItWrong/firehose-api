# frozen_string_literal: true

module Api
  class MyLinkResource < JSONAPI::Resource
    model_name 'Link'

    attributes *%i[title url]
  end
end
