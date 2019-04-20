# frozen_string_literal: true

require 'twitter'

module TwitterClient
  class << self
    def post(link)
      text = link.comment || link.title
      url = link.url

      message = "#{text} #{url}"

      client.update(message)
    end

    private

    def client
      @client ||=
        Twitter::REST::Client.new do |config|
          config.consumer_key = ENV['TWITTER_CONSUMER_KEY']
          config.consumer_secret = ENV['TWITTER_CONSUMER_SECRET']
          config.access_token = ENV['TWITTER_ACCESS_TOKEN']
          config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
        end
    end
  end
end
