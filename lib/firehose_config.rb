# frozen_string_literal: true

class FirehoseConfig
  class << self
    attr_accessor :api_key
  end

  def self.configure
    yield self
  end
end
