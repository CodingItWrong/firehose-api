# frozen_string_literal: true

require 'net/http'
require 'nokogiri'
require 'pry'
require 'fake_link_parser'

class LinkParser
  def self.instance
    @instance ||= LinkParser.new
  end

  def self.fake!
    @instance = FakeLinkParser.new
  end

  def title(url:)
    parse(get(url)).xpath('//title').text
  end

  private

  def get(url)
    Net::HTTP.get(URI(url))
  end

  def parse(html)
    Nokogiri::HTML(html)
  end
end
