# frozen_string_literal: true

module Api
  class ApplicationResource < JSONAPI::Resource
    abstract

    class << self
      private

      def current_user(options)
        options.fetch(:context).fetch(:current_user)
      end
    end
  end
end
