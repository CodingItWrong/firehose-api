# frozen_string_literal: true

require "firehose_config"

FirehoseConfig.configure do |c|
  c.api_key = ENV["API_KEY"]
end
