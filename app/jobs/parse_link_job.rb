# frozen_string_literal: true

require 'link_parser'

class ParseLinkJob < ApplicationJob
  def self.parse(link_params)
    perform_later(link_params)
  end

  def perform(link_params)
    parsed_link = link_parser.process(url: link_params[:url])
    title = title_to_use(link_params, parsed_link)

    Link.create!(
      url: parsed_link.canonical,
      title: title,
    )
  end

  private

  def title_to_use(link_params, parsed_link)
    if default_title?(link_params)
      begin
        parsed_link.title
      rescue Cliver::Dependency::NotFound
        link_params[:title]
      end
    else
      link_params[:title]
    end
  end

  def link_parser
    LinkParser
  end

  def default_title?(link_params)
    link_params[:title].blank? || link_params[:title] == link_params[:url]
  end
end
