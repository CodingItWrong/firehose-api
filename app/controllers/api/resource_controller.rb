# frozen_string_literal: true

module Api
  class ResourceController < JSONAPI::ResourceController
    private

    def context
      {current_user: current_user}
    end

    def current_user
      if doorkeeper_token
        @current_user ||= User.find(doorkeeper_token.resource_owner_id)
      end
    end
  end
end
