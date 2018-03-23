# frozen_string_literal: true

module Api
  class ResourceController < JSONAPI::ResourceController
    private

    def context
      {current_user: current_user}
    end

    def current_user
      @current_user ||= User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
    end
  end
end
