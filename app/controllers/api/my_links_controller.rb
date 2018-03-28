# frozen_string_literal: true

module Api
  class MyLinksController < ResourceController
    before_action :doorkeeper_authorize!, except: :index
  end
end
