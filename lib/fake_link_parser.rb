# frozen_string_literal: true

require 'active_support/core_ext/string/inflections'

class FakeLinkParser
  def title(url:)
    url.split('/').last.titleize
  end
end
