# frozen_string_literal: true

module Links
  class ReadController < ApplicationController
    before_action :authenticate_user!

    def index
      @links = Link.newest.read
    end
  end
end
