# frozen_string_literal: true

require 'webmention'

module WebMentioner
  def self.send_mention(source, target)
    if endpoint = client.supports_webmention?(target)
      client.send_mention endpoint, source, target
    end
  end

  private

  def client
    Webmention::Client
  end
end
