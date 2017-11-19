# frozen_string_literal: true

require 'httparty'
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
    parse(get(url)).xpath('//head/title').text
  end

  private

  def get(url)
    HTTParty.get(url).body
  end

  def parse(html)
    Nokogiri::HTML(html)
  end
end
