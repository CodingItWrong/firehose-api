# frozen_string_literal: true

JSONAPI.configure do |config|
  config.json_key_format = :camelized_key
  config.resource_key_type = :uuid
end
