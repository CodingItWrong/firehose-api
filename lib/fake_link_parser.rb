# frozen_string_literal: true

require "active_support/core_ext/string/inflections"

class FakeLinkParser
  def self.process(url:, timeout_seconds:, logger:)
    new(
      url: url,
      timeout_seconds: timeout_seconds,
      logger: logger
    )
  end

  def initialize(url:, timeout_seconds:, logger:)
    @url = url
    @timeout_seconds = timeout_seconds
    @logger = logger
  end

  def title
    url.split("/").last.titleize
  end

  def canonical
    url
  end

  private

  attr_reader :url, :logger
end
