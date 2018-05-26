# frozen_string_literal: true

require 'link_parser'

class ParseLinkJob < ApplicationJob
  def self.parse(link)
    perform_later(link.id)
  end

  def perform(link_id)
    link = Link.find(link_id)

    parsed_link = link_parser.process(url: link.url)

    attributes = {url: parsed_link.canonical}
    if default_title?(link)
      attributes[:title] = parsed_link.title
    end

    link.update!(attributes)
  end

  private

  def link_parser
    LinkParser
  end

  def default_title?(link)
    link.title.blank? || link.title == link.url
  end
end
