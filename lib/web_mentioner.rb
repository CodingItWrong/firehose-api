# frozen_string_literal: true

require 'webmention'

module WebMentioner
  class << self
    def self.send_mention(source)
      configured? or return

      client.send_mention(endpoint, source, target)
    end

    private

    def target
      ENV['WEBMENTION_TARGET']
    end

    def endpoint
      @endpoint ||= client.supports_webmention?(target)
    end

    def configured?
      [target, endpoint].all?(&:present?)
    end

    def client
      Webmention::Client
    end
  end
end
