# frozen_string_literal: true

require 'httparty'
require 'nokogiri'
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

  def self.process(url:, timeout_seconds: 5, logger: Rails.logger)
    class_to_instantiate.new(
      url: url,
      timeout_seconds: timeout_seconds,
      logger: logger,
    )
  end

  def initialize(url:, timeout_seconds:, logger:)
    @url = url
    @timeout_seconds = timeout_seconds
    @logger = logger
  end

  def canonical
    get(url).request.last_uri.to_s
  end

  def title
    title = title_from_page(url)
    return title if title != ''
    last_path_segment(url)
  end

  private

  attr_reader :url, :timeout_seconds, :logger

  def title_from_page(url)
    nokogiri = parse(get(url).body)
    title = unescape(nokogiri.xpath('(//title)[1]').text.strip)
    title
  end

  def get(url)
    response = HTTParty.get(url)
    follow_refreshes(url, response)
  end

  def follow_refreshes(original_url, original_response)
    refresh_url = refresh_url(original_response)
    return original_response unless refresh_url
    absolute_url = absolute_url(original_url, refresh_url)
    follow_refreshes(absolute_url, get(absolute_url))
  end

  def refresh_url(response)
    refresh_tag =
      parse(response.body).xpath('//meta').find do |meta_tag|
        attribute = attribute_case_insensitive(meta_tag, 'http-equiv')
        return false if attribute.nil?
        attribute.value.downcase == 'refresh'
      end
    return if refresh_tag.nil?

    refresh_content = attribute_case_insensitive(refresh_tag, 'content')
    refresh_content.value.split('url=')[1]
  end

  def absolute_url(original_url, url)
    current_page = URI.parse(original_url)
    uri = URI.parse(url)

    # if uri is only a non-relative path, you need to prepend
    # the path from the location of the document
    if uri.path && !uri.path.start_with?('/')
      uri.path = File.join current_page.path, uri.path
    end

    uri.scheme ||= current_page.scheme
    uri.host ||= current_page.host
    uri.to_s #=> "http://www.example.org/example/foo"
  end

  def attribute_case_insensitive(tag, attribute_name)
    attributes = tag.attributes
    http_equiv_key =
      attributes.keys.find { |key| key.downcase == attribute_name.downcase }
    attributes[http_equiv_key]
  end

  def parse(html)
    Nokogiri.HTML(html)
  end

  def unescape(string)
    CGI.unescapeHTML(string)
  end

  def last_path_segment(url)
    url.split('?').first.split('/').last.titleize
  end
end
