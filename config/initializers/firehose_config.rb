# frozen_string_literal: true

require 'firehose_config'

FirehoseConfig.configure do |c|
  c.site_name = ENV['SITE_NAME']
  c.author_url = ENV['AUTHOR_URL']
end
