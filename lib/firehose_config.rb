# frozen_string_literal: true

class FirehoseConfig
  class << self
    attr_accessor :site_name, :author_url
  end

  def self.configure
    yield self
  end
end
