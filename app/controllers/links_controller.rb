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
    @link = Link.new(new_link_params)

    if @link.save
      redirect_to links_path
    else
      render :new
    end
  end

  def edit
    @link = Link.find(params[:id])
  end

  def update
    @link = Link.find(params[:id])

    if @link.update(edit_link_params)
      redirect_to links_path
    else
      render :edit
    end
  end

  private

  def link_parser
    LinkParser.instance
  end

  def new_link_params
    params.require(:link)
          .permit(:url)
          .tap { |params|
            params.merge!(title: link_parser.title(url: params[:url]))
          }
  end

  def edit_link_params
    params.require(:link)
          .permit(:url, :title, :comment)
  end
end
