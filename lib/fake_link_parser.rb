# frozen_string_literal: true

require 'active_support/core_ext/string/inflections'

class FakeLinkParser
  def self.process(url:, logger:)
    new(url: url, logger: logger)
  end

  def initialize(url:, logger:)
    @url = url
  end

  def title
    url.split('/').last.titleize
  end

  def canonical
    url
  end

  private

  attr_reader :url
end
