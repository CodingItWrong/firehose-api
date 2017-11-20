# frozen_string_literal: true

module Webhooks
  class HydrantController < ApplicationController
    skip_before_action :verify_authenticity_token

    def post
      Link.create!(link_params)
      head :created
    end

    private

    def link_params
      params.permit(:url, :title)
    end
  end
end
