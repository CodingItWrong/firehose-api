# frozen_string_literal: true

module Webhooks
  class HydrantController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :verify_api_key

    def post
      ParseLinkJob.parse(link_params)
      head :accepted
    end

    private

    def verify_api_key
      provided_header = request.headers['HTTP_AUTHORIZATION']
      required_header = "Bearer #{FirehoseConfig.api_key}"
      head :unauthorized unless provided_header == required_header
    end

    def link_params
      params.permit(:url, :title)
    end
  end
end
