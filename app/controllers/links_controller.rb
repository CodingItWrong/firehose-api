# frozen_string_literal: true

require 'link_parser'

class LinksController < ApplicationController
  def index
    @links = Link.all
  end

  def new
    @link = Link.new
  end

  def create
    @link = Link.new(link_params)

    if @link.save
      redirect_to links_path
    else
      render :new
    end
  end

  private

  def link_parser
    LinkParser.instance
  end

  def link_params
    params.require(:link)
          .permit(:url)
          .tap { |params|
            params.merge!(title: link_parser.title(url: params[:url]))
          }
  end
end
