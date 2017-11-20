# frozen_string_literal: true

require 'link_parser'

module Public
  class LinksController < ApplicationController
    def index
      @links = Link.publicly_visible.in_publish_order
    end
  end
end
