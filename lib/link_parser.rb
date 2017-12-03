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
    unescape(parse(get(url).body).xpath('//head/title[1]').text.strip)
  end

  private

  def get(url)
    HTTParty.get(url)
  end

  def parse(html)
    Nokogiri::HTML(html)
  end

  def unescape(string)
    CGI.unescapeHTML(string)
  end
end
