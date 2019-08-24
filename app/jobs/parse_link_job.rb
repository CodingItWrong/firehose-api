# frozen_string_literal: true

require 'link_parser'

class ParseLinkJob < ApplicationJob
  def self.parse(link)
    perform_later(link)
  end

  def perform(link)
    parsed_link = link_parser.process(url: link.url)

    attributes = { url: parsed_link.canonical }
    attributes[:title] = parsed_link.title if default_title?(link)

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
