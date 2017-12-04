# frozen_string_literal: true

require 'httparty'
require 'nokogiri'
require 'pry'
require 'fake_link_parser'

class LinkParser
  def self.class_to_instantiate
    @class_to_instantiate ||= LinkParser
  end

  def self.fake!
    @class_to_instantiate = FakeLinkParser
  end

  def self.reset!
    @class_to_instantiate = nil
  end

  def self.process(url:)
    class_to_instantiate.new(url: url)
  end

  def initialize(url:)
    @url = url
  end

  def canonical
    get(url).request.last_uri.to_s
  end

  def title
    unescape(parse(get(url).body).xpath('//head/title[1]').text.strip)
  end

  private

  attr_reader :url

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
