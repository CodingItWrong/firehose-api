# frozen_string_literal: true

require 'link_parser'

class ParseLinkJob < ApplicationJob
  def self.parse(link_params)
    perform_later(link_params)
  end

  def perform(link_params)
    link = Link.create!(link_params)
    parsed_link = link_parser.process(url: link_params[:url])

    attributes = { url: parsed_link.canonical }
    attributes[:title] = parsed_link.title if default_title?(link_params)

    link.update!(attributes)
  end

  private

  def link_parser
    LinkParser
  end

  def default_title?(link_params)
    link_params[:title].blank? || link_params[:title] == link_params[:url]
  end
end
