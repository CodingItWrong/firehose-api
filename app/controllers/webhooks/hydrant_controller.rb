# frozen_string_literal: true

require 'link_parser'

module Webhooks
  class HydrantController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :verify_api_key

    def post
      Link.create!(link_params)
      head :created
    end

    private

    def link_parser
      LinkParser
    end

    def verify_api_key
      provided_header = request.headers['HTTP_AUTHORIZATION']
      required_header = "Bearer #{FirehoseConfig.api_key}"
      head :unauthorized unless provided_header == required_header
    end

    def link_params
      params.permit(:url, :title)
            .tap { |params|
              link = link_parser.process(url: params[:url])
              params.merge!(url: link.canonical)
              if default_title?
                params.merge!(title: link.title)
              end
            }
    end

    def default_title?
      params[:title].blank? || params[:title] == params[:url]
    end
  end
end
