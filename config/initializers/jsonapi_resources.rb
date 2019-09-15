JSONAPI.configure do |config|
  config.default_paginator = :paged

  config.default_page_size = 20
  config.maximum_page_size = 20

  config.top_level_meta_include_page_count = true
  config.top_level_meta_page_count_key = :page_count
end
