# frozen_string_literal: true

require 'link_parser'

module Public
  class LinksController < ApplicationController
    def index
      @links = Link.publicly_visible.in_publish_order
    end

    def show
      @link = Link.find(params[:id])
      head :unauthorized unless @link.public?
    end
  end
end
