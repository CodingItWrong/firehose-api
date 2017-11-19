# frozen_string_literal: true

require 'firehose_config'

module ApplicationHelper
  def site_name
    FirehoseConfig.site_name
  end
end
