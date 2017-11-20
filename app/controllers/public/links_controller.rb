# frozen_string_literal: true

require 'link_parser'

module Public
  class LinksController < ApplicationController
    def index
      @links = Link.newest.publicly_visible
    end
  end
end
